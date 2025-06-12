"use client";

import { JobList } from "@/components/jobs/JobList";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Briefcase, ArrowRight, TrendingUp, Globe, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mt-8 -mx-4 md:-mx-8 lg:-mx-24 px-4 py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full glossy">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-500" /> 
              <span className="text-sm font-medium">Over 2,000+ jobs available</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Find Your Dream Job</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discover opportunities that match your experience and career goals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="#job-listings">
                <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-gradient-primary hover:opacity-90 shadow-lg shadow-blue-500/20">
                  <Search className="mr-2 h-5 w-5" /> Browse Jobs
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link href="/register">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-2 border-blue-500/20 hover:bg-blue-500/5 hover:border-blue-500/30">
                    Create Account <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link href="/jobs/new">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-2 border-blue-500/20 hover:bg-blue-500/5 hover:border-blue-500/30">
                    Post a Job <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="glossy rounded-2xl p-4">
                <div className="text-3xl font-bold text-gradient">2K+</div>
                <div className="text-sm text-muted-foreground">Jobs Available</div>
              </div>
              <div className="glossy rounded-2xl p-4">
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="glossy rounded-2xl p-4">
                <div className="text-3xl font-bold text-gradient">10K+</div>
                <div className="text-sm text-muted-foreground">Candidates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Popular Categories</h2>
            <p className="text-muted-foreground">Explore jobs by category</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Design", icon: "🎨", count: 120 },
              { name: "Development", icon: "💻", count: 230 },
              { name: "Marketing", icon: "📊", count: 87 },
              { name: "Customer Service", icon: "🤝", count: 65 },
              { name: "Sales", icon: "💰", count: 92 },
              { name: "Finance", icon: "📈", count: 45 },
              { name: "Healthcare", icon: "⚕️", count: 73 },
              { name: "Education", icon: "🎓", count: 51 },
            ].map((category) => (
              <Link href="#job-listings" key={category.name}>
                <div className="glass-card p-5 text-center hover:cursor-pointer">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} jobs</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Job Listings */}
      <section id="job-listings" className="container mx-auto scroll-mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Job Openings</h2>
              <p className="text-muted-foreground">Find your perfect role from our curated listings</p>
            </div>
            {isAuthenticated && (
              <Link href="/jobs/new">
                <Button className="rounded-full bg-gradient-primary hover:opacity-90 shadow-md shadow-blue-500/20">
                  Post a Job <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          <JobList />
        </motion.div>
      </section>
      
      {/* How it works */}
      <section className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to find your next job</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search Jobs</h3>
              <p className="text-muted-foreground">Browse through our extensive list of job openings</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Apply</h3>
              <p className="text-muted-foreground">Submit your application with just a few clicks</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Hired</h3>
              <p className="text-muted-foreground">Connect with employers and start your new career</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
