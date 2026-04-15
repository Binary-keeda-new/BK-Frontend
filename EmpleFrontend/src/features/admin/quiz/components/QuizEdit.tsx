"use client";
import { useState, useRef } from "react";

const THEMES = {
  dark: {
    pageBg: "var(--clr-bg)",
    topbarBg: "var(--clr-surface)",
    cardBg: "var(--clr-surface)",
    cardBorder: "var(--clr-border)",
    inputBg: "var(--clr-surface2)",
    inputBorder: "var(--clr-border2)",
    inputText: "var(--clr-text)",
    inputPlaceholder: "var(--clr-text3)",
    labelColor: "var(--clr-text2)",
    headingColor: "var(--clr-text)",
    subText: "var(--clr-text2)",
    divider: "var(--clr-border)",
    toggleBg: "var(--clr-surface2)",
    toggleBorder: "var(--clr-border2)",
    toggleActiveBg: "var(--clr-accent3)",
    toggleActiveText: "var(--clr-accent)",
    toggleInactiveText: "var(--clr-text3)",
    badgeBg: "var(--clr-surface2)",
    badgeBorder: "var(--clr-border2)",
    badgeText: "var(--clr-text3)",
    sectionLabel: "var(--clr-text2)",
    qPillBg: "var(--clr-surface2)",
    qPillBorder: "var(--clr-border2)",
    qPillText: "var(--clr-text3)",
    deleteBg: "var(--clr-surface2)",
    deleteText: "var(--clr-text3)",
  },
  light: {
    pageBg: "var(--clr-bg)",
    topbarBg: "var(--clr-surface)",
    cardBg: "var(--clr-surface)",
    cardBorder: "var(--clr-border)",
    inputBg: "var(--clr-surface2)",
    inputBorder: "var(--clr-border2)",
    inputText: "var(--clr-text)",
    inputPlaceholder: "var(--clr-text3)",
    labelColor: "var(--clr-text2)",
    headingColor: "var(--clr-text)",
    subText: "var(--clr-text2)",
    divider: "var(--clr-border)",
    toggleBg: "var(--clr-surface2)",
    toggleBorder: "var(--clr-border2)",
    toggleActiveBg: "var(--clr-accent3)",
    toggleActiveText: "var(--clr-accent)",
    toggleInactiveText: "var(--clr-text3)",
    badgeBg: "var(--clr-surface2)",
    badgeBorder: "var(--clr-border2)",
    badgeText: "var(--clr-text3)",
    sectionLabel: "var(--clr-text2)",
    qPillBg: "var(--clr-surface2)",
    qPillBorder: "var(--clr-border2)",
    qPillText: "var(--clr-text3)",
    deleteBg: "var(--clr-surface2)",
    deleteText: "var(--clr-text3)",
  },
};

type Option = {
  id: string;
  text: string;
  isImage: boolean;
  imageUrl: string;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
  correct: string[];
  posMarks: string;
  negMarks: string;
};

const mkId = () => Math.random().toString(36).slice(2, 8);
const blankOption = (): Option => ({
  id: mkId(),
  text: "",
  isImage: false,
  imageUrl: "",
});
const blankQuestion = (): Question => ({
  id: mkId(),
  text: "",
  options: [blankOption(), blankOption(), blankOption(), blankOption()],
  correct: [],
  posMarks: "1",
  negMarks: "0",
});

function Toggle({
  on,
  onChange,
  t,
}: {
  on: boolean;
  onChange: () => void;
  t: typeof THEMES.dark;
}) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        borderRadius: 999,
        cursor: "pointer",
        background: on ? "var(--clr-accent3)" : t.inputBg,
        border: `1.5px solid ${on ? "var(--clr-accent)" : t.inputBorder}`,
        position: "relative",
        transition: "all 0.3s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: on ? 22 : 3,
          width: 16,
          height: 16,
          borderRadius: 999,
          background: on ? "var(--clr-accent)" : t.labelColor,
          transition: "left 0.3s, background 0.3s",
        }}
      />
    </div>
  );
}

