
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handlePlayDemo = () => {
    setIsPlaying(true);
    toast({
      title: "Demo Started! 🌱",
      description: "Your 3-minute Mental Reset Capsule is beginning...",
    });
    
    // Simulate demo completion
    setTimeout(() => {
      setIsPlaying(false);
      toast({
        title: "Reset Complete! ✨",
        description: "You've experienced the power of AI-guided wellness.",
      });
    }, 5000);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-wellness-mint/10 via-wellness-sky/5 to-wellness-lavender/10" />
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-wellness-mint/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-wellness-ocean/15 blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-wellness-mint/20 text-wellness-forest text-sm px-4 py-2">
                🏆 Health Hackathon 2024 Finalist
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-playfair font-semibold leading-tight">
                Your AI
                <span className="gradient-wellness bg-clip-text text-transparent"> Wellness </span>
                Companion
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Personalized 3-minute daily mental reset powered by AI - making wellness accessible, 
                one micro-moment at a time.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
                <Brain className="w-6 h-6 text-wellness-ocean" />
                <div>
                  <div className="font-semibold text-sm">AI-Powered</div>
                  <div className="text-xs text-muted-foreground">GPT-4 & LangChain</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
                <Heart className="w-6 h-6 text-wellness-coral" />
                <div>
                  <div className="font-semibold text-sm">3-Min Sessions</div>
                  <div className="text-xs text-muted-foreground">Quick & Effective</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
                <Zap className="w-6 h-6 text-wellness-mint" />
                <div>
                  <div className="font-semibold text-sm">Accessible</div>
                  <div className="text-xs text-muted-foreground">Voice + Multi-lang</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-wellness text-white hover:scale-105 transition-transform"
                onClick={handlePlayDemo}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Demo Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo (3 min)
                  </>
                )}
              </Button>
              
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                View Architecture
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-wellness-mint to-wellness-ocean border-2 border-background" />
                  ))}
                </div>
                <span>500+ beta testers</span>
              </div>
              <div>⭐ 4.9/5 wellness impact score</div>
            </div>
          </div>

          {/* Right Column - Visual Demo */}
          <div className="relative">
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border">
              {/* Mock App Interface */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full gradient-wellness flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Mental Reset Capsule</div>
                      <div className="text-sm text-muted-foreground">Personalized for you</div>
                    </div>
                  </div>
                  <Badge className="bg-wellness-mint/20 text-wellness-forest">3 min</Badge>
                </div>

                {/* Mood Selection */}
                <div className="space-y-3">
                  <div className="text-sm font-medium">How are you feeling right now?</div>
                  <div className="grid grid-cols-4 gap-2">
                    {['😊', '😔', '😰', '😴'].map((emoji, i) => (
                      <button
                        key={i}
                        className={`p-3 rounded-lg border-2 text-2xl transition-all ${
                          i === 1 ? 'border-wellness-mint bg-wellness-mint/10' : 'border-border hover:border-wellness-mint/50'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Response */}
                <div className="p-4 rounded-lg bg-wellness-mint/10 border border-wellness-mint/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full gradient-wellness flex-shrink-0" />
                    <div className="text-sm">
                      <strong>WellNest AI:</strong> I notice you're feeling a bit down today. 
                      Let's start with a gentle breathing exercise, followed by a personalized affirmation 
                      that resonates with your current energy. Ready? 🌱
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="text-sm">
                    🫁 Breathe with me
                  </Button>
                  <Button variant="outline" className="text-sm">
                    📝 Quick journal
                  </Button>
                </div>
              </div>

              {/* Floating Animation Elements */}
              {isPlaying && (
                <>
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-wellness-mint animate-ping" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-wellness-ocean animate-pulse" />
                </>
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-wellness-sunset/30 animate-breathe" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 rounded-full bg-wellness-lavender/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
