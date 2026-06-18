import InterviewQuestionsHome from "@/features/user/resources/pages/InterviewQuestionsHome";

export const metadata = {
  title: 'Top Tech Interview Questions & Answers | Emple',
  description: 'Detailed interview questions for OOP, DBMS, OS, Computer Networks, and System Design.',
};

export default function InterviewQuestionsPage() {
  return <InterviewQuestionsHome basePath="/resources/interview-questions" />;
}
