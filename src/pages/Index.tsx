
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Clock, Users, Zap, Globe, Moon, Sun, Mic, MessageSquare, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import DemoMentalReset from "@/components/DemoMentalReset";

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
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Heart className="w-4 h-4 text-wellness-dark" />
            </div>
            <span className="font-playfair font-semibold text-xl">WellNest</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#demo" className="hover:text-primary transition-colors">Demo</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Your Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Problem Statement & Value */}
        <section className="py-16 px-4 bg-wellness-mint/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-6">
              Mental wellness shouldn't be a luxury
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg text-wellness-coral">The Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    70% of young adults struggle with daily stress but lack accessible, 
                    personalized mental health support that fits their busy lives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg text-secondary">Our Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    AI-powered 3-minute daily wellness sessions that adapt to your emotions, 
                    accessible through voice, text, or emoji in English and Hindi.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">The Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Democratizing mental wellness through inclusive design, making daily 
                    emotional support available to everyone, everywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/20 text-accent-foreground">
                USER STORY
              </Badge>
              <blockquote className="text-xl italic text-muted-foreground leading-relaxed">
                "As a college student juggling studies and part-time work, I need a quick, 
                personalized way to check in with my mental health daily. I want something 
                that understands my emotions through simple inputs and gives me actionable 
                wellness activities that fit into my 5-minute study breaks."
              </blockquote>
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-secondary" />
                <div className="text-left">
                  <div className="font-semibold">Priya, 21</div>
                  <div className="text-sm text-muted-foreground">Psychology Student, Mumbai</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary/20 text-secondary-foreground">
                CORE FEATURES
              </Badge>
              <h2 className="text-4xl font-playfair font-semibold mb-4">
                Your Daily Mental Wellness Toolkit
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered features designed for accessibility, emotional intelligence, and real impact.
              </p>
            </div>
            
            <FeatureShowcase />
          </div>
        </section>

        {/* Interactive Demo */}
        <section id="demo" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 text-accent-foreground">
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

        {/* Project Value Summary */}
        <section id="impact" className="py-20 px-4 bg-gradient-wellness">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-playfair font-semibold text-white mb-6">
              WellNest's Core Value
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-white">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="font-semibold mb-2">AI-Powered Personalization</h3>
                <p className="text-sm opacity-90">
                  GPT-4 driven mental reset sessions that adapt to your unique emotional patterns
                </p>
              </div>
              
              <div className="text-white">
                <Globe className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="font-semibold mb-2">Inclusive by Design</h3>
                <p className="text-sm opacity-90">
                  Voice support, large fonts, English/Hindi, and culturally sensitive content
                </p>
              </div>
              
              <div className="text-white">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="font-semibold mb-2">Micro-Intervention Focus</h3>
                <p className="text-sm opacity-90">
                  3-5 minute sessions that fit into any schedule, with lasting emotional impact
                </p>
              </div>
              
              <div className="text-white">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="font-semibold mb-2">Community Impact</h3>
                <p className="text-sm opacity-90">
                  Designed for schools, startups, and NGOs to democratize mental wellness
                </p>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-white/90 mb-8">
                <strong>WellNest transforms daily mental wellness from a privilege to a right,</strong> 
                making emotionally intelligent AI support accessible to everyone through inclusive design, 
                cultural sensitivity, and proven micro-intervention techniques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Your Free Reset
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Export Wellness Snapshot
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Heart className="w-4 h-4 text-wellness-dark" />
                </div>
                <span className="font-playfair font-semibold text-lg">WellNest</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI companion for daily mental wellness, making self-care accessible to everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🎯 3-min Reset Sessions</li>
                <li>🗣️ Voice & Emoji Input</li>
                <li>🌱 Micro-habit Coaching</li>
                <li>📊 Monthly Wellness Reports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Accessibility</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🌍 English & Hindi Support</li>
                <li>🔊 Screen Reader Optimized</li>
                <li>📱 WhatsApp Integration</li>
                <li>🌙 Dark Mode Available</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Impact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🏫 School Programs</li>
                <li>🚀 Startup Wellness</li>
                <li>🤝 NGO Partnerships</li>
                <li>💚 Community Health</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              <strong>"Your daily mental reset, personalized by AI, accessible to all"</strong>
              <br />
              &copy; 2024 WellNest. Built for inclusive mental wellness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
