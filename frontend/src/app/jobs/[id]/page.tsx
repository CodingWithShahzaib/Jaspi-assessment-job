import { JobDetail } from "@/components/jobs/JobDetail";

interface JobPageProps {
  params: {
    id: string;
  };
}

export default function JobPage({ params }: JobPageProps) {
  const jobId = params.id;
  
  return (
    <div>
      <JobDetail id={jobId} />
    </div>
  );
} 