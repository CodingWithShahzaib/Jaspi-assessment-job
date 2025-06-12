import { CreateJobInput, Job, UpdateJobInput } from "@/types/job";
import { getAuthHeaders } from "./authService";

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getAllJobs(): Promise<Job[]> {
  const response = await fetch(`${API_URL}/jobs`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function getJobById(id: string): Promise<Job> {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch job with id ${id}`);
  }
  return response.json();
}

export async function createJob(job: CreateJobInput): Promise<Job> {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(job),
  });
  if (!response.ok) {
    throw new Error("Failed to create job");
  }
  return response.json();
}

export async function updateJob(job: UpdateJobInput): Promise<Job> {
  const { id, ...jobData } = job;
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update job with id ${id}`);
  }
  return response.json();
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to delete job with id ${id}`);
  }
}

export async function generateJobDescription(title: string): Promise<string> {
  const response = await fetch(`${API_URL}/jobs/generate-description`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to generate job description");
  }
  
  const data = await response.json();
  return data.description;
} 