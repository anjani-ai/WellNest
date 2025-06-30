import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, MessageCircle, Mic, Play, Pause, RotateCcw, Brain, Clock } from "lucide-react";

const DemoMentalReset = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sessionStage, setSessionStage] = useState("introduction");
  const [stageTitle, setStageTitle] = useState("Welcome to Your Mental Reset");
  const [stageDescription, setStageDescription] = useState("Let's take a moment to center ourselves.");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            clearInterval(intervalId);
            setIsPlaying(false);
            return 0;
          }
          return newProgress;
        });
      }, 300);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }
  };

  const resetProgress = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-2xl font-semibold">{stageTitle}</CardTitle>
        <CardDescription className="text-muted-foreground">{stageDescription}</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-primary" />
            <span>Current Progress:</span>
          </div>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        
        <Progress value={progress} className="mb-4" />
        
        <div className="flex items-center justify-around">
          <Button variant="outline" size="icon" onClick={resetProgress} disabled={isPlaying}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button variant="secondary" size="lg" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? "Pause Reset" : "Start Reset"}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleVoice}>
            {isVoiceActive ? <Mic className="w-4 h-4 text-emerald-500" /> : <Mic className="w-4 h-4" />}
          </Button>
        </div>

        <audio ref={audioRef} src="/audio/guided-meditation.mp3" preload="auto" />
      </CardContent>
    </Card>
  );
};

export default DemoMentalReset;
