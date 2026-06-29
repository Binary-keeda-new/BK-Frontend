import BlogDetailPage from "@/features/user/blog/pages/BlogDetailPage";

// Minimal dynamic metadata generation for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} | Emple Blogs`,
    description: `Read ${title} on Emple.`,
  };
}

export default function Page() {
  return <BlogDetailPage />;
}
