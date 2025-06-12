import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobBoard - Find Your Next Career Opportunity",
  description: "Discover and apply to the best job opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {/* Gradient background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-indigo-500 to-purple-600 opacity-20"></div>
        
        {/* Mesh gradient overlay */}
        <div className="fixed inset-0 -z-10 bg-[url('/mesh-gradient.svg')] bg-cover bg-center opacity-40"></div>
        
        {/* Dot pattern */}
        <div className="fixed inset-0 -z-10 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
        
        {/* Glass morphism effect */}
        <div className="fixed inset-0 -z-10 backdrop-blur-[100px]"></div>
        
        <AuthProvider>
          <div className="flex flex-col min-h-screen relative z-0">
            <Header />
            <main className="flex-grow container mx-auto py-8 px-4">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
