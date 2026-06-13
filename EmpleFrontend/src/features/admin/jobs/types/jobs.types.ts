export type JobType = 'private' | 'government';

export interface JobLink {
  label: string;
  url: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  type: JobType;
  salary?: string;
  applyLink?: string;
  links?: JobLink[];        // Government job: multiple important links
  tags?: string[];
  department?: string;
  lastDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type JobFormData = Omit<Job, '_id' | 'createdAt' | 'updatedAt'>;
