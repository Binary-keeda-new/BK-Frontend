'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppAuth } from '@/providers/AppAuthProvider';
import { apiRequest } from '@/shared/utils/api';

type Props = {
  quizId: string;
};

type QuizResponse = {
  success: boolean;
  data: {
    _id: string;
    category: string;
    subcategory: string;
  };
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-');
}

export default function SharedQuizRedirectPage({ quizId }: Props) {
  const router = useRouter();
  const { user, loading } = useAppAuth();

  useEffect(() => {
    const openSharedQuiz = async () => {
      if (loading) return;

      const currentPath = `/user/practice/quiz/shared/${quizId}`;

      if (!user) {
        router.replace(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      const res = await apiRequest<QuizResponse>(`/api/v1/quizzes/${quizId}`, {
        method: 'GET',
      });

      const categorySlug = slugify(res.data.category);
      const topicSlug = slugify(res.data.subcategory);

      router.replace(
        `/user/practice/quiz/${categorySlug}/${topicSlug}/${quizId}`
      );
    };

    void openSharedQuiz();
  }, [quizId, user, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--clr-bg)] text-[var(--clr-text)]">
      Opening quiz...
    </div>
  );
}