// ─── Roadmap AI Types ────────────────────────────────────────────────────────

export interface RoadmapResource {
  title: string;
  url: string;
}

export interface RoadmapVideo {
  title: string;
  url: string;
  dur: string;
}

export interface RoadmapSection {
  id: string;
  week: string;
  title: string;
  duration: string;
  points: number;
  objectives: string[];
  content: string;
  resources: {
    websites: RoadmapResource[];
    videos: RoadmapVideo[];
  };
}

export interface RoadmapAnswers {
  subject: string;
  level: string;
  goal: string;
  duration: string;
  hours: string;
  rating?: string
}

export interface GeneratedRoadmap {
  id?: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: string;
  intro: string;
  sections: RoadmapSection[];
  sourceAnswers?: RoadmapAnswers;
}

export interface PersonalizedRoadmapSummary {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: string;
  category: string;
  totalSections: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

export interface ChatQuestion {
  key: keyof RoadmapAnswers;
  bot: string;
  opts: string[];
}

export type ChatStep = keyof RoadmapAnswers | "done";