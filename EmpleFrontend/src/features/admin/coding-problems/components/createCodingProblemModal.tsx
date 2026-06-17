'use client';

import { useState } from 'react';

interface CreateCodingProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCodingProblemModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateCodingProblemModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Easy',
    topics: '',
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    const response = await fetch(
      'http://localhost:5000/api/coding-problems',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          difficulty: formData.difficulty,
          topics: formData.topics
            .split(',')
            .map((topic) => topic.trim())
            .filter(Boolean),
        }),
      }
    );

    const data = await response.json();

    console.log('Created Problem:', data);

    setFormData({
      title: '',
      difficulty: 'Easy',
      topics: '',
    });

    onClose();

    onSuccess();
  } catch (error) {
    console.error(
      'Failed to create coding problem',
      error
    );
  }
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-[var(--clr-surface)] p-6 shadow-2xl ring-1 ring-white/10">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--clr-text)]">
              Create Coding Problem
            </h2>

            <p className="mt-2 text-sm text-[var(--clr-text2)]">
              Enter the basic details for your coding challenge.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-[var(--clr-text2)]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Problem Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Two Sum"
              required
              className="w-full rounded-2xl bg-[var(--clr-bg)] px-4 py-3 ring-1 ring-white/10 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Difficulty
            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[var(--clr-bg)] px-4 py-3 ring-1 ring-white/10 outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Topics
            </label>

            <input
              type="text"
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              placeholder="Arrays, HashMap, Sorting"
              className="w-full rounded-2xl bg-[var(--clr-bg)] px-4 py-3 ring-1 ring-white/10 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-5 py-3 ring-1 ring-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-white"
            >
              Create Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}