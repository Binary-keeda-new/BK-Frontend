export type JobType = 'private' | 'government';

export interface Job {
  _id: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  jobType: JobType;
  salary?: string;
  applyLink?: string;
  tags?: string[];
  department?: string;
  lastDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type JobFormData = Omit<Job, '_id' | 'createdAt' | 'updatedAt'>;
