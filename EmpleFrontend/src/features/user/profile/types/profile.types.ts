export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  description: string;
}

export type TemplateId = 'minimal' | 'modern' | 'card';

export interface Profile {
  _id?: string;
  userId?: string;
  name: string;
  email: string;
  bio: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  template: TemplateId;
}

export const BLANK_EDUCATION: Education = { institution: '', degree: '', field: '', startYear: '', endYear: '' };
export const BLANK_EXPERIENCE: Experience = { company: '', role: '', startYear: '', endYear: '', description: '' };
export const DEFAULT_PROFILE: Profile = { name: '', email: '', bio: '', education: [], experience: [], skills: [], template: 'modern' };
