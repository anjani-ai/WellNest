
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, MessageCircle, Mic, Play, Pause, RotateCcw, Brain, Clock, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DemoMentalReset = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sessionStage, setSessionStage] = useState("welcome");
  const [stageTitle, setStageTitle] = useState("Welcome to Your Mental Reset");
  const [stageDescription, setStageDescription] = useState("Let's take a moment to center ourselves and check in with your emotions.");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingCount, setBreathingCount] = useState(4);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [personalizedMessage, setPersonalizedMessage] = useState("");
  
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const stages = [
    { 
      id: "welcome", 
      title: "Welcome to Your Mental Reset", 
      description: "Take a deep breath. You've given yourself the gift of 3 minutes for your mental wellness.",
      startTime: 0,
      endTime: 30
    },
    { 
      id: "checkin", 
      title: "Emotional Check-in", 
      description: "How are you feeling right now? Share what's on your mind - there's no judgment here.",
      startTime: 30,
      endTime: 75
    },
    { 
      id: "breathing", 
      title: "Guided Breathing Exercise", 
      description: "Let's reset your nervous system together. Follow the breathing pattern - inhale for 4, hold for 7, exhale for 8.",
      startTime: 75,
      endTime: 135
    },
    { 
      id: "affirmation", 
      title: "Personal Affirmation & Grounding", 
      description: "You've shown up for yourself today. Here's a reminder of your inner strength.",
      startTime: 135,
      endTime: 165
    },
    { 
      id: "completion", 
      title: "Integration & Completion", 
      description: "Notice the shift in how you feel. You've successfully completed your mental reset.",
      startTime: 165,
      endTime: 180
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        generatePersonalizedResponse(transcript);
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setIsRecording(false);
        toast({
          title: "Voice input not available",
          description: "Please type your response or continue with the session.",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
    }

    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Main session timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setSecondsElapsed(prev => {
          const newSeconds = prev + 1;
          const newProgress = (newSeconds / 180) * 100;
          
          const currentStage = stages.find(stage => 
            newSeconds >= stage.startTime && newSeconds < stage.endTime
          );
          
          if (currentStage && currentStage.id !== sessionStage) {
            setSessionStage(currentStage.id);
            setStageTitle(currentStage.title);
            setStageDescription(currentStage.description);
            
            // Provide audio guidance for new stages
            if (isVoiceActive && synthRef.current) {
              const utterance = new SpeechSynthesisUtterance(currentStage.description);
              utterance.rate = 0.8;
              utterance.pitch = 1;
              synthRef.current.speak(utterance);
            }
          }
          
          setProgress(newProgress);
          
          if (newSeconds >= 180) {
            clearInterval(intervalId);
            setIsPlaying(false);
            toast({
              title: "Session Complete! 🎉",
              description: "You've successfully completed your 3-minute mental reset. Well done!",
            });
            return 180;
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, sessionStage, isVoiceActive]);

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

  const generatePersonalizedResponse = (input: string) => {
    const responses = {
      stressed: "I hear that you're feeling stressed. That's completely valid - stress is your body's way of telling you something needs attention. You're taking the right step by being here.",
      anxious: "Anxiety can feel overwhelming, but you're safe right now. Let's work together to bring you back to the present moment where you have control.",
      tired: "Mental fatigue is real and important to acknowledge. By taking these few minutes, you're actually recharging your emotional batteries.",
      overwhelmed: "When everything feels like too much, remember: you don't have to solve everything right now. Focus on this moment, this breath.",
      sad: "Sadness is a natural emotion that shows your capacity for deep feeling. Allow yourself to experience it without judgment - you're being brave.",
      angry: "Anger often masks hurt or frustration. It's okay to feel this way. Let's channel this energy toward your healing and well-being.",
      default: "Thank you for sharing. Your feelings are valid, and you deserve this moment of care and attention. Let's continue your reset together."
    };

    const lowerInput = input.toLowerCase();
    let response = responses.default;

    if (lowerInput.includes('stress') || lowerInput.includes('stressed')) response = responses.stressed;
    else if (lowerInput.includes('anxious') || lowerInput.includes('anxiety') || lowerInput.includes('worry')) response = responses.anxious;
    else if (lowerInput.includes('tired') || lowerInput.includes('exhausted') || lowerInput.includes('fatigue')) response = responses.tired;
    else if (lowerInput.includes('overwhelmed') || lowerInput.includes('too much')) response = responses.overwhelmed;
    else if (lowerInput.includes('sad') || lowerInput.includes('down') || lowerInput.includes('depressed')) response = responses.sad;
    else if (lowerInput.includes('angry') || lowerInput.includes('mad') || lowerInput.includes('frustrated')) response = responses.angry;

    setPersonalizedMessage(response);

    if (isVoiceActive && synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      synthRef.current.speak(utterance);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({
        title: "Session Started",
        description: "Your 3-minute mental reset journey begins now. Find a comfortable position.",
      });
    }
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
    setUserInput("");
    setPersonalizedMessage("");
    
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    
    toast({
      title: "Session Reset",
      description: "Ready to start fresh whenever you are.",
    });
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    toast({
      title: `Voice ${!isVoiceActive ? 'enabled' : 'disabled'}`,
      description: !isVoiceActive ? "Audio guidance is now active" : "Switched to visual-only mode",
    });
  };

  const startVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setIsRecording(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Share how you're feeling - I'm here to listen.",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case "inhale":
        return `Breathe in slowly through your nose... ${breathingCount}`;
      case "hold":
        return `Hold your breath gently... ${breathingCount}`;
      case "exhale":
        return `Exhale slowly through your mouth... ${breathingCount}`;
      default:
        return "Follow your natural breath";
    }
  };

  const getAffirmationMessage = () => {
    if (personalizedMessage) {
      return `Based on what you shared: "${personalizedMessage}" Remember, you have the strength to navigate whatever you're facing.`;
    }
    return "You are resilient. You have everything within you to handle today's challenges. Your worth isn't determined by your productivity or performance.";
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
                <p className="text-lg">Welcome to your personal mental wellness space.</p>
                <p className="text-sm text-muted-foreground">
                  For the next 3 minutes, this is your time. Put aside distractions and be present with yourself.
                </p>
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-sm">
                    💡 <strong>Tip:</strong> Find a comfortable position, take a deep breath, and let yourself arrive in this moment.
                  </p>
                </div>
              </div>
            )}

            {sessionStage === "checkin" && (
              <div className="space-y-6 text-center max-w-2xl">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-lg">
                    <strong>How are you feeling right now?</strong>
                  </p>
                  <p className="text-base text-muted-foreground">
                    Take a moment to check in with yourself. What emotions are you experiencing? 
                    What thoughts are on your mind? You can share by voice or simply reflect silently.
                  </p>
                  
                  {/* Voice Input Section */}
                  <div className="space-y-3">
                    <Button
                      onClick={startVoiceInput}
                      disabled={isListening || !isPlaying}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      {isRecording ? (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                          Listening...
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Share Your Feelings
                        </>
                      )}
                    </Button>
                    
                    {userInput && (
                      <div className="bg-accent/10 rounded-lg p-4 text-left">
                        <p className="text-sm font-medium mb-2">You shared:</p>
                        <p className="text-sm italic">"{userInput}"</p>
                      </div>
                    )}
                    
                    {personalizedMessage && (
                      <div className="bg-secondary/10 rounded-lg p-4 text-left">
                        <p className="text-sm">{personalizedMessage}</p>
                      </div>
                    )}
                  </div>
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
                    4-7-8 breathing activates your body's natural relaxation response
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm">
                    <strong>Science:</strong> This breathing pattern stimulates your vagus nerve, 
                    reducing cortisol and activating your parasympathetic nervous system for instant calm.
                  </p>
                </div>
              </div>
            )}

            {sessionStage === "affirmation" && (
              <div className="space-y-6 text-center max-w-2xl">
                <MessageCircle className="w-10 h-10 mx-auto text-accent" />
                <div className="space-y-4">
                  <blockquote className="text-xl italic font-medium">
                    {getAffirmationMessage()}
                  </blockquote>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Grounding Exercise:</p>
                    <p className="text-sm">
                      Right now, name: <br />
                      • 3 things you can see around you <br />
                      • 2 sounds you can hear <br />
                      • 1 thing you can physically feel
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This brings you fully into the present moment, where you have power and choice.
                  </p>
                </div>
              </div>
            )}

            {sessionStage === "completion" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-4">
                  <p className="text-xl font-medium">You did it! Your mental reset is complete.</p>
                  <p className="text-base text-muted-foreground">
                    Take a moment to notice: How do you feel now compared to 3 minutes ago?
                  </p>
                  <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">✨ What you accomplished:</p>
                    <ul className="text-sm text-left space-y-1">
                      <li>• Practiced emotional awareness and self-compassion</li>
                      <li>• Activated your body's natural stress-relief system</li>
                      <li>• Reinforced positive neural pathways</li>
                      <li>• Invested in your long-term mental wellness</li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium text-accent">
                    Consider making this a daily practice - even 3 minutes can transform your mental wellness over time.
                  </p>
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
              {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="text-center space-y-2">
            {isVoiceActive && (
              <p className="text-sm text-accent">🎤 Voice guidance active</p>
            )}
            {isRecording && (
              <p className="text-sm text-red-500">🔴 Recording your voice...</p>
            )}
            {userInput && !isRecording && (
              <p className="text-sm text-green-600">✓ Voice input received</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoMentalReset;
