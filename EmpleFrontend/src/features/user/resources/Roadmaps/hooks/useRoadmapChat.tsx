import { useState, useCallback, useRef } from "react";
import { useSession } from "@descope/react-sdk";
import {
  ChatMessage,
  ChatQuestion,
  GeneratedRoadmap,
  RoadmapAnswers,
} from "../types/roadmapAI.types";
import { generateRoadmapAPI, finalizeRoadmapAPI } from "../services/roadmapAI.service";

const QUESTIONS: ChatQuestion[] = [
  {
    key: "subject",
    bot: "What subject or skill do you want to excel in?",
    opts: ["Full Stack Dev", "Machine Learning", "Cybersecurity", "Data Science", "DevOps", "UI/UX Design", "DSA / Competitive Programming", "Cloud Computing"],
  },
  {
    key: "level",
    bot: "What's your current experience level with {subject}?",
    opts: ["No experience", "Some Basics", "Intermediate", "Advanced"],
  },
  {
    key: "goal",
    bot: "How much time do you have?",
    opts: ["1–2 months", "3–4 months", "5–6 months", "6+ months"],
  },
  {
    key: "duration",
    bot: "How many hours per week can you dedicate?",
    opts: ["< 5 hrs/week", "5–10 hrs/week", "10–20 hrs/week", "20+ hrs/week"],
  },
  {
    key: "hours",
    bot: "What skills do you already know? (select all that apply or type)",
    opts: ["HTML/CSS", "JavaScript", "Python", "React", "Node.js", "SQL", "Git", "None of these"],
  },
  {
    key: "rating",
    bot: "How would you rate the depth of content you prefer?",
    opts: ["Surface level overview", "Balanced depth", "In-depth with theory", "Expert level — go deep"],
  },
];

