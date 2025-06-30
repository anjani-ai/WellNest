
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
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingCount, setBreathingCount] = useState(4);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const stages = [
    { 
      id: "welcome", 
      title: "Welcome to Your Mental Reset", 
      description: "Let's take a moment to center ourselves and check in with your emotions.",
      startTime: 0,
      endTime: 20
    },
    { 
      id: "checkin", 
      title: "Emotional Check-in", 
      description: "I sense you might be feeling a bit stressed. Let's acknowledge these feelings without judgment.",
      startTime: 20,
      endTime: 45
    },
    { 
      id: "breathing", 
      title: "Guided Breathing Exercise", 
      description: "Follow along with this 4-7-8 breathing pattern to activate your parasympathetic nervous system.",
      startTime: 45,
      endTime: 120
    },
    { 
      id: "affirmation", 
      title: "Personal Affirmation & Grounding", 
      description: "Here's a personalized affirmation to strengthen your emotional resilience.",
      startTime: 120,
      endTime: 165
    },
    { 
      id: "completion", 
      title: "Integration & Completion", 
      description: "Well done! Take a moment to notice how you feel now compared to when you started.",
      startTime: 165,
      endTime: 180
    }
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setSecondsElapsed(prev => {
          const newSeconds = prev + 1;
          const newProgress = (newSeconds / 180) * 100;
          
          // Update stages based on time elapsed
          const currentStage = stages.find(stage => 
            newSeconds >= stage.startTime && newSeconds < stage.endTime
          );
          
          if (currentStage && currentStage.id !== sessionStage) {
            setSessionStage(currentStage.id);
            setStageTitle(currentStage.title);
            setStageDescription(currentStage.description);
          }
          
          setProgress(newProgress);
          
          if (newSeconds >= 180) {
            clearInterval(intervalId);
            setIsPlaying(false);
            return 180;
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, sessionStage]);

  // Breathing animation logic
  useEffect(() => {
    let breathingInterval: NodeJS.Timeout;
    
    if (isPlaying && sessionStage === "breathing") {
      breathingInterval = setInterval(() => {
        setBreathingCount(prev => {
          if (breathingPhase === "inhale" && prev <= 1) {
            setBreathingPhase("hold");
            return 7;
          } else if (breathingPhase === "hold" && prev <= 1) {
            setBreathingPhase("exhale");
            return 8;
          } else if (breathingPhase === "exhale" && prev <= 1) {
            setBreathingPhase("inhale");
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(breathingInterval);
  }, [isPlaying, sessionStage, breathingPhase]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetProgress = () => {
    setIsPlaying(false);
    setProgress(0);
    setSecondsElapsed(0);
    setSessionStage("welcome");
    setStageTitle("Welcome to Your Mental Reset");
    setStageDescription("Let's take a moment to center ourselves and check in with your emotions.");
    setBreathingPhase("inhale");
    setBreathingCount(4);
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case "inhale":
        return `Breathe in slowly... ${breathingCount}`;
      case "hold":
        return `Hold your breath... ${breathingCount}`;
      case "exhale":
        return `Breathe out slowly... ${breathingCount}`;
      default:
        return "Follow your natural breath";
    }
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
                {formatTime(secondsElapsed)} / 3:00 • {Math.round(progress)}%
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
          </div>

          {/* Session Content Based on Stage */}
          <div className="bg-muted/30 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
            {sessionStage === "welcome" && (
              <div className="text-center space-y-4">
                <Heart className="w-12 h-12 mx-auto text-accent animate-pulse" />
                <p className="text-lg">Ready to begin your personalized mental wellness journey?</p>
                <p className="text-sm text-muted-foreground">
                  Take a comfortable position and allow yourself to be present in this moment.
                </p>
              </div>
            )}

            {sessionStage === "checkin" && (
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-lg">
                    <strong>WellNest AI:</strong> Let's pause and acknowledge how you're feeling right now.
                  </p>
                  <p className="text-base text-muted-foreground">
                    Whatever emotions you're experiencing - stress, anxiety, fatigue, or overwhelm - 
                    they're valid and temporary. You're taking a positive step by being here.
                  </p>
                  <p className="text-sm italic">
                    "It's okay to not be okay. What matters is that you're here, caring for yourself."
                  </p>
                </div>
              </div>
            )}

            {sessionStage === "breathing" && (
              <div className="text-center space-y-6">
                <div className={`w-20 h-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center transition-all duration-1000 ${
                  breathingPhase === "inhale" ? "scale-110" : 
                  breathingPhase === "hold" ? "scale-110" : "scale-90"
                }`}>
                  <div className={`w-12 h-12 rounded-full bg-secondary transition-all duration-1000 ${
                    breathingPhase === "inhale" ? "scale-110" : 
                    breathingPhase === "hold" ? "scale-110" : "scale-75"
                  }`}></div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-medium">{getBreathingInstruction()}</p>
                  <p className="text-sm text-muted-foreground">
                    4-7-8 breathing activates your body's relaxation response
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <p className="text-sm">
                    This breathing pattern helps reduce cortisol levels and activates your parasympathetic nervous system, 
                    naturally calming your mind and body.
                  </p>
                </div>
              </div>
            )}

            {sessionStage === "affirmation" && (
              <div className="space-y-6 text-center">
                <MessageCircle className="w-10 h-10 mx-auto text-accent" />
                <div className="space-y-4">
                  <blockquote className="text-xl italic font-medium">
                    "I have the inner strength to handle today's challenges. 
                    My feelings are temporary, but my resilience is lasting."
                  </blockquote>
                  <p className="text-base text-muted-foreground">
                    Take a moment to really feel these words. Notice any tension leaving your body.
                  </p>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Grounding technique:</strong> Name 3 things you can see, 2 things you can hear, 
                      and 1 thing you can feel right now. This brings you fully into the present moment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {sessionStage === "completion" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-4">
                  <p className="text-xl font-medium">Wonderful! You've completed your mental reset.</p>
                  <p className="text-base text-muted-foreground">
                    Take a moment to notice: How do you feel now compared to when you started?
                  </p>
                  <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">Your progress has been saved to your wellness snapshot.</p>
                    <p className="text-sm">
                      Regular 3-minute resets like this can significantly improve your emotional regulation 
                      and stress resilience over time.
                    </p>
                  </div>
                </div>
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
