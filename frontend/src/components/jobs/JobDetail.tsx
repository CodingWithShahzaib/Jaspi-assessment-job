"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getJobById, deleteJob } from "@/services/jobService";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface JobDetailProps {
  id: string;
}

export function JobDetail({ id }: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch job details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, toast]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteJob(id);
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job. Please try again later.",
        variant: "destructive",
      });
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Job not found</h2>
        <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link href="/" passHref>
          <Button>Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{job.title}</CardTitle>
          <div className="flex items-center text-muted-foreground">
            <span>{job.location}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
            {job.updatedAt !== job.createdAt && (
              <p>Updated: {new Date(job.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Link href={`/jobs/${id}/edit`} passHref>
            <Button variant="outline">Edit Job</Button>
          </Link>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Job"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center">
        <Link href="/" passHref>
          <Button variant="ghost">Back to Jobs</Button>
        </Link>
      </div>
    </motion.div>
  );
} 