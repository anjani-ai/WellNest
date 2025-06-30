
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Play, Pause, RotateCcw, Mic, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DemoMentalReset = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMood, setSelectedMood] = useState(2); // 0-4 scale
  const [progress, setProgress] = useState(0);
  const [sessionData, setSessionData] = useState({
    duration: 180, // 3 minutes in seconds
    completed: false,
    insights: []
  });
  
  const { toast } = useToast();

  const moods = [
    { emoji: "😔", label: "Low", color: "bg-red-100 border-red-300" },
    { emoji: "😐", label: "Meh", color: "bg-yellow-100 border-yellow-300" },
    { emoji: "😊", label: "Good", color: "bg-green-100 border-green-300" },
    { emoji: "😄", label: "Great", color: "bg-blue-100 border-blue-300" },
    { emoji: "🤩", label: "Amazing", color: "bg-purple-100 border-purple-300" }
  ];

  const demoSteps = [
    {
      title: "Mood Check-in",
      description: "How are you feeling right now?",
      component: "moodSelector",
      duration: 30
    },
    {
      title: "AI Analysis",
      description: "Understanding your emotional state...",
      component: "aiAnalysis",
      duration: 15
    },
    {
      title: "Personalized Affirmation",
      description: "Receiving your custom wellness message",
      component: "affirmation",
      duration: 45
    },
    {
      title: "Micro-Activity",
      description: "Quick wellness action based on your mood",
      component: "microActivity",
      duration: 60
    },
    {
      title: "Reset Complete",
      description: "Your mental reset session is complete!",
      component: "completion",
      duration: 30
    }
  ];

  const aiResponses = {
    0: "I see you're having a tough moment. Let's focus on gentle self-compassion and grounding techniques.",
    1: "You're feeling neutral today - a perfect time for some mindful appreciation and energy building.",
    2: "Great to see you're feeling good! Let's amplify this positive energy with gratitude practice.",
    3: "Your positive energy is wonderful! Time to share that joy and build on your happiness.",
    4: "You're radiating amazing energy! Let's channel this into meaningful connections and growth."
  };

  const affirmations = {
    0: "You are stronger than you know, and this feeling is temporary. You deserve kindness, especially from yourself.",
    1: "Today is full of possibilities waiting for you to discover. Your presence matters more than you realize.",
    2: "You're doing better than you think. Your efforts and growth deserve recognition and celebration.",
    3: "Your positive energy creates ripples of good in the world. Keep shining your authentic light.",
    4: "You are a force of joy and inspiration. Your happiness contributes to making the world brighter."
  };

  const microActivities = {
    0: { title: "5-4-3-2-1 Grounding", description: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste." },
    1: { title: "Gratitude Moment", description: "Think of one small thing that went well today, no matter how tiny." },
    2: { title: "Body Appreciation", description: "Thank one part of your body for supporting you today." },
    3: { title: "Joy Sharing", description: "Send a quick message of appreciation to someone you care about." },
    4: { title: "Energy Expansion", description: "Do a 30-second dance or celebration move to spread your joy!" }
  };

  useEffect(() => {
    let interval;
    if (isRunning && currentStep < demoSteps.length - 1) {
      interval = setInterval(() => {
        setProgress(prev => {
          const stepDuration = demoSteps[currentStep].duration;
          const increment = 100 / stepDuration;
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            setCurrentStep(current => current + 1);
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    toast({
      title: "Mental Reset Starting! 🌱",
      description: "Your personalized 3-minute wellness session begins now.",
    });
  };

  const pauseDemo = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "Demo Paused" : "Demo Resumed",
      description: isRunning ? "Take your time!" : "Continuing your wellness journey...",
    });
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setSelectedMood(2);
    toast({
      title: "Demo Reset",
      description: "Ready to start fresh!",
    });
  };

  const completeStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
    } else {
      setIsRunning(false);
      toast({
        title: "🎉 Mental Reset Complete!",
        description: "You've experienced the power of AI-guided wellness. How do you feel?",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Demo Controls */}
      <Card className="bg-gradient-to-r from-wellness-mint/10 to-wellness-ocean/10 border-wellness-mint/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-playfair">Interactive Mental Reset Demo</CardTitle>
          <CardDescription className="text-lg">
            Experience a live 3-minute personalized wellness session powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={startDemo}
              disabled={isRunning}
              className="gradient-wellness text-white"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Demo Session
            </Button>
            
            <Button
              onClick={pauseDemo}
              disabled={!isRunning && currentStep === 0}
              variant="outline"
              size="lg"
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? "Pause" : "Resume"}
            </Button>
            
            <Button
              onClick={resetDemo}
              variant="ghost"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {demoSteps.length}</span>
              <span>{Math.round((currentStep / (demoSteps.length - 1)) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / (demoSteps.length - 1)) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Demo Session Interface */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gradient-wellness flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>{demoSteps[currentStep].title}</CardTitle>
                <CardDescription>{demoSteps[currentStep].description}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="border-wellness-mint">
              {demoSteps[currentStep].duration}s
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step-specific Content */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">How are you feeling right now?</h3>
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMood(index)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      selectedMood === index 
                        ? `${mood.color} scale-105 shadow-md` 
                        : 'border-border hover:border-wellness-mint/50 hover:scale-102'
                    }`}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="text-sm font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>
              <Button onClick={completeStep} className="w-full">
                Continue with {moods[selectedMood].label} mood
              </Button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-full gradient-wellness flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">AI is analyzing your mood...</div>
                <div className="text-muted-foreground">Using GPT-4 and emotion recognition algorithms</div>
                <Progress value={progress} className="h-2" />
              </div>
              {progress > 80 && (
                <div className="p-4 rounded-lg bg-wellness-mint/10 border border-wellness-mint/20">
                  <p className="text-sm">{aiResponses[selectedMood]}</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-4">Your Personalized Affirmation</h3>
                <div className="p-6 rounded-xl gradient-lavender text-white">
                  <p className="text-lg font-medium leading-relaxed">
                    "{affirmations[selectedMood]}"
                  </p>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  💝 This affirmation was crafted specifically for your current emotional state
                </div>
              </div>
              <Button onClick={completeStep} className="w-full">
                I've absorbed this message
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Micro-Wellness Activity</h3>
              <Card className="bg-wellness-sky/10 border-wellness-ocean/20">
                <CardHeader>
                  <CardTitle className="text-xl">{microActivities[selectedMood].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">{microActivities[selectedMood].description}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Take 60 seconds for this activity</span>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={completeStep} className="w-full">
                I've completed the activity
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full gradient-wellness flex items-center justify-center">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-semibold mb-2">Reset Complete! 🎉</h3>
                <p className="text-lg text-muted-foreground">
                  You've successfully completed your 3-minute Mental Reset Capsule
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-lg bg-muted/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wellness-mint">3:00</div>
                  <div className="text-sm text-muted-foreground">Session Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wellness-ocean">{moods[selectedMood].emoji}</div>
                  <div className="text-sm text-muted-foreground">Mood Addressed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wellness-coral">+1</div>
                  <div className="text-sm text-muted-foreground">Wellness Point</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetDemo} className="gradient-wellness text-white">
                  Try Another Session
                </Button>
                <Button variant="outline">
                  View My Wellness Report
                </Button>
              </div>
            </div>
          )}

          {/* Voice Input Option */}
          {currentStep === 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4" />
                  <span>Voice input available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Text journaling supported</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoMentalReset;
