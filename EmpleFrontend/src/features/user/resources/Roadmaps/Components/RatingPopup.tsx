'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, CheckCircle } from 'lucide-react';

interface RatingPopupProps {
  isOpen: boolean;
  roadmapName: string;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ isOpen, roadmapName, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(rating, feedback);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setFeedback('');
        onClose();
      }, 500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10000, padding: 20
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 24,
              width: '100%',
              maxWidth: 420,
              padding: 32,
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'transparent', border: 'none', color: 'var(--muted2)',
                cursor: 'pointer', padding: 4, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--surface2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--muted2)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(255, 92, 53, 0.1)', color: 'var(--orange)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', border: '1px solid rgba(255, 92, 53, 0.3)'
                }}>
                  <Star size={32} fill="currentColor" />
                </div>
                
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
                  Rate your progress!
                </h2>
                <p style={{ color: 'var(--muted2)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                  You just completed a section in <strong>{roadmapName}</strong>. How would you rate your learning experience so far?
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      style={{
                        background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                        color: star <= (hoverRating || rating) ? '#fbbf24' : 'var(--surface2)',
                        transition: 'color 0.2s', outline: 'none'
                      }}
                    >
                      <Star size={36} fill={star <= (hoverRating || rating) ? '#fbbf24' : 'var(--surface2)'} />
                    </motion.button>
                  ))}
                </div>

                <div style={{ width: '100%', marginBottom: 24 }}>
                  <textarea
                    placeholder="Tell us what you liked or how we can improve..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{
                      width: '100%', minHeight: 80, padding: 12,
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      borderRadius: 12, color: 'var(--text)', fontSize: 14,
                      resize: 'none', outline: 'none', transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--orange)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 12,
                    background: rating === 0 ? 'var(--surface2)' : 'var(--orange)',
                    color: rating === 0 ? 'var(--muted2)' : 'white',
                    border: 'none', fontWeight: 700, fontSize: 16,
                    cursor: rating === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: rating > 0 ? '0 4px 12px rgba(255, 92, 53, 0.3)' : 'none'
                  }}
                >
                  Submit Rating
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                  style={{ color: '#10b981', marginBottom: 16 }}
                >
                  <CheckCircle size={64} />
                </motion.div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
                  Thank You!
                </h2>
                <p style={{ color: 'var(--muted2)', fontSize: 14 }}>
                  Your feedback helps us make the learning experience better for everyone.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RatingPopup;
