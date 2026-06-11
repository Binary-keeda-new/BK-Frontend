export interface InterviewQuestion {
  id: number;
  question: string;
  answer: string;
  imageUrl?: string;
  imageUrls?: string[];
  imageCaptions?: string[];
  companies: string[];
}

export interface QuestionListProps {
  questions: InterviewQuestion[];
  subjectTitle: string;
}
