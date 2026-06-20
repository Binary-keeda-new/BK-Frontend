import { Metadata } from 'next';
import JobBoard from '@/features/user/jobs/components/JobBoard';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  
  return {
    title: `${id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Jobs | Emple`,
    description: `Explore the latest ${id.replace(/-/g, ' ')} job opportunities on Emple. Browse requirements and apply.`,
    alternates: {
      canonical: `/jobs/${id}`,
    },
  };
}

export default function JobDetailPage({ params }: Props) {
  return <JobBoard initialJobId={params.id} />;
}
