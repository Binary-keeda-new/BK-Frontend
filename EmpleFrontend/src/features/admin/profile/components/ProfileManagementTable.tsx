'use client';

import React, { useEffect, useState } from 'react';
import { getAdminProfiles, updateAdminProfileStatus, PaginatedProfiles } from '../../services/profile.admin.service';
import { UserProfile } from '../../../user/profile/types';
import { Search, Eye, Power, PowerOff } from 'lucide-react';

export function ProfileManagementTable() {
  const [data, setData] = useState<PaginatedProfiles | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await getAdminProfiles(page, 10, search);
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProfiles();
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await updateAdminProfileStatus(id, !currentStatus);
      if (res.success) {
        setData(prev => prev ? {
          ...prev,
          profiles: prev.profiles.map(p => p._id === id ? { ...p, isPublished: !currentStatus } : p)
        } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Portfolio Profiles</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search name or username..." 
            className="p-2 border border-gray-200 rounded-lg outline-none focus:border-indigo-500"
          />
          <button type="submit" className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-100">
              <th className="p-4 font-semibold text-gray-600">User</th>
              <th className="p-4 font-semibold text-gray-600">Username</th>
              <th className="p-4 font-semibold text-gray-600">Template</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading profiles...</td></tr>
            ) : data?.profiles.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No profiles found.</td></tr>
            ) : (
              data?.profiles.map(profile => (
                <tr key={profile._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {profile.profilePhoto ? (
                        <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}`} className="w-10 h-10 rounded-full object-cover" alt="" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                          {profile.personalInfo?.fullName?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{profile.personalInfo?.fullName || 'No Name'}</div>
                        <div className="text-xs text-gray-500">{profile.personalInfo?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{profile.username || 'Not set'}</td>
                  <td className="p-4 text-sm text-gray-600 capitalize">{profile.template?.replace('-', ' ')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${profile.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {profile.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {profile.username && profile.isPublished && (
                        <a href={`/u/${profile.username}`} target="_blank" rel="noreferrer" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Portfolio">
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                      <button onClick={() => toggleStatus(profile._id!, !!profile.isPublished)} className={`p-2 rounded-lg transition-colors ${profile.isPublished ? 'text-red-600 hover:bg-red-50' : 'text-emerald-600 hover:bg-emerald-50'}`} title={profile.isPublished ? 'Unpublish/Disable' : 'Publish/Enable'}>
                        {profile.isPublished ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {data && data.totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">Page {data.page} of {data.totalPages}</div>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button disabled={page === data.totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
