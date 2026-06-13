import { Option, Question } from "./quizEdit.types";

export const mkId = (): string => Math.random().toString(36).slice(2, 10);

export const blankOption = (): Option => ({
  id: mkId(),
  text: "",
  isImage: false,
  imageUrl: "",
});

export const blankQuestion = (): Question => ({
  id: mkId(),
  question: "",
  type: "MCQ",
  options: [blankOption(), blankOption()],
  correct: [],
  natAnswer: "",
  positiveMarks: 4,
  negativeMarks: 1,
  imageUrl: "",
  solution: "",
  solutionMedia: "",
  isPersisted: false,
});