
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, Brain, Zap, MessageSquare, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handlePlayDemo = () => {
    setIsPlaying(true);
    toast({
      title: "Reset Session Started! 🌱",
      description: "Your personalized 3-minute Mental Reset Capsule is beginning...",
    });
    
    setTimeout(() => {
      setIsPlaying(false);
      toast({
        title: "Reset Complete! ✨",
        description: "How do you feel? Your progress has been saved.",
      });
    }, 5000);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-wellness-mint/30 via-background to-secondary/10" />
      
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-accent/20 text-accent-foreground text-sm px-4 py-2">
                🏆 Health Hackathon 2024
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-playfair font-semibold leading-tight">
                Your daily mental reset,
                <span className="text-secondary"> personalized </span>
                by AI
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                <strong className="text-accent">WellNest:</strong> 3-minute AI wellness sessions 
                accessible through voice, text, or emoji - making mental health support available to everyone.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
                <Brain className="w-6 h-6 text-secondary" />
                <div>
                  <div className="font-semibold text-sm">Emotion-Aware</div>
                  <div className="text-xs text-muted-foreground">AI understands you</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
                <Heart className="w-6 h-6 text-accent" />
                <div>
                  <div className="font-semibold text-sm">3-Min Sessions</div>
                  <div className="text-xs text-muted-foreground">Fits any schedule</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
                <Zap className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Multi-lingual</div>
                  <div className="text-xs text-muted-foreground">English & Hindi</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handlePlayDemo}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Session Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Try 3-Min Reset
                  </>
                )}
              </Button>
              
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                View Features
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-background" />
                  ))}
                </div>
                <span>500+ beta users</span>
              </div>
              <div>⭐ 4.8/5 wellness impact</div>
            </div>
          </div>

          {/* Right Column - Mock App Interface */}
          <div className="relative">
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Heart className="w-5 h-5 text-wellness-dark" />
                    </div>
                    <div>
                      <div className="font-semibold">Mental Reset Capsule</div>
                      <div className="text-sm text-muted-foreground">Personalized for you</div>
                    </div>
                  </div>
                  <Badge className="bg-accent/20 text-accent-foreground">3 min</Badge>
                </div>

                {/* Mood Input Options */}
                <div className="space-y-3">
                  <div className="text-sm font-medium">How are you feeling? (English/हिंदी)</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { emoji: '😊', label: 'Happy' },
                      { emoji: '😔', label: 'Sad' },
                      { emoji: '😰', label: 'Anxious' },
                      { emoji: '😴', label: 'Tired' }
                    ].map((mood, i) => (
                      <button
                        key={i}
                        className={`p-3 rounded-lg border-2 text-2xl transition-all ${
                          i === 1 ? 'border-secondary bg-secondary/10' : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        <div>{mood.emoji}</div>
                        <div className="text-xs mt-1">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Response */}
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex-shrink-0" />
                    <div className="text-sm">
                      <strong>WellNest AI:</strong> I sense you're feeling down today. 
                      Let's start with a gentle breathing exercise, followed by a personalized 
                      affirmation that matches your energy. Ready? 🌱
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="text-sm border-secondary text-secondary">
                    <Mic className="w-4 h-4 mr-1" />
                    Voice Input
                  </Button>
                  <Button variant="outline" className="text-sm border-accent text-accent-foreground">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Text Journal
                  </Button>
                </div>
              </div>

              {/* Activity Indicator */}
              {isPlaying && (
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-secondary animate-ping" />
              )}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent/30 animate-breathe" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 rounded-full bg-secondary/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
