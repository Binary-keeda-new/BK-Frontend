import type { TestSectionAttemptData } from "../../services/testAttempt.service";

export type Status = 'not-visited' | 'not-attempted' | 'answered' | 'flagged';

export type QuestionMode = 'mcq' | 'multi' | 'nat';

export type Question = TestSectionAttemptData['questions'][number];