export const useRoadmapChat = (
  onPreviewReady: (roadmap: GeneratedRoadmap) => void,
  onFinalized: (id: string) => void
) => {
  const { sessionToken } = useSession();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentOpts, setCurrentOpts] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [previewRoadmap, setPreviewRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [awaitingStarRating, setAwaitingStarRating] = useState(false);

  const stepRef = useRef(0);
  const answersRef = useRef<Partial<RoadmapAnswers>>({});

  const addMessage = useCallback((role: "bot" | "user", text: string) => {
    const msg: ChatMessage = { id: `${Date.now()}-${Math.random()}`, role, text };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const showTypingThenSpeak = useCallback((text: string, cb?: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage("bot", text);
      cb?.();
    }, 750);
  }, [addMessage]);

  // ── Generate / Regenerate roadmap ─────────────────────────────────────────
  const generate = useCallback(async (customPrompt?: string) => {
    setIsGenerating(true);
    setCurrentOpts([]);
    setInputDisabled(true);

    if (!sessionToken) {
      setIsGenerating(false);
      showTypingThenSpeak("You need to be logged in to generate a roadmap.", () => setInputDisabled(false));
      return;
    }

    const answers = answersRef.current as RoadmapAnswers;
    const modifiedAnswers = customPrompt
      ? { ...answers, subject: `${answers.subject}. User feedback: ${customPrompt}` }
      : answers;

    showTypingThenSpeak(
      customPrompt
        ? "Got it — regenerating your roadmap based on your feedback ✨"
        : "Generating your roadmap preview ✨ (searching the web for real resources, can take ~1 min)"
    );

    try {
      const roadmap = await generateRoadmapAPI(modifiedAnswers, sessionToken);
      setPreviewRoadmap(roadmap);
      onPreviewReady(roadmap);
      setIsGenerating(false);
      showTypingThenSpeak(
        roadmap.intro || "Here's your updated roadmap! Check it on the left. Happy with it? Hit Finalize to save.",
        () => setInputDisabled(false)
      );
    } catch (err) {
      console.error("[RoadmapAI] generate() failed:", err);
      setIsGenerating(false);
      showTypingThenSpeak("Something went wrong. Please try again.", () => setInputDisabled(false));
    }
  }, [showTypingThenSpeak, onPreviewReady, sessionToken]);

  // ── Step 1: Finalize clicked — ask for star rating first ──────────────────
  const finalize = useCallback(() => {
    if (!previewRoadmap || !sessionToken) return;

    addMessage("user", "Looks good — save this roadmap!");
    setAwaitingStarRating(true);
    setCurrentOpts([]);
    setInputDisabled(true);

    showTypingThenSpeak(
      "Before I save — how would you rate this roadmap? ⭐",
      () => {
        setCurrentOpts(["⭐ 1 — Poor", "⭐⭐ 2 — Fair", "⭐⭐⭐ 3 — Good", "⭐⭐⭐⭐ 4 — Great", "⭐⭐⭐⭐⭐ 5 — Excellent"]);
        setInputDisabled(false);
      }
    );
  }, [previewRoadmap, sessionToken, addMessage, showTypingThenSpeak]);

  // ── Step 2: Rating received — save immediately, no regeneration ───────────
  const submitWithRating = useCallback(async (starRating: string) => {
    if (!previewRoadmap || !sessionToken) return;

    setAwaitingStarRating(false);
    setCurrentOpts([]);
    setInputDisabled(true);
    setIsFinalizing(true);
    addMessage("user", starRating);
    showTypingThenSpeak("Thanks for your rating! Saving your roadmap…");

    try {
      const saved = await finalizeRoadmapAPI(
        {
          ...previewRoadmap,
          sourceAnswers: {
            ...(previewRoadmap.sourceAnswers || {}),
            starRating,
          } as RoadmapAnswers,
        },
        sessionToken
      );
      setIsFinalizing(false);
      showTypingThenSpeak(
        `🎉 Saved! "${saved.title}" is now on your Roadmaps page.`,
        () => onFinalized(saved.id)
      );
    } catch (err) {
      console.error("[RoadmapAI] finalize() failed:", err);
      setIsFinalizing(false);
      showTypingThenSpeak("Couldn't save the roadmap. Please try again.");
    }
  }, [previewRoadmap, sessionToken, addMessage, showTypingThenSpeak, onFinalized]);

  // ── Question flow ─────────────────────────────────────────────────────────
  const askStep = useCallback((idx: number) => {
    if (idx >= QUESTIONS.length) {
      generate();
      return;
    }
    const q = QUESTIONS[idx];
    const text = q.bot.replace("{subject}", answersRef.current.subject || "this");
    showTypingThenSpeak(text, () => {
      setCurrentOpts(q.opts);
      setInputDisabled(false);
    });
  }, [showTypingThenSpeak, generate]);

  // ── processAnswer: handles Q&A flow AND star rating selection ─────────────
  const processAnswer = useCallback((val: string) => {
    // Star rating option selected — save, do NOT regenerate
    if (awaitingStarRating) {
      submitWithRating(val);
      return;
    }

    if (stepRef.current >= QUESTIONS.length) return;

    const key = QUESTIONS[stepRef.current].key;
    answersRef.current = { ...answersRef.current, [key]: val };
    addMessage("user", val);
    setCurrentOpts([]);
    setInputDisabled(true);
    stepRef.current += 1;
    setTimeout(() => askStep(stepRef.current), 350);
  }, [awaitingStarRating, submitWithRating, addMessage, askStep]);

  // ── Free-text after preview: feedback/regenerate ONLY, never touches rating
  const sendFreeTextMessage = useCallback((val: string) => {
    // If awaiting star rating via free text input, handle it
    if (awaitingStarRating) {
      submitWithRating(val);
      return;
    }

    addMessage("user", val);
    setCurrentOpts([]);
    setInputDisabled(true);

    const lowerVal = val.toLowerCase();
    const wantsSuggestion =
      lowerVal.includes("suggest") ||
      lowerVal.includes("option") ||
      lowerVal.includes("change") ||
      lowerVal.includes("not satisfied") ||
      lowerVal.includes("don't like") ||
      lowerVal.includes("dont like") ||
      lowerVal.includes("improve") ||
      lowerVal.includes("different");

    if (wantsSuggestion) {
      showTypingThenSpeak(
        "Sure! What would you like to change?",
        () => {
          setCurrentOpts([
            "Make it more beginner friendly",
            "Make it more advanced",
            "Focus more on projects",
            "Shorten the duration",
            "Add more resources",
            "Change the subject focus",
          ]);
          setInputDisabled(false);
        }
      );
    } else {
      setTimeout(() => generate(val), 350);
    }
  }, [awaitingStarRating, submitWithRating, addMessage, showTypingThenSpeak, generate]);

  const startChat = useCallback(() => {
    stepRef.current = 0;
    answersRef.current = {};
    setMessages([]);
    setCurrentOpts([]);
    setInputDisabled(true);
    setIsGenerating(false);
    setIsFinalizing(false);
    setAwaitingStarRating(false);
    setPreviewRoadmap(null);
    setTimeout(() => askStep(0), 280);
  }, [askStep]);

  return {
    messages,
    currentOpts,
    inputDisabled,
    isTyping,
    isGenerating,
    isFinalizing,
    awaitingStarRating,
    previewRoadmap,
    startChat,
    processAnswer,
    finalize,
    sendFreeTextMessage,
  };
};