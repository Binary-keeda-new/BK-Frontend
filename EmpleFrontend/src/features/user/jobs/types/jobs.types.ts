export type JobType = 'private' | 'government';

export interface GovStage {
  name?: string;
  label: string;
  status: 'released' | 'pending';
  link?: string;
}

export interface Job {
  id: string;
  type: JobType;
  title: string;
  company: string;
  location?: string;
  description: string;
  postedAt: string;
  applyLink: string;
  // Private job extras
  salary?: string;
  tags?: string[];
  // Government job extras
  stages?: GovStage[];
  department?: string;
  lastDate?: string;
}

export type FilterType = 'all' | 'private' | 'government';
