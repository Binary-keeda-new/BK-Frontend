import React from "react";

export type ThemeMode = "dark" | "light";

export type ThemeTokens = {
  pageBg: string;
  topbarBg: string;
  cardBg: string;
  cardBorder: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  labelColor: string;
  headingColor: string;
  subText: string;
  divider: string;
  toggleBg: string;
  toggleBorder: string;
  toggleActiveBg: string;
  toggleActiveText: string;
  toggleInactiveText: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  sectionLabel: string;
  qPillBg: string;
  qPillBorder: string;
  qPillText: string;
  deleteBg: string;
  deleteText: string;
};

export type QuestionType = "MCQ" | "MSQ" | "NAT";

export type Option = {
  id: string;
  text: string;
  isImage?: boolean;
  imageUrl?: string;
};

export type Question = {
  id: string;
  question: string;
  type: QuestionType;
  options: Option[];
  correct: string[];
  natAnswer?: string;
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string;
  isPersisted?: boolean;
  solution?: string;
solutionMedia?: string | null;
};

export type QuizEditProps = {
  quizId: string;
  onClose?: () => void;
};

export type ChildrenProps = {
  children: React.ReactNode;
};