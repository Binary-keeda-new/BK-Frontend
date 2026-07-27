'use client';

import { useState, useEffect } from 'react';
import { getAllRequests, updateRequestStatus, deleteRequest } from '../services/admin-requests.service';
import { Trash2, Mail, Phone, User } from 'lucide-react';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await getAllRequests();
      if (res.success) setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending';
    try {
      await updateRequestStatus(id, newStatus);
      setRequests(prev => prev.map(r => (r._id === id ? { ...r, status: newStatus } : r)));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this request?')) return;
    try {
      await deleteRequest(id);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Failed to delete request', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: 'var(--clr-accent)' }} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10" style={{ background: 'var(--clr-bg)', minHeight: '100vh' }}>
      <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--clr-text)' }}>User Requests</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--clr-text3)' }}>
        Requests submitted by users needing admin assistance.
      </p>

      {requests.length === 0 ? (
        <div className="p-10 text-center rounded-2xl" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: 'var(--clr-text3)' }}>
          No requests submitted yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="p-5 rounded-2xl"
              style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--clr-text)' }}>{req.title}</h3>
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: req.status === 'resolved' ? 'rgba(34,197,94,0.1)' : 'rgba(241,90,34,0.1)',
                        color: req.status === 'resolved' ? '#22c55e' : 'var(--clr-accent)',
                      }}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--clr-text3)' }}>
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggleStatus(req._id, req.status)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: 'var(--clr-surface2)', color: 'var(--clr-text)', border: '1px solid var(--clr-border)' }}
                  >
                    Mark as {req.status === 'pending' ? 'Resolved' : 'Pending'}
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-500"
                    style={{ background: 'var(--clr-surface2)', border: '1px solid var(--clr-border)' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm mb-4" style={{ color: 'var(--clr-text2)' }}>{req.description}</p>

              <div className="flex flex-wrap gap-4 text-xs pt-3" style={{ borderTop: '1px solid var(--clr-border)', color: 'var(--clr-text3)' }}>
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {req.name}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {req.contact}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {req.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
