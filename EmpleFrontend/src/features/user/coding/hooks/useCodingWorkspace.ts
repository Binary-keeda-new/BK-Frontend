'use client';

import { useEffect, useState } from 'react';

import { CodingProblem } from '../types/workspace';

import { getCodingProblem } from '../services/codingProblemService';

export default function useCodingWorkspace(
  problemId: string
) {
  const [problem, setProblem] =
    useState<CodingProblem | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [selectedLanguage, setSelectedLanguage] =
    useState('Java');

  const [code, setCode] =
    useState('');

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const data =
          await getCodingProblem(problemId);

        setProblem(data);

        setCode(
          data.codeTemplates.Java
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      loadProblem();
    }
  }, [problemId]);

  const changeLanguage = (
    language: string
  ) => {
    if (!problem) return;

    setSelectedLanguage(language);

    setCode(
      problem.codeTemplates[
        language as keyof typeof problem.codeTemplates
      ]
    );
  };

  return {
    problem,

    loading,

    error,

    selectedLanguage,

    changeLanguage,

    code,

    setCode,
  };
}