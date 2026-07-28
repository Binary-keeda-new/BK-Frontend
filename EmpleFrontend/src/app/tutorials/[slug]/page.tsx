import { notFound } from "next/navigation";
import CTutorialPage from "@/features/user/tutorials/c/pages/CTutorialPage";
import JavaTutorialPage from "@/features/user/tutorials/java/pages/JavaTutorialPage";
import DAATutorialPage from "@/features/user/tutorials/daa/pages/DAATutorialPage";
import DBMSTutorialPage from "@/features/user/tutorials/dbms/pages/DBMSTutorialPage";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const metadataMap: Record<string, any> = {
    c: {
      title: 'C Programming Tutorial | Emple',
      description: 'Learn C Programming from scratch. Covers pointers, dynamic memory, arrays, and interview questions.',
    },
    java: {
      title: 'Java Tutorial | Emple',
      description: 'Master Java Programming. Learn OOPs, Collections framework, Exception Handling, and more.',
    },
    daa: {
      title: 'Design and Analysis of Algorithms (DAA) | Emple',
      description: 'Complete DAA tutorial covering sorting, dynamic programming, graph algorithms, and complexity.',
    },
    dbms: {
      title: 'DBMS Tutorial | Emple',
      description: 'Database Management Systems tutorial. Master SQL queries, normal forms, and database architecture.',
    }
  };

  const data = metadataMap[slug];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://emple.in/tutorials/${slug}`
    }
  };
}

export default async function TutorialSubjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  if (slug === "c") return <CTutorialPage />;
  if (slug === "java") return <JavaTutorialPage />;
  if (slug === "daa") return <DAATutorialPage />;
  if (slug === "dbms") return <DBMSTutorialPage />;

  return notFound();
}
