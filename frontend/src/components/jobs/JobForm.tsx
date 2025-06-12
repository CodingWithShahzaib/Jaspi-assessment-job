"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { createJob, getJobById, updateJob, generateJobDescription } from "@/services/jobService";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const jobFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  id?: string;
}

export function JobForm({ id }: JobFormProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [generatingDescription, setGeneratingDescription] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const job = await getJobById(id);
          form.reset({
            title: job.title,
            description: job.description,
            location: job.location,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch job details. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setInitialLoading(false);
        }
      };

      fetchJob();
    }
  }, [id, form, toast]);

  async function onSubmit(values: JobFormValues) {
    setLoading(true);
    try {
      if (id) {
        await updateJob({ id, ...values });
        toast({
          title: "Success",
          description: "Job updated successfully",
        });
      } else {
        await createJob(values);
        toast({
          title: "Success",
          description: "Job created successfully",
        });
      }

      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: id
          ? "Failed to update job. Please try again later."
          : "Failed to create job. Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  const handleGenerateDescription = async () => {
    const title = form.getValues("title");
    
    if (!title || title.length < 3) {
      toast({
        title: "Missing Information",
        description: "Please enter a job title first (at least 3 characters)",
        variant: "destructive",
      });
      return;
    }
    
    setGeneratingDescription(true);
    
    try {
      const description = await generateJobDescription(title);
      form.setValue("description", description, { shouldValidate: true });
      
      toast({
        title: "Description Generated",
        description: "AI has created a job description based on your title",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate job description. Please try again or write your own.",
        variant: "destructive",
      });
    } finally {
      setGeneratingDescription(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
          <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-t-2 border-blue-400/30 animate-spin animation-delay-2000"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">{id ? "Edit Job" : "Create New Job"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} className="glossy border-0" />
                    </FormControl>
                    <FormDescription>
                      The title of the job position.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Remote, New York, NY" {...field} className="glossy border-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Job Description</FormLabel>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleGenerateDescription}
                        disabled={generatingDescription}
                        className="rounded-full glossy border-0 hover:bg-white/20"
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-2 text-blue-500" />
                        {generatingDescription ? 'Generating...' : 'Generate with AI'}
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job role, responsibilities, and other details..."
                        className="min-h-[200px] glossy border-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="rounded-full glossy border-0 hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="rounded-full bg-gradient-primary hover:opacity-90 shadow-md shadow-blue-500/20"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⊚</span>
                      {id ? "Updating..." : "Creating..."}
                    </>
                  ) : id ? (
                    "Update Job"
                  ) : (
                    "Create Job"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
} 