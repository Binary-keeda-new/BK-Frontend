'use client';

import { useState } from 'react';
import SlideDrawer from '@/shared/components/ui/SlideDrawer';
import { submitRequest } from '../services/requests.service';

interface RequestFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass = "w-full p-3 border rounded-xl focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] outline-none transition-all placeholder:text-gray-500 text-sm";
const inputStyle = { background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)' };
const labelClass = "text-sm font-semibold";
const labelStyle = { color: 'var(--muted)' };

export default function RequestFormDrawer({ isOpen, onClose }: RequestFormDrawerProps) {
  const [form, setForm] = useState({ title: '', description: '', name: '', contact: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetAndClose = () => {
    setForm({ title: '', description: '', name: '', contact: '', email: '' });
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.title.trim() || !form.description.trim() || !form.name.trim() || !form.contact.trim() || !form.email.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    try {
      await submitRequest(form);
      resetAndClose();
      setShowThankYou(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SlideDrawer isOpen={isOpen} onClose={resetAndClose} title="Contact Admin" width="md">
        <div className="p-5 space-y-4">
          <p className="text-sm" style={{ color: 'var(--muted2)' }}>
            Have a question or issue? Send a request and the admin will get back to you.
          </p>

          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className={labelClass} style={labelStyle}>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Brief summary of your request" />
          </div>

          <div className="space-y-1.5">
            <label className={labelClass} style={labelStyle}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={inputClass} style={inputStyle} placeholder="Describe your issue or question in detail" />
          </div>

          <div className="space-y-1.5">
            <label className={labelClass} style={labelStyle}>Your Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="John Doe" />
          </div>

          <div className="space-y-1.5">
            <label className={labelClass} style={labelStyle}>Contact Number</label>
            <input type="text" name="contact" value={form.contact} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="+91 98765 43210" />
          </div>

          <div className="space-y-1.5">
            <label className={labelClass} style={labelStyle}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="john@example.com" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold transition-opacity disabled:opacity-60"
            style={{ background: 'var(--orange)', color: '#fff' }}
          >
            {submitting ? 'Submitting…' : 'Submit Request'}
          </button>
        </div>
      </SlideDrawer>

      {showThankYou && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Thank you for submitting!</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              The admin will contact you shortly.
            </p>
            <button
              onClick={() => setShowThankYou(false)}
              className="w-full py-2.5 rounded-xl font-semibold"
              style={{ background: 'var(--orange)', color: '#fff' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
