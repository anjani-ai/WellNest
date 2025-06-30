import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, MessageCircle, Mic, Play, Pause, RotateCcw, Brain, Clock } from "lucide-react";

const DemoMentalReset = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sessionStage, setSessionStage] = useState("welcome");
  const [stageTitle, setStageTitle] = useState("Welcome to Your Mental Reset");
  const [stageDescription, setStageDescription] = useState("Let's take a moment to center ourselves and check in with your emotions.");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stages = [
    { id: "welcome", title: "Welcome to Your Mental Reset", description: "Let's take a moment to center ourselves and check in with your emotions." },
    { id: "checkin", title: "Emotional Check-in", description: "I sense you might be feeling a bit stressed. Let's work through this together." },
    { id: "breathing", title: "Guided Breathing", description: "Follow along with this gentle breathing pattern to calm your nervous system." },
    { id: "affirmation", title: "Personal Affirmation", description: "Here's an affirmation crafted specifically for your current emotional state." },
    { id: "completion", title: "Reset Complete", description: "Well done! You've completed your 3-minute mental reset session." }
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          // Increment by ~0.56% every second to reach 100% in 3 minutes (180 seconds)
          const newProgress = prevProgress + (100 / 180);
          
          // Update stages based on progress
          if (newProgress >= 20 && newProgress < 40) {
            setSessionStage("checkin");
          } else if (newProgress >= 40 && newProgress < 70) {
            setSessionStage("breathing");
          } else if (newProgress >= 70 && newProgress < 95) {
            setSessionStage("affirmation");
          } else if (newProgress >= 95) {
            setSessionStage("completion");
          }
          
          const currentStage = stages.find(s => s.id === sessionStage);
          if (currentStage) {
            setStageTitle(currentStage.title);
            setStageDescription(currentStage.description);
          }
          
          if (newProgress >= 100) {
            clearInterval(intervalId);
            setIsPlaying(false);
            return 100;
          }
          return newProgress;
        });
      }, 1000); // Update every 1 second instead of 150ms
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, sessionStage]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetProgress = () => {
    setIsPlaying(false);
    setProgress(0);
    setSessionStage("welcome");
    setStageTitle("Welcome to Your Mental Reset");
    setStageDescription("Let's take a moment to center ourselves and check in with your emotions.");
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground shadow-lg rounded-2xl overflow-hidden border-0">
      <CardHeader className="p-8 pb-6 bg-gradient-to-r from-secondary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-playfair font-semibold mb-2">{stageTitle}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{stageDescription}</CardDescription>
          </div>
          <Badge className="bg-accent/20 text-accent-foreground px-4 py-2">
            3-min session
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Progress Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-secondary" />
                <span className="font-medium">Session Progress</span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {Math.round(progress)}% • {Math.round((180 * (100 - progress)) / 100)}s remaining
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
          </div>

          {/* Session Content Based on Stage */}
          <div className="bg-muted/30 rounded-xl p-6">
            {sessionStage === "welcome" && (
              <div className="text-center space-y-4">
                <Heart className="w-12 h-12 mx-auto text-accent animate-breathe" />
                <p className="text-lg">Ready to begin your personalized mental wellness journey?</p>
              </div>
            )}

            {sessionStage === "checkin" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <strong>WellNest AI:</strong> I can sense some tension in your voice today. 
                    Let's work through this with a gentle approach tailored just for you.
                  </div>
                </div>
              </div>
            )}

            {sessionStage === "breathing" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center animate-breathe">
                  <div className="w-8 h-8 rounded-full bg-secondary"></div>
                </div>
                <p className="text-lg">Breathe in for 4... hold for 4... breathe out for 6...</p>
                <p className="text-sm text-muted-foreground">Follow the gentle rhythm above</p>
              </div>
            )}

            {sessionStage === "affirmation" && (
              <div className="space-y-4 text-center">
                <MessageCircle className="w-10 h-10 mx-auto text-accent" />
                <blockquote className="text-lg italic">
                  "You have the strength to navigate today's challenges. 
                  Your feelings are valid, and you're taking positive steps for your wellbeing."
                </blockquote>
                <p className="text-sm text-muted-foreground">Personalized affirmation based on your emotional pattern</p>
              </div>
            )}

            {sessionStage === "completion" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <p className="text-lg font-medium">Wonderful! You've completed your mental reset.</p>
                <p className="text-sm text-muted-foreground">Your progress has been saved to your wellness snapshot.</p>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={resetProgress} 
              disabled={isPlaying}
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            
            <Button 
              size="lg" 
              onClick={togglePlay}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Reset
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  {progress > 0 ? "Resume" : "Start Reset"}
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleVoice}
              className={`${isVoiceActive ? 'border-accent text-accent bg-accent/10' : 'border-muted-foreground text-muted-foreground'}`}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          {/* Voice Indicator */}
          {isVoiceActive && (
            <div className="text-center">
              <p className="text-sm text-accent">🎤 Voice input active - you can speak your thoughts</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoMentalReset;
