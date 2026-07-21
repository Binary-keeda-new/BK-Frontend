import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UserProfile } from '@/features/user/profile/types';
import { ShareProfileButton } from '@/features/user/profile/components/ShareProfileButton';
import dynamic from 'next/dynamic';

// Lazy load all templates to optimize the bundle size
const EngineeringBlueprint = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/EngineeringBlueprint'), { ssr: true });
const GamifiedArcade = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/GamifiedArcade'), { ssr: true });
const EditorialMinimalist = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/EditorialMinimalist'), { ssr: true });
const RpgCharacterSheet = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/RpgCharacterSheet'), { ssr: true });
const CyberDeveloper = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/CyberDeveloper'), { ssr: true });
const HackerTerminal = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/HackerTerminal'), { ssr: true });
const PremiumCorporate = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/PremiumCorporate'), { ssr: true });
const ModernPersonal = dynamic(() => import('@/features/user/profile/components/PortfolioTemplates/ModernPersonal'), { ssr: true });

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
  const imageUrl = profile.profilePhoto 
    ? (profile.profilePhoto.startsWith('http') 
        ? profile.profilePhoto 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}`) 
    : undefined;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://emple.com';
  const canonicalUrl = `${appUrl}/u/${resolvedParams.username}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      url: canonicalUrl,
      siteName: 'Emple',
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

  return (
    <>
      {(() => {
        switch (Template) {
          case 'engineering-blueprint': return <EngineeringBlueprint profile={profile} />;
          case 'gamified-arcade': return <GamifiedArcade profile={profile} />;
          case 'editorial-minimalist': return <EditorialMinimalist profile={profile} />;
          case 'rpg-character-sheet': return <RpgCharacterSheet profile={profile} />;
          case 'cyber-developer': return <CyberDeveloper profile={profile} />;
          case 'hacker-terminal': return <HackerTerminal profile={profile} />;
          case 'premium-corporate': return <PremiumCorporate profile={profile} />;
          case 'modern-personal': return <ModernPersonal profile={profile} />;
          default: return <EditorialMinimalist profile={profile} />;
        }
      })()}
      
      {!preview && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <ShareProfileButton 
            title={`${profile.personalInfo?.fullName || profile.username}'s Portfolio`}
            variant="floating"
          />
        </div>
      )}
    </>
  );
}
