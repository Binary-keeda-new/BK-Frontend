import TutorialsLandingPage from "@/features/user/tutorials/pages/TutorialsLandingPage";

export const metadata = {
  title: 'Tutorials | Emple',
  description: 'Choose between comprehensive notes and video tutorials for programming languages.',
  alternates: {
    canonical: 'https://emple.in/tutorials'
  }
};

export default function TutorialsRootPage() {
  return (
    <div style={{ position: 'relative' }}>
      <TutorialsLandingPage />
    </div>
  );
}
