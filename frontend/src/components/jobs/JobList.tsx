"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllJobs } from "@/services/jobService";
import { Job } from "@/types/job";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight, Briefcase, Clock, Building, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch jobs. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
          <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-t-2 border-blue-400/30 animate-spin animation-delay-2000"></div>
          <div className="absolute top-4 left-4 right-4 bottom-4 rounded-full bg-blue-500/10 animate-pulse"></div>
        </div>
        <p className="mt-8 text-muted-foreground font-medium">Loading job listings...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-12 text-center"
      >
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
          <Briefcase className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-semibold mb-3">No jobs found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like there aren't any job listings yet. Be the first to post a job opportunity!
        </p>
        <Link href="/jobs/new" passHref>
          <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-gradient-primary hover:opacity-90 shadow-lg shadow-blue-500/20">
            Post a Job <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  // Helper function to get a random badge color for job types
  const getJobTypeBadgeVariant = (type: string) => {
    const types = {
      "Full-time": "default",
      "Part-time": "secondary",
      "Contract": "outline",
      "Freelance": "destructive",
      "Internship": "default"
    };
    return (types as any)[type] || "default";
  };

  // Helper function to get a random company logo color
  const getCompanyLogoColor = (id: number) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-violet-500 to-purple-600",
      "from-pink-500 to-rose-600",
      "from-amber-500 to-orange-600",
    ];
    return colors[id % colors.length];
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {jobs.map((job) => (
        <motion.div key={job.id} variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <div className="glass-card h-full flex flex-col overflow-hidden group">
            <div className="p-6 pb-3">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCompanyLogoColor(Number(job.id))} flex items-center justify-center mr-4 shadow-md`}>
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{job.location || "Remote"}</span>
                    </div>
                  </div>
                </div>
                {Math.random() > 0.7 && (
                  <div className="flex items-center bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={getJobTypeBadgeVariant(job.type || "Full-time")} className="rounded-full">
                  {job.type || "Full-time"}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {Math.floor(Math.random() * 150) + 50}K - {Math.floor(Math.random() * 50) + 150}K
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {Math.random() > 0.5 ? "Remote" : "On-site"}
                </Badge>
              </div>
              
              <p className="text-sm line-clamp-2 text-muted-foreground mb-4">
                {job.description}
              </p>
            </div>
            
            <div className="mt-auto border-t border-border/30 p-4 flex items-center justify-between">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {job.createdAt ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }) : "Recently"}
              </div>
              
              <Link href={`/jobs/${job.id}`} passHref>
                <Button size="sm" className="rounded-full bg-gradient-primary hover:opacity-90 shadow-sm shadow-blue-500/10">
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 