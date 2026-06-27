import { Metadata } from 'next';
import { ProfileManagementTable } from '@/features/admin/profile/components/ProfileManagementTable';

export const metadata: Metadata = {
  title: 'Manage Profiles | Admin | Emple',
};

export default function AdminProfilesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Portfolios</h1>
        <p className="text-gray-500">View and moderate user portfolio websites.</p>
      </div>
      <ProfileManagementTable />
    </div>
  );
}
