import { Option, Question } from "./quizEdit.types";

export const mkId = (): string => Math.random().toString(36).slice(2, 8);

export const blankOption = (): Option => ({
  id: mkId(),
  text: "",
  isImage: false,
  imageUrl: "",
});

export const blankQuestion = (): Question => ({
  id: mkId(),
  text: "",
  options: [blankOption(), blankOption(), blankOption(), blankOption()],
  correct: [],
  posMarks: "1",
  negMarks: "0",
});