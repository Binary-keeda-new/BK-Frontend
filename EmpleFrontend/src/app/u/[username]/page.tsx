import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UserProfile } from '@/features/user/profile/types';
import { ModernDeveloper, CreativeDesigner, AIResearch, StudentPortfolio } from '@/features/user/profile/components/PortfolioTemplates';

async function fetchProfile(username: string): Promise<UserProfile | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const res = await fetch(`${baseUrl}/api/v1/profile/u/${username}`, { cache: 'no-store' });
  
  if (!res.ok) return null;
  const data = await res.json();
  return data.success ? data.data : null;
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = await fetchProfile(resolvedParams.username);
  
  if (!profile) {
    return { title: 'Profile Not Found' };
  }

  const title = `${profile.personalInfo?.fullName || resolvedParams.username}'s Portfolio | Emple`;
  const description = profile.personalInfo?.headline || profile.about?.bio || `Check out ${resolvedParams.username}'s professional portfolio on Emple.`;
  const imageUrl = profile.profilePhoto ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    }
  };
}

export default async function PublicPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const profile = await fetchProfile(resolvedParams.username);

  if (!profile) {
    notFound();
  }

  const Template = profile.template || 'modern-developer';

  switch (Template) {
    case 'modern-developer': return <ModernDeveloper profile={profile} />;
    case 'creative-designer': return <CreativeDesigner profile={profile} />;
    case 'ai-research': return <AIResearch profile={profile} />;
    case 'student': return <StudentPortfolio profile={profile} />;
    default: return <ModernDeveloper profile={profile} />;
  }
}
