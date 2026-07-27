import { TutorialsNotesPage } from "@/features/user/tutorials/pages/TutorialsPage";

export const metadata = {
  title: 'Free Tech Tutorials | Emple',
  description: 'Step-by-step tutorials on web development, system design, DSA, and more.',
  alternates: {
    canonical: 'https://emple.in/tutorials/notes'
  }
};

export default function TutorialsNotesRoute() {
  return (
    <div style={{ position: 'relative' }}>
      <TutorialsNotesPage />
    </div>
  );
}
