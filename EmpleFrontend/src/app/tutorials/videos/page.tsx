import VideosPlaceholderPage from "@/features/user/tutorials/pages/VideosPlaceholderPage";

export const metadata = {
  title: 'Video Tutorials | Emple',
  description: 'Video tutorials and walkthroughs.',
  alternates: {
    canonical: 'https://emple.in/tutorials/videos'
  }
};

export default function TutorialsVideosRoute() {
  return (
    <div style={{ position: 'relative' }}>
      <VideosPlaceholderPage />
    </div>
  );
}
