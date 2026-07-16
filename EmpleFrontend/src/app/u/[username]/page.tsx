import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UserProfile } from '@/features/user/profile/types';
import { EngineeringBlueprint, GamifiedArcade, EditorialMinimalist, RpgCharacterSheet } from '@/features/user/profile/components/PortfolioTemplates';

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

export const dynamic = 'force-dynamic';

export default async function PublicPortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const profile = await fetchProfile(resolvedParams.username);

  if (!profile) {
    notFound();
  }

  const previewParam = resolvedSearchParams?.preview;
  const preview = Array.isArray(previewParam) ? previewParam[0] : previewParam;

  const Template = (preview || profile.template || 'editorial-minimalist').toLowerCase().trim();

  switch (Template) {
    case 'engineering-blueprint': return <EngineeringBlueprint profile={profile} />;
    case 'gamified-arcade': return <GamifiedArcade profile={profile} />;
    case 'editorial-minimalist': return <EditorialMinimalist profile={profile} />;
    case 'rpg-character-sheet': return <RpgCharacterSheet profile={profile} />;
    default: return <EditorialMinimalist profile={profile} />;
  }
}
