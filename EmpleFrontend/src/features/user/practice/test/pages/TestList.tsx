'use client';

import { useState } from 'react';
import TestInstructionsView from '../components/TestInstructionsView';
import TestSectionsPreview from '../components/TestSectionsPreview';
import { UserTest, UserTestSection } from '../types/test.types';
import TestAttempt from './TestAttempt';
import TestFeedbackView from '../components/TestFeedbackView';

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
        _id: 's1',
        title: 'MCQ Assessment',
        type: 'mcq',
        duration: 30,
        numberOfQuestions: 20,
      },
      {
        _id: 's2',
        title: 'Coding Round',
        type: 'coding',
        duration: 60,
        numberOfQuestions: 2,
      },
      {
        _id: 's3',
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
  const [view, setView] = useState<
  'list' | 'instructions' | 'sections' | 'attempt' | 'feedback'
>('list');

  const [agreed, setAgreed] = useState(false);
 const [enabledSectionIndex, setEnabledSectionIndex] = useState(0);
const [completedSectionIds, setCompletedSectionIds] = useState<string[]>([]);
  const [activeSection, setActiveSection] =
  useState<UserTestSection | null>(null);

const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleAttempt = (test: UserTest) => {
    setSelectedTest(test);
    setAgreed(false);
    setView('instructions');
  };

  const handleBackToList = () => {
    setSelectedTest(null);
    setAgreed(false);
    setView('list');
  };
  const handleAttemptSection = (
  section: UserTestSection,
  index: number
) => {
  setActiveSection(section);
  setActiveSectionIndex(index);
  setView('attempt');
 
    // Later:
    // router.push(...)
  };

  if (view === 'instructions' && selectedTest) {
    return (
      <TestInstructionsView
        test={selectedTest}
        agreed={agreed}
        onAgreeChange={setAgreed}
        onBack={handleBackToList}
        onPreview={() => setView('sections')}
      />
    );
  }

  if (view === 'sections' && selectedTest) {
    return (
      <TestSectionsPreview
        test={selectedTest}
        enabledSectionIndex={enabledSectionIndex}
        completedSectionIds={completedSectionIds}
        onBack={() => setView('instructions')}
        onAttemptSection={handleAttemptSection}
      />
    );
  }

  if (
  view === 'attempt' &&
  selectedTest &&
  activeSection
) {
  return (
    <TestAttempt
      testId={selectedTest._id}
      section={activeSection}
      sectionIndex={activeSectionIndex}
      onBackToSections={() => setView('sections')}
  onSectionCompleted={(sectionId) => {
  const nextCompleted = completedSectionIds.includes(sectionId)
    ? completedSectionIds
    : [...completedSectionIds, sectionId];

  setCompletedSectionIds(nextCompleted);

  if (
    selectedTest &&
    nextCompleted.length === selectedTest.sections.length
  ) {
    setView('feedback');
    return;
  }

  setEnabledSectionIndex((prev) => {
    const nextIndex = prev + 1;

    if (!selectedTest || nextIndex >= selectedTest.sections.length) {
      return prev;
    }

    return nextIndex;
  });

  setView('sections');
}}
    />
  );
}
if (view === 'feedback') {
  return (
    <TestFeedbackView
      onBack={() => setView('sections')}
      onSubmit={(payload) => {
        console.log('Feedback submitted:', payload);
        setView('list');
      }}
    />
  );
}

  return (
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
  );
}