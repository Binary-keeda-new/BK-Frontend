'use client';

import { useState } from 'react';
import TestInstructionsModal from '../components/TestInstructionsModal';
import TestSectionsModal from '../components/TestSectionsModal';
import { UserTest, UserTestSection } from '../types/test.types';

const mockTests: UserTest[] = [
  {
    _id: '1',
    title: 'Frontend Developer Assessment',
    description: 'React, JavaScript and Problem Solving',
    totalSections: 3,
    totalDuration: 120,
    attempted: false,
    sections: [
      {
        id: 's1',
        title: 'MCQ Assessment',
        type: 'mcq',
        duration: 30,
        numberOfQuestions: 20,
      },
      {
        id: 's2',
        title: 'Coding Round',
        type: 'coding',
        duration: 60,
        numberOfQuestions: 2,
      },
      {
        id: 's3',
        title: 'Advanced MCQ',
        type: 'mcq',
        duration: 30,
        numberOfQuestions: 15,
      },
    ],
  },
];

export default function TestList() {
  const [tests] = useState(mockTests);

  const [selectedTest, setSelectedTest] = useState<UserTest | null>(null);

  const [showInstructions, setShowInstructions] = useState(false);
  const [showSections, setShowSections] = useState(false);

  const [agreed, setAgreed] = useState(false);

  const [enabledSectionIndex] = useState(0);

  const [completedSectionIds] = useState<string[]>([]);

  const handleAttempt = (test: UserTest) => {
    setSelectedTest(test);
    setAgreed(false);
    setShowInstructions(true);
  };

  const handlePreview = () => {
    setShowInstructions(false);
    setShowSections(true);
  };

  const handleAttemptSection = (
    section: UserTestSection,
    index: number
  ) => {
    console.log('Attempt Section', {
      section,
      index,
    });

    // Later:
    // router.push(...)
  };

  return (
    <>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--text)]">
            Tests
          </h1>

          <p className="mt-1 text-sm text-[var(--muted2)]">
            Attempt assessments and track your performance.
          </p>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div
              key={test._id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text)]">
                    {test.title}
                  </h2>

                  <p className="mt-1 text-sm text-[var(--muted2)]">
                    {test.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--muted2)]">
                    <span>{test.totalSections} Sections</span>
                    <span>{test.totalDuration} Minutes</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAttempt(test)}
                  className="rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
                >
                  {test.attempted ? 'Preview →' : 'Attempt →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TestInstructionsModal
        open={showInstructions}
        testTitle={selectedTest?.title || ''}
        agreed={agreed}
        onAgreeChange={setAgreed}
        onClose={() => {
          setShowInstructions(false);
          setAgreed(false);
        }}
        onPreview={handlePreview}
      />

      <TestSectionsModal
        open={showSections}
        test={selectedTest}
        enabledSectionIndex={enabledSectionIndex}
        completedSectionIds={completedSectionIds}
        onClose={() => setShowSections(false)}
        onAttemptSection={handleAttemptSection}
      />
    </>
  );
}