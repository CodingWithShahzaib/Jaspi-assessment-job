import { JobForm } from "@/components/jobs/JobForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const jobId = params.id;
  
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
        <JobForm id={jobId} />
      </div>
    </ProtectedRoute>
  );
} 