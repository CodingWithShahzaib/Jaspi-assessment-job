"use client";

import { JobForm } from "@/components/jobs/JobForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function NewJobPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <JobForm />
      </div>
    </ProtectedRoute>
  );
} 