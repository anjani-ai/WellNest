
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Clock, Users, Zap, Globe, Moon, Sun, Mic, MessageSquare, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import DemoMentalReset from "@/components/DemoMentalReset";
import TechArchitecture from "@/components/TechArchitecture";
import AccessibilityFeatures from "@/components/AccessibilityFeatures";
import ImpactMetrics from "@/components/ImpactMetrics";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: `${newDarkMode ? 'Dark' : 'Light'} mode activated`,
      description: "Your preference has been saved for better accessibility.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-wellness flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-playfair font-semibold text-xl">WellNest</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#demo" className="hover:text-primary transition-colors">Demo</a>
            <a href="#tech" className="hover:text-primary transition-colors">Technology</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button className="gradient-wellness text-white">
              Start Your Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Key Features */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-wellness-indigo/20 text-wellness-indigo">
                AI-POWERED WELLNESS
              </Badge>
              <h2 className="text-4xl font-playfair font-semibold mb-4">
                Complete Mental Wellness Ecosystem
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Combining emotion-aware AI, micro-habit coaching, and accessibility-first design 
                for meaningful daily mental health interventions.
              </p>
            </div>
            
            <FeatureShowcase />
          </div>
        </section>

        {/* Interactive Demo */}
        <section id="demo" className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-wellness-cyan/20 text-wellness-cyan">
                LIVE DEMO
              </Badge>
              <h2 className="text-4xl font-playfair font-semibold mb-4">
                Experience Your Mental Reset Capsule
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Try our signature 3-minute personalized wellness session powered by AI.
              </p>
            </div>
            
            <DemoMentalReset />
          </div>
        </section>

        {/* Technology & Architecture */}
        <section id="tech" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-wellness-purple/20 text-wellness-purple">
                TECHNICAL INNOVATION
              </Badge>
              <h2 className="text-4xl font-playfair font-semibold mb-4">
                Built for Scale & Impact
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Modern AI architecture with LangChain, GPT-4, vector databases, and accessibility-first design.
              </p>
            </div>
            
            <TechArchitecture />
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-wellness-orange/20 text-wellness-orange">
                ACCESSIBILITY FIRST
              </Badge>
              <h2 className="text-4xl font-playfair font-semibold mb-4">
                Wellness for Everyone
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Designed for diverse needs with voice support, multilingual interface, and universal accessibility.
              </p>
            </div>
            
            <AccessibilityFeatures />
          </div>
        </section>

        {/* Impact & Scalability */}
        <section id="impact" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-wellness-pink/20 text-wellness-pink">
                REAL-WORLD IMPACT
              </Badge>
              <h2 className="text-4xl font-playfair font-semibold mb-4">
                Scaling Mental Wellness
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From individual users to schools, startups, and NGOs - WellNest is designed for global impact.
              </p>
            </div>
            
            <ImpactMetrics />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 gradient-wellness">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-playfair font-semibold text-white mb-6">
              Ready to Transform Mental Wellness?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the movement towards accessible, AI-powered daily mental health support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Free Reset
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View GitHub Repository
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full gradient-wellness flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-playfair font-semibold text-lg">WellNest</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI companion for daily mental wellness, making self-care accessible to everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#demo" className="hover:text-primary">Demo</a></li>
                <li><a href="#tech" className="hover:text-primary">Technology</a></li>
                <li><a href="#" className="hover:text-primary">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">GitHub</a></li>
                <li><a href="#" className="hover:text-primary">Discord</a></li>
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 WellNest. Built for the Health Hackathon 2024. Making mental wellness accessible to all.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
