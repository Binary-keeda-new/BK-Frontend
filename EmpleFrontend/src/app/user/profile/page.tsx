import { Metadata } from 'next';
import ProfileBuilder from '@/features/user/profile/components/ProfileBuilder';

export const metadata: Metadata = {
  title: 'Profile Builder | Emple',
  description: 'Build your professional portfolio and resume on Emple.',
};

export default function ProfilePage() {
  return <ProfileBuilder />;
}