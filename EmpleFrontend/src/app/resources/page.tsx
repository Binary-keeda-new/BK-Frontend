import ResourcesHome from "@/features/user/resources/pages/ResourcesHome";

export const metadata = {
  title: 'Resources Hub | Emple',
  description: 'Explore our free roadmaps, blogs, interview questions, tutorials, and more.',
};

export default function ResourcesPage() {
  return <ResourcesHome basePath="/resources" />;
}
