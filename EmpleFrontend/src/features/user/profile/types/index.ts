export type TemplateType = 'modern-developer' | 'creative-designer' | 'ai-research' | 'student';

export interface Education {
  institution?: string;
  degree?: string;
  branch?: string;
  specialization?: string;
  cgpa?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
}

export interface Experience {
  company?: string;
  role?: string;
  employmentType?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  currentRole?: boolean;
  description?: string;
}

export interface Project {
  name: string;
  description?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  images?: string[];
  order?: number;
}

export interface Certification {
  name: string;
  issuer?: string;
  date?: Date | string;
  url?: string;
}

export interface Achievement {
  title: string;
  description?: string;
  date?: Date | string;
}

export interface Skills {
  frontend?: string[];
  backend?: string[];
  ai_ml?: string[];
  cloud?: string[];
  devops?: string[];
  languages?: string[];
  tools?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  leetcode?: string;
  codeforces?: string;
  hackerrank?: string;
  kaggle?: string;
  twitter?: string;
  youtube?: string;
}

export interface PersonalInfo {
  fullName?: string;
  headline?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
}

export interface About {
  bio?: string;
  professionalSummary?: string;
  careerObjective?: string;
}

export interface UserProfile {
  _id?: string;
  userId?: string;
  username?: string;
  template?: TemplateType;
  personalInfo?: PersonalInfo;
  about?: About;
  education?: Education[];
  experience?: Experience[];
  projects?: Project[];
  skills?: Skills;
  certifications?: Certification[];
  achievements?: Achievement[];
  socialLinks?: SocialLinks;
  resumeUrl?: string;
  profilePhoto?: string;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
