/* ═══════════════════════════════════════════
   ATS MODULE — TYPE DEFINITIONS
═══════════════════════════════════════════ */

/** Active analysis mode */
export type ATSMode = 'standard' | 'ai';

/** Current state of an analysis run */
export type ATSAnalysisState = 'idle' | 'loading' | 'success' | 'error';

/* ─── Standard ATS ─── */

export interface StandardATSResult {
  score: number;
  skill_match_score: number;
  experience_match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  extra_skills: string[];
  job_skills?: string[];
  resume_skills?: string[];
}

/* ─── AI ATS ─── */

export interface SkillAlignment {
  semantic_score: number;
  matched: string[];
  missing_critical: string[];
}

export interface ExperienceRelevance {
  relevance_score: number;
  gaps: string[];
}

export interface WritingQuality {
  quality_score: number;
  issues: string[];
}

export interface OverallFit {
  fit_score: number;
  indicators: string[];
}

export interface SkillGapAnalysis {
  critical_missing_skills: string[];
  recommended_skills_to_add: string[];
  skills_to_emphasize_more: string[];
}

export interface KeywordAnalysis {
  missing_important_keywords: string[];
  keywords_found: string[];
}

export interface FeedbackParagraphs {
  strengths: string;
  weaknesses: string;
  overall_assessment: string;
  improvement_suggestions: string;
}

export interface ActionableRecommendations {
  immediate_changes: string[];
  content_improvements: string[];
  formatting_tips: string[];
}

export interface DetailedFeedback {
  skill_gap_analysis: SkillGapAnalysis;
  keyword_analysis: KeywordAnalysis;
  feedback_paragraphs: FeedbackParagraphs;
  actionable_recommendations: ActionableRecommendations;
}

export interface AIATSEvaluation {
  skill_alignment: SkillAlignment;
  experience_relevance: ExperienceRelevance;
  writing_quality: WritingQuality;
  overall_fit: OverallFit;
  detailed_feedback: DetailedFeedback;
}

export interface AIATSExtraction {
  resume: {
    skills: string[];
    roles: string[];
    seniority: string;
    domains: string[];
    education: string[];
    certifications: string[];
  };
  job: {
    required_skills: string[];
    preferred_skills: string[];
    experience_level: string;
    role_focus: string;
    mandatory_qualifications: string[];
  };
}

export interface AIATSResult {
  final_score_percent: number;
  extraction: AIATSExtraction;
  evaluation: AIATSEvaluation;
}

/* ─── API Responses ─── */

export interface ATSApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/* ─── Component Props ─── */

export interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}

export interface ScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface SkillChipProps {
  label: string;
  variant: 'matched' | 'missing' | 'extra' | 'neutral';
}
