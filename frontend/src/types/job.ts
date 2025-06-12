export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  location: string;
  type?: string;
}

export interface UpdateJobInput extends Partial<CreateJobInput> {
  id: string;
} 