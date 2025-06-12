"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ChevronDown, User, LogOut, Briefcase, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 py-4 px-4">
      <div className="absolute inset-0 glossy"></div>
      
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-primary opacity-70 blur-sm group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/80 rounded-full p-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <span className="text-xl font-bold text-gradient">
            JobBoard
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-2">
            <li>
              <Link href="/" passHref>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10">Jobs</Button>
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/jobs/new" passHref>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10">
                      <Plus className="h-4 w-4 mr-1" />
                      Post a Job
                    </Button>
                  </Link>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2 flex items-center rounded-full glossy border-0 hover:bg-white/20"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span className="max-w-[100px] truncate">{user?.name}</span>
                        <ChevronDown className="h-3 w-3 ml-1 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl glossy border-0 shadow-lg">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/20" />
                      <Link href="/jobs/new">
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
                          <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Post a Job</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem 
                        onClick={logout}
                        className="cursor-pointer text-rose-500 hover:bg-rose-500/5"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" passHref>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/register" passHref>
                    <Button 
                      size="sm" 
                      className="rounded-full bg-gradient-primary hover:opacity-90 text-white shadow-md shadow-blue-500/20"
                    >
                      Register
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2 rounded-full hover:bg-white/10 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative z-10"
          >
            <div className="glossy absolute inset-0"></div>
            <nav className="container mx-auto py-4 relative z-10">
              <ul className="flex flex-col space-y-3">
                <li>
                  <Link href="/" passHref onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start rounded-lg">Jobs</Button>
                  </Link>
                </li>
                
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link href="/jobs/new" passHref onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start rounded-lg">
                          <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                          Post a Job
                        </Button>
                      </Link>
                    </li>
                    <li className="pt-2 border-t border-white/10">
                      <div className="px-4 py-2 text-sm text-muted-foreground flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span>
                          Signed in as <span className="font-medium text-foreground">{user?.name}</span>
                        </span>
                      </div>
                    </li>
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-rose-500 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login" passHref onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start rounded-lg">Login</Button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/register" passHref onClick={() => setMobileMenuOpen(false)}>
                        <Button 
                          className="w-full rounded-lg bg-gradient-primary hover:opacity-90 text-white"
                        >
                          Register
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 