export default function QuizEdit({ quizId }: { quizId: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const t = THEMES[theme];

  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [fullscreen, setFullscreen] = useState(true);
  const [copyPaste, setCopyPaste] = useState(true);
  const [escapeBanned, setEscapeBanned] = useState(true);
  const [aiAccess, setAiAccess] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([blankQuestion()]);
  const [activeQ, setActiveQ] = useState<string>(questions[0].id);
  const [importTab, setImportTab] = useState<"aiken" | "excel" | "json">("aiken");
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const aikenFileRef = useRef<HTMLInputElement>(null);
  const jsonFileRef = useRef<HTMLInputElement>(null);

  const aq = questions.find((q) => q.id === activeQ) ?? questions[0];
  const aqIdx = questions.findIndex((q) => q.id === aq.id);

  const updateQ = (id: string, patch: Partial<Question>) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  const updateOpt = (qid: string, oid: string, patch: Partial<Option>) =>
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((o) => (o.id === oid ? { ...o, ...patch } : o)),
            }
          : q
      )
    );

  const addOption = (qid: string) =>
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid ? { ...q, options: [...q.options, blankOption()] } : q
      )
    );

  const removeOption = (qid: string, oid: string) =>
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== oid),
              correct: q.correct.filter((c) => c !== oid),
            }
          : q
      )
    );

  const toggleCorrect = (qid: string, oid: string) =>
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qid
          ? {
              ...q,
              correct: q.correct.includes(oid)
                ? q.correct.filter((c) => c !== oid)
                : [...q.correct, oid],
            }
          : q
      )
    );

  const addQuestion = () => {
    const nq = blankQuestion();
    setQuestions((qs) => [...qs, nq]);
    setActiveQ(nq.id);
  };

  const deleteQuestion = (id: string) => {
    if (questions.length === 1) return;
    const next = questions.filter((q) => q.id !== id);
    setQuestions(next);
    if (activeQ === id) setActiveQ(next[Math.max(0, aqIdx - 1)].id);
  };

  const inp: React.CSSProperties = {
    background: t.inputBg,
    border: `1.5px solid ${t.inputBorder}`,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 500,
    color: t.inputText,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, background 0.4s",
    width: "100%",
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: t.sectionLabel,
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "color 0.4s",
      }}
    >
      <div
        style={{
          height: 1,
          width: 20,
          background: "var(--clr-accent)",
          flexShrink: 0,
        }}
      />
      {children}
      <div style={{ height: 1, flex: 1, background: t.divider }} />
    </div>
  );

  const Card = ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => (
    <div
      style={{
        background: t.cardBg,
        border: `1.5px solid ${t.cardBorder}`,
        borderRadius: 16,
        padding: 24,
        transition: "background 0.4s, border-color 0.4s",
        ...style,
      }}
    >
      {children}
    </div>
  );

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: t.labelColor,
        marginBottom: 8,
        transition: "color 0.4s",
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        background: t.pageBg,
        fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
        transition: "background 0.4s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Nunito:wght@700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px}
        .qph::placeholder{color:${t.inputPlaceholder}}
        .qsel option{background:${t.inputBg};color:${t.inputText}}
        .inp-focus:focus{
          border-color: var(--clr-accent) !important;
          box-shadow: 0 0 0 3px rgba(241,90,34,0.12) !important;
        }
        .hover-o:hover{
          border-color: var(--clr-accent) !important;
          color: var(--clr-accent) !important;
        }
        .del-h:hover{
          background: rgba(241,90,34,0.08) !important;
          border-color: var(--clr-accent) !important;
          color: var(--clr-accent) !important;
        }
        .pub-btn{transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)}
        .pub-btn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(241,90,34,0.25)}
        .pub-btn:active{transform:translateY(0)}
        .qpill{transition:all 0.2s}
        .qpill:hover{border-color: var(--clr-accent) !important}
        @media(max-width:640px){
          .two-col{grid-template-columns:1fr !important}
          .checks-grid{grid-template-columns:1fr !important}
          .topbar-title span.sub{display:none}
        }
      `}</style>

      <div
        style={{
          background: t.topbarBg,
          borderBottom: `1.5px solid ${t.cardBorder}`,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        <div className="topbar-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "var(--clr-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 800,
              fontSize: 17,
              color: t.headingColor,
              transition: "color 0.4s",
            }}
          >
            Quiz <span style={{ color: "var(--clr-accent)" }}>Editor</span>
          </span>

          <span
            className="sub"
            style={{
              fontSize: 11,
              background: t.badgeBg,
              border: `1px solid ${t.badgeBorder}`,
              color: t.badgeText,
              padding: "2px 8px",
              borderRadius: 99,
              fontWeight: 600,
            }}
          >
            DRAFT
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 20px 80px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 36,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: t.subText,
                marginBottom: 6,
                transition: "color 0.4s",
              }}
            >
              Admin Panel
            </p>
            <h1
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                color: t.headingColor,
                lineHeight: 1.15,
                transition: "color 0.4s",
              }}
            >
              Edit <span style={{ color: "var(--clr-accent)" }}>Quiz</span>
            </h1>
            <p
              style={{
                fontSize: 13,
                color: t.subText,
                marginTop: 6,
                transition: "color 0.4s",
              }}
            >
              Configure settings, security rules and manage questions below.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: t.toggleBg,
              border: `1.5px solid ${t.toggleBorder}`,
              borderRadius: 12,
              padding: 4,
              transition: "background 0.4s, border-color 0.4s",
              flexShrink: 0,
            }}
          >
            {(["dark", "light"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "7px 14px",
                  borderRadius: 9,
                  border: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.3s",
                  background: theme === mode ? t.toggleActiveBg : "transparent",
                  color: theme === mode ? t.toggleActiveText : t.toggleInactiveText,
                }}
              >
                {mode === "dark" ? (
                  <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                ) : (
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
                    <line x1="12" y1="2" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="22" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="2" y1="12" x2="4" y2="12" />
                    <line x1="20" y1="12" x2="22" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <SectionTitle>Duration</SectionTitle>
        <Card style={{ marginBottom: 32 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "end" }}>
            {([
              ["Hours", hours, setHours, "0", "23", "hr"],
              ["Minutes", minutes, setMinutes, "0", "59", "min"],
            ] as const).map(([label, val, setter, mn, mx, unit]) => (
              <div key={label}>
                <FieldLabel>{label}</FieldLabel>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    min={mn}
                    max={mx}
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    className="qph inp-focus"
                    style={{ ...inp, paddingRight: 44 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 11,
                      color: t.labelColor,
                      fontWeight: 700,
                    }}
                  >
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 13,
              color: t.subText,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Total duration:
            <strong style={{ color: t.labelColor }}>
              {String(+hours).padStart(2, "0")}h {String(+minutes % 60).padStart(2, "0")}m
            </strong>
          </div>
        </Card>

        <SectionTitle>Security Checks</SectionTitle>
        <Card style={{ marginBottom: 32 }}>
          <div className="checks-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              {
                label: "Fullscreen Mode",
                sub: "Force browser fullscreen on start",
                val: fullscreen,
                set: () => setFullscreen((v) => !v),
                icon: "⛶",
              },
              {
                label: "Block Copy-Paste",
                sub: "Disable clipboard during the quiz",
                val: copyPaste,
                set: () => setCopyPaste((v) => !v),
                icon: "⊘",
              },
              {
                label: "Ban Escape Key",
                sub: "Prevent tab switching or exit",
                val: escapeBanned,
                set: () => setEscapeBanned((v) => !v),
                icon: "⌨",
              },
              {
                label: "Allow AI Access",
                sub: "Permit AI assistance tools",
                val: aiAccess,
                set: () => setAiAccess((v) => !v),
                icon: "✦",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: i < 2 ? `1px solid ${t.divider}` : "none",
                  borderRight: i % 2 === 0 ? `1px solid ${t.divider}` : "none",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: item.val ? "var(--clr-accent3)" : t.inputBg,
                      border: `1.5px solid ${
                        item.val ? "var(--clr-accent)" : t.inputBorder
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      flexShrink: 0,
                      transition: "all 0.3s",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: t.headingColor,
                        transition: "color 0.4s",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.subText,
                        marginTop: 2,
                        transition: "color 0.4s",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
                <Toggle on={item.val} onChange={item.set} t={t} />
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <SectionTitle>Questions ({questions.length})</SectionTitle>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {questions.map((q, i) => (
            <button
              key={q.id}
              className="qpill"
              onClick={() => setActiveQ(q.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 99,
                border: `1.5px solid ${
                  activeQ === q.id ? "var(--clr-accent)" : t.qPillBorder
                }`,
                background: activeQ === q.id ? "var(--clr-accent3)" : t.qPillBg,
                color: activeQ === q.id ? "var(--clr-accent)" : t.qPillText,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: activeQ === q.id ? "var(--clr-accent)" : t.inputBg,
                  color: activeQ === q.id ? "#fff" : t.labelColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  maxWidth: 80,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {q.text || "Untitled"}
              </span>
              {q.correct.length > 0 && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "#22c55e",
                    flexShrink: 0,
                  }}
                />
              )}
            </button>
          ))}

          <button
            onClick={addQuestion}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 99,
              border: `1.5px dashed ${t.qPillBorder}`,
              background: "transparent",
              color: t.subText,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = t.qPillBorder;
              (e.currentTarget as HTMLElement).style.color = t.subText;
            }}
          >
            + Add Question
          </button>
        </div>

        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: t.subText,
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Question {aqIdx + 1} of {questions.length}
              </div>
              <h2
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: 19,
                  fontWeight: 800,
                  color: t.headingColor,
                  transition: "color 0.4s",
                }}
              >
                Edit Question
              </h2>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setShowImport(true)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: `1.5px solid ${t.cardBorder}`,
                  background: t.inputBg,
                  color: t.labelColor,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = t.cardBorder;
                  (e.currentTarget as HTMLElement).style.color = t.labelColor;
                }}
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Import
              </button>

              {questions.length > 1 && (
                <button
                  className="del-h"
                  onClick={() => deleteQuestion(aq.id)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: `1.5px solid ${t.cardBorder}`,
                    background: t.deleteBg,
                    color: t.deleteText,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.2s",
                  }}
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <FieldLabel>Question Text *</FieldLabel>
            <textarea
              className="qph inp-focus"
              rows={3}
              placeholder="Type your question here…"
              value={aq.text}
              onChange={(e) => updateQ(aq.id, { text: e.target.value })}
              style={{ ...inp, resize: "none" }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <FieldLabel>Options</FieldLabel>
              <span style={{ fontSize: 11, color: t.subText }}>
                Tap letter to mark correct ✓
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {aq.options.map((opt, oi) => {
                const isCorrect = aq.correct.includes(opt.id);

                return (
                  <div key={opt.id} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <button
                      onClick={() => toggleCorrect(aq.id, opt.id)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        border: `1.5px solid ${isCorrect ? "#22c55e" : t.inputBorder}`,
                        background: isCorrect ? "rgba(34,197,94,0.1)" : t.inputBg,
                        color: isCorrect ? "#22c55e" : t.labelColor,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      {isCorrect ? "✓" : String.fromCharCode(65 + oi)}
                    </button>

                    <div
                      style={{
                        display: "flex",
                        border: `1.5px solid ${t.inputBorder}`,
                        borderRadius: 9,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      {[false, true].map((imgMode) => (
                        <button
                          key={String(imgMode)}
                          onClick={() => updateOpt(aq.id, opt.id, { isImage: imgMode })}
                          style={{
                            padding: "0 9px",
                            height: 34,
                            border: "none",
                            background:
                              opt.isImage === imgMode ? "var(--clr-accent3)" : t.inputBg,
                            color:
                              opt.isImage === imgMode ? "var(--clr-accent)" : t.labelColor,
                            fontSize: 10,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "all 0.2s",
                          }}
                        >
                          {imgMode ? "IMG" : "TXT"}
                        </button>
                      ))}
                    </div>

                    <div style={{ flex: 1 }}>
                      {opt.isImage ? (
                        <div>
                          <div style={{ position: "relative" }}>
                            <input
                              className="qph inp-focus"
                              placeholder="Paste image URL…"
                              value={opt.imageUrl}
                              onChange={(e) =>
                                updateOpt(aq.id, opt.id, { imageUrl: e.target.value })
                              }
                              style={{ ...inp, paddingLeft: 36 }}
                            />
                            <svg
                              style={{
                                position: "absolute",
                                left: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                              width="14"
                              height="14"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                stroke={t.labelColor}
                                strokeWidth="1.5"
                              />
                              <circle cx="8.5" cy="8.5" r="1.5" fill={t.labelColor} />
                              <path
                                d="M21 15l-5-5L5 21"
                                stroke={t.labelColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          {opt.imageUrl && (
                            <img
                              src={opt.imageUrl}
                              alt=""
                              style={{
                                height: 44,
                                marginTop: 6,
                                borderRadius: 6,
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <input
                          className="qph inp-focus"
                          placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                          value={opt.text}
                          onChange={(e) => updateOpt(aq.id, opt.id, { text: e.target.value })}
                          style={inp}
                        />
                      )}
                    </div>

                    {aq.options.length > 2 && (
                      <button
                        onClick={() => removeOption(aq.id, opt.id)}
                        className="hover-o"
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 9,
                          border: `1.5px solid ${t.inputBorder}`,
                          background: t.inputBg,
                          color: t.labelColor,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.2s",
                        }}
                      >
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M18 6L6 18M6 6l12 12"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => addOption(aq.id)}
              style={{
                marginTop: 12,
                width: "100%",
                padding: "9px",
                borderRadius: 10,
                border: `1.5px dashed ${t.inputBorder}`,
                background: "transparent",
                color: t.labelColor,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = t.inputBorder;
                (e.currentTarget as HTMLElement).style.color = t.labelColor;
              }}
            >
              + Add Option
            </button>
          </div>

          <div style={{ marginBottom: 24 }}>
            <FieldLabel>Marks</FieldLabel>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {([
                ["Correct (+)", "posMarks", "#22c55e"],
                ["Wrong (−)", "negMarks", "#f87171"],
              ] as const).map(([label, key, color]) => (
                <div key={key}>
                  <div
                    style={{
                      fontSize: 11,
                      color: t.labelColor,
                      fontWeight: 600,
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        background: color,
                      }}
                    />
                    {label}
                  </div>
                  <input
                    type="number"
                    step="0.5"
                    className="qph inp-focus"
                    value={aq[key]}
                    onChange={(e) => updateQ(aq.id, { [key]: e.target.value })}
                    style={{ ...inp, borderColor: aq[key] ? `${color}55` : t.inputBorder }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "space-between", flexWrap: "wrap" }}>
            <button
              className="hover-o"
              onClick={() => aqIdx > 0 && setActiveQ(questions[aqIdx - 1].id)}
              style={{
                padding: "9px 18px",
                borderRadius: 10,
                border: `1.5px solid ${t.cardBorder}`,
                background: "transparent",
                color: aqIdx > 0 ? t.labelColor : t.subText,
                fontSize: 13,
                fontWeight: 600,
                cursor: aqIdx > 0 ? "pointer" : "default",
                fontFamily: "inherit",
                transition: "all 0.2s",
                opacity: aqIdx > 0 ? 1 : 0.3,
              }}
            >
              ← Prev
            </button>

            <div style={{ display: "flex", gap: 8 }}>
              {aqIdx < questions.length - 1 && (
                <button
                  onClick={() => setActiveQ(questions[aqIdx + 1].id)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 10,
                    border: "none",
                    background: "var(--clr-accent3)",
                    color: "var(--clr-accent)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Next →
                </button>
              )}

              <button
                onClick={addQuestion}
                style={{
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: "var(--clr-accent)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 4v16m8-8H4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                Add Question
              </button>
            </div>
          </div>
        </Card>

        <div
          style={{
            marginTop: 40,
            paddingTop: 32,
            borderTop: `1.5px solid ${t.divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: t.headingColor,
                transition: "color 0.4s",
              }}
            >
              Ready to go live?
            </p>
            <p
              style={{
                fontSize: 12,
                color: t.subText,
                marginTop: 3,
                transition: "color 0.4s",
              }}
            >
              Review all settings before publishing this quiz.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="pub-btn"
              style={{
                padding: "11px 28px",
                borderRadius: 12,
                border: "none",
                background: "var(--clr-accent)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      {showImport && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowImport(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <div
            style={{
              background: t.cardBg,
              border: `1.5px solid ${t.cardBorder}`,
              borderRadius: 18,
              width: "100%",
              maxWidth: 560,
              overflow: "hidden",
            }}
          >
            <div style={{ height: 4, background: "var(--clr-accent)" }} />

            <div style={{ padding: "24px 28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: t.headingColor,
                  }}
                >
                  Import Questions
                </h3>

                <button
                  onClick={() => setShowImport(false)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    border: `1px solid ${t.cardBorder}`,
                    background: t.inputBg,
                    color: t.labelColor,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginBottom: 18,
                  background: t.inputBg,
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                {(["aiken", "excel", "json"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setImportTab(tab)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 8,
                      border: "none",
                      fontFamily: "inherit",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      background: importTab === tab ? "var(--clr-accent)" : "transparent",
                      color: importTab === tab ? "#fff" : t.labelColor,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {importTab === "aiken" && (
                <div>
                  <p style={{ fontSize: 12, color: t.subText, marginBottom: 12, lineHeight: 1.7 }}>
                    Format: question text → <code style={{ color: "var(--clr-accent)" }}>A. option</code> lines → <code style={{ color: "var(--clr-accent)" }}>ANSWER: B</code>
                  </p>

                  <textarea
                    className="qph inp-focus"
                    rows={6}
                    placeholder={"What is 2 + 2?\nA. 3\nB. 4\nC. 5\nD. 6\nANSWER: B"}
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    style={{ ...inp, resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
                  />

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                    <div style={{ flex: 1, height: 1, background: t.divider }} />
                    <span style={{ fontSize: 11, color: t.subText, fontWeight: 600, whiteSpace: "nowrap" }}>
                      OR UPLOAD FILE
                    </span>
                    <div style={{ flex: 1, height: 1, background: t.divider }} />
                  </div>

                  <div
                    onClick={() => aikenFileRef.current?.click()}
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: `1.5px dashed ${t.inputBorder}`,
                      background: t.inputBg,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = t.inputBorder;
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: "var(--clr-accent3)",
                        border: "1.5px solid var(--clr-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                          stroke="var(--clr-accent)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.headingColor }}>
                        Upload .txt file
                      </div>
                      <div style={{ fontSize: 11, color: t.subText, marginTop: 2 }}>
                        Plain text in Aiken format
                      </div>
                    </div>
                  </div>
                  <input ref={aikenFileRef} type="file" accept=".txt" style={{ display: "none" }} />
                </div>
              )}

              {importTab === "excel" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "24px 0" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "var(--clr-accent3)",
                      border: "2px dashed var(--clr-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                        stroke="var(--clr-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.headingColor, marginBottom: 4 }}>
                      Upload Excel / CSV
                    </div>
                    <div style={{ fontSize: 12, color: t.subText }}>
                      Columns: Question, A, B, C, D, Answer, +Marks, −Marks
                    </div>
                  </div>

                  <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: "none" }} />
                  <button
                    onClick={() => fileRef.current?.click()}
                    style={{
                      padding: "10px 24px",
                      borderRadius: 10,
                      border: "none",
                      background: "var(--clr-accent)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Choose File
                  </button>
                </div>
              )}

              {importTab === "json" && (
                <div>
                  <p style={{ fontSize: 12, color: t.subText, marginBottom: 12, lineHeight: 1.7 }}>
                    Array of: <code style={{ color: "var(--clr-accent)" }}>{"{ question, options[], answer, posMarks, negMarks }"}</code>
                  </p>

                  <textarea
                    className="qph inp-focus"
                    rows={6}
                    placeholder={'[\n  {\n    "question": "What is 2+2?",\n    "options": ["3","4","5","6"],\n    "answer": "4",\n    "posMarks": 1,\n    "negMarks": 0\n  }\n]'}
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    style={{ ...inp, resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
                  />

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                    <div style={{ flex: 1, height: 1, background: t.divider }} />
                    <span style={{ fontSize: 11, color: t.subText, fontWeight: 600, whiteSpace: "nowrap" }}>
                      OR UPLOAD FILE
                    </span>
                    <div style={{ flex: 1, height: 1, background: t.divider }} />
                  </div>

                  <div
                    onClick={() => jsonFileRef.current?.click()}
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: `1.5px dashed ${t.inputBorder}`,
                      background: t.inputBg,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--clr-accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = t.inputBorder;
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: "var(--clr-accent3)",
                        border: "1.5px solid var(--clr-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                          stroke="var(--clr-accent)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.headingColor }}>
                        Upload .json file
                      </div>
                      <div style={{ fontSize: 11, color: t.subText, marginTop: 2 }}>
                        Standard JSON array format
                      </div>
                    </div>
                  </div>
                  <input ref={jsonFileRef} type="file" accept=".json" style={{ display: "none" }} />
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowImport(false)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 10,
                    border: `1.5px solid ${t.cardBorder}`,
                    background: "transparent",
                    color: t.labelColor,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Cancel
                </button>

                <button
                  style={{
                    padding: "9px 20px",
                    borderRadius: 10,
                    border: "none",
                    background: "var(--clr-accent)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}