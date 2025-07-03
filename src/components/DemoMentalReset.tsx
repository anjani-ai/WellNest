import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Sparkles, MessageCircle, Mic, Play, Pause, RotateCcw, Brain, MicOff, RefreshCw, Download, Target, AlertTriangle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuotes } from "@/hooks/useQuotes";
import { useTriggerDetection } from "@/hooks/useTriggerDetection";
import { useMoodTracking } from "@/hooks/useMoodTracking";
import { useHabitCoaching } from "@/hooks/useHabitCoaching";
import { useWellnessExport } from "@/hooks/useWellnessExport";
import { getCurrentLanguage, setLanguage, getTranslation, getSupportedLanguages, SupportedLanguage } from "@/services/languageApi";

const DemoMentalReset = () => {
  // Existing state
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
  
  // New state for additional features
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(getCurrentLanguage());
  const [showHabitSuggestion, setShowHabitSuggestion] = useState(false);
  
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Updated hooks - replacing weather with trigger detection
  const { quote, isLoading: quoteLoading, error: quoteError, refetchQuote } = useQuotes();
  const { analysis, response: triggerResponse, isAnalyzing, analyzeInput } = useTriggerDetection();
  const { saveMood, loadStats, stats, isLoading: moodLoading } = useMoodTracking();
  
  // New API hooks
  const { suggestion: habitSuggestion, getPersonalizedSuggestion, markHabitCompleted, isLoading: habitLoading } = useHabitCoaching();
  const { snapshot, generateSnapshot, exportData, isLoading: exportLoading } = useWellnessExport();

  // Get translations
  const t = getTranslation(currentLanguage);

  const stages = [
    { 
      id: "welcome", 
      title: "Welcome to Your Mental Reset", 
      description: t.welcome,
      startTime: 0,
      endTime: 30
    },
    { 
      id: "checkin", 
      title: "Emotional Check-in", 
      description: t.checkin,
      startTime: 30,
      endTime: 75
    },
    { 
      id: "breathing", 
      title: "Guided Breathing Exercise", 
      description: t.breathing,
      startTime: 75,
      endTime: 135
    },
    { 
      id: "affirmation", 
      title: "Personal Affirmation & Grounding", 
      description: t.affirmation,
      startTime: 135,
      endTime: 165
    },
    { 
      id: "completion", 
      title: "Integration & Completion", 
      description: t.completion,
      startTime: 165,
      endTime: 180
    }
  ];

  // Load initial data when component mounts
  useEffect(() => {
    console.log('DemoMentalReset component mounted, loading initial data...');
    loadStats();
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        await generatePersonalizedResponse(transcript);
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
  }, [currentLanguage]);

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
            
            if (isVoiceActive && synthRef.current) {
              const utterance = new SpeechSynthesisUtterance(currentStage.description);
              utterance.rate = 0.8;
              utterance.pitch = 1;
              utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
              synthRef.current.speak(utterance);
            }
          }
          
          setProgress(newProgress);
          
          if (newSeconds >= 180) {
            clearInterval(intervalId);
            setIsPlaying(false);
            handleSessionComplete();
            return 180;
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, sessionStage, isVoiceActive, currentLanguage]);

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

  const generatePersonalizedResponse = async (input: string) => {
    // Analyze triggers first
    await analyzeInput(input);
    
    const responses = {
      stressed: currentLanguage === 'hi' 
        ? "मैं समझ रहा हूं कि आप तनाव महसूस कर रहे हैं। यह बिल्कुल वैध है - तनाव आपके शरीर का यह बताने का तरीका है कि कुछ ध्यान देने की जरूरत है।"
        : "I hear that you're feeling stressed. That's completely valid - stress is your body's way of telling you something needs attention.",
      anxious: currentLanguage === 'hi'
        ? "चिंता भारी लग सकती है, लेकिन आप अभी सुरक्षित हैं। आइए मिलकर आपको वर्तमान क्षण में वापस लाते हैं।"
        : "Anxiety can feel overwhelming, but you're safe right now. Let's work together to bring you back to the present moment.",
      tired: currentLanguage === 'hi'
        ? "मानसिक थकान वास्तविक है और इसे स्वीकार करना महत्वपूर्ण है। ये कुछ मिनट लेकर आप वास्तव में अपनी भावनात्मक बैटरी रिचार्ज कर रहे हैं।"
        : "Mental fatigue is real and important to acknowledge. By taking these few minutes, you're actually recharging your emotional batteries.",
      default: currentLanguage === 'hi'
        ? "साझा करने के लिए धन्यवाद। आपकी भावनाएं वैध हैं, और आप देखभाल और ध्यान के इस क्षण के हकदार हैं।"
        : "Thank you for sharing. Your feelings are valid, and you deserve this moment of care and attention."
    };

    const lowerInput = input.toLowerCase();
    let response = responses.default;
    let detectedMood = 'mixed';

    if (lowerInput.includes('stress') || lowerInput.includes('stressed') || lowerInput.includes('तनाव')) {
      response = responses.stressed;
      detectedMood = 'stressed';
    } else if (lowerInput.includes('anxious') || lowerInput.includes('anxiety') || lowerInput.includes('चिंता')) {
      response = responses.anxious;
      detectedMood = 'anxious';
    } else if (lowerInput.includes('tired') || lowerInput.includes('exhausted') || lowerInput.includes('थका')) {
      response = responses.tired;
      detectedMood = 'tired';
    }

    setPersonalizedMessage(response);

    // Save mood entry and get personalized habit suggestion
    try {
      await saveMood(detectedMood, ['Mental Reset Session'], input);
      await getPersonalizedSuggestion(detectedMood, ['Mental Reset Session']);
      setShowHabitSuggestion(true);
      console.log('Mood data saved and habit suggestion generated');
    } catch (error) {
      console.error('Failed to save mood data or get habit suggestion:', error);
    }

    if (isVoiceActive && synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
      synthRef.current.speak(utterance);
    }
  };

  const handleSessionComplete = async () => {
    try {
      await saveMood('completed', ['3-minute reset', 'breathing exercise', 'mindfulness'], 'Completed full mental reset session');
      
      toast({
        title: "Session Complete! 🎉",
        description: "You've successfully completed your 3-minute mental reset. Your progress has been saved!",
      });
    } catch (error) {
      console.error('Error saving session completion:', error);
      toast({
        title: "Session Complete! 🎉",
        description: "You've successfully completed your 3-minute mental reset. Well done!",
      });
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      console.log('Starting mental reset session...');
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
    setStageDescription(t.welcome);
    setBreathingPhase("inhale");
    setBreathingCount(4);
    setUserInput("");
    setPersonalizedMessage("");
    setShowHabitSuggestion(false);
    
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    
    console.log('Session reset');
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
      console.log('Voice input started');
      toast({
        title: "Listening...",
        description: "Share how you're feeling - I'm here to listen.",
      });
    }
  };

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    toast({
      title: newLanguage === 'hi' ? "भाषा बदली गई" : "Language Changed",
      description: newLanguage === 'hi' ? "हिंदी में स्विच किया गया" : "Switched to English",
    });
  };

  const handleExportData = async () => {
    await generateSnapshot();
    await exportData();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    const instructions = t.breathing_instructions;
    switch (breathingPhase) {
      case "inhale":
        return `${instructions.inhale}... ${breathingCount}`;
      case "hold":
        return `${instructions.hold}... ${breathingCount}`;
      case "exhale":
        return `${instructions.exhale}... ${breathingCount}`;
      default:
        return "Follow your natural breath";
    }
  };

  const getAffirmationMessage = () => {
    if (personalizedMessage) {
      return `${personalizedMessage} ${currentLanguage === 'hi' ? 'याद रखें, आपमें जो भी सामना कर रहे हैं उससे निपटने की शक्ति है।' : 'Remember, you have the strength to navigate whatever you\'re facing.'}`;
    }

    if (quote && !quoteLoading) {
      return `"${quote.content}" - ${quote.author}. ${currentLanguage === 'hi' ? 'आप लचीले हैं और आपके पास आज की चुनौतियों से निपटने के लिए सब कुछ है।' : 'You are resilient and have everything within you to handle today\'s challenges.'}`;
    }

    return currentLanguage === 'hi' 
      ? "आप लचीले हैं। आपके पास आज की चुनौतियों से निपटने के लिए सब कुछ है। आपकी कीमत आपकी उत्पादकता या प्रदर्शन से निर्धारित नहीं होती।"
      : "You are resilient. You have everything within you to handle today's challenges. Your worth isn't determined by your productivity or performance.";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground shadow-lg rounded-2xl overflow-hidden border-0">
      <CardHeader className="p-8 pb-6 bg-gradient-to-r from-secondary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-playfair font-semibold mb-2">{stageTitle}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{stageDescription}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-accent/20 text-accent-foreground px-4 py-2">
              3-min session
            </Badge>
            {stats && (
              <Badge variant="outline" className="px-3 py-1">
                {stats.totalSessions} sessions completed
              </Badge>
            )}
            
            {/* Language Selector */}
            <div className="flex space-x-1">
              {getSupportedLanguages().map((lang) => (
                <Button
                  key={lang.code}
                  size="sm"
                  variant={currentLanguage === lang.code ? "default" : "outline"}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="px-2 py-1 text-xs"
                >
                  {lang.nativeName}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Updated Real-time Data Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">AI Trigger Analysis</span>
                {isAnalyzing && <RefreshCw className="w-3 h-3 animate-spin" />}
              </div>
              {triggerResponse ? (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{triggerResponse.message}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={triggerResponse.urgency === 'high' ? 'destructive' : triggerResponse.urgency === 'medium' ? 'default' : 'secondary'} className="text-xs">
                      {triggerResponse.category} - {triggerResponse.severity}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Share your feelings to get personalized support</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Daily Inspiration</span>
                {quoteLoading && <RefreshCw className="w-3 h-3 animate-spin" />}
              </div>
              {quote ? (
                <p className="text-xs text-muted-foreground">"{quote.content.slice(0, 80)}..." - {quote.author}</p>
              ) : quoteError ? (
                <p className="text-xs text-red-500">Quote service unavailable</p>
              ) : (
                <Button size="sm" variant="outline" onClick={refetchQuote} disabled={quoteLoading}>
                  Get Inspiration
                </Button>
              )}
            </div>
          </div>

          {/* Trigger Response Section */}
          {triggerResponse && (
            <div className={`rounded-lg p-4 border ${
              triggerResponse.urgency === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
              triggerResponse.urgency === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
              'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                {triggerResponse.urgency === 'high' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                <h3 className={`font-semibold ${
                  triggerResponse.urgency === 'high' ? 'text-red-800 dark:text-red-200' :
                  triggerResponse.urgency === 'medium' ? 'text-yellow-800 dark:text-yellow-200' :
                  'text-blue-800 dark:text-blue-200'
                }`}>
                  Personalized Support Suggestions
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">{triggerResponse.message}</p>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Recommended actions:</p>
                  <ul className="text-sm space-y-1">
                    {triggerResponse.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Micro-Habit Suggestion */}
          {showHabitSuggestion && habitSuggestion && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800 dark:text-green-200">Personalized Micro-Habit</h3>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">{habitSuggestion.habit.title} ({habitSuggestion.habit.duration})</h4>
                <p className="text-sm text-muted-foreground">{habitSuggestion.habit.description}</p>
                <p className="text-sm">{habitSuggestion.reason}</p>
                <p className="text-sm italic text-green-700 dark:text-green-300">{habitSuggestion.personalizedTip}</p>
                <Button 
                  size="sm" 
                  onClick={() => markHabitCompleted(habitSuggestion.habit.id)}
                  className="mt-2"
                >
                  Mark as Completed
                </Button>
              </div>
            </div>
          )}

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
                <p className="text-lg">{currentLanguage === 'hi' ? 'आपके व्यक्तिगत मानसिक कल्याण स्थान में आपका स्वागत है।' : 'Welcome to your personal mental wellness space.'}</p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' 
                    ? 'अगले 3 मिनट के लिए, यह आपका समय है। विक्षेपों को एक तरफ रखें और अपने साथ उपस्थित रहें।'
                    : 'For the next 3 minutes, this is your time. Put aside distractions and be present with yourself.'
                  }
                </p>
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-sm">
                    💡 <strong>{currentLanguage === 'hi' ? 'सुझाव:' : 'Tip:'}</strong> {currentLanguage === 'hi' 
                      ? 'एक आरामदायक स्थिति खोजें, एक गहरी सांस लें, और खुद को इस क्षण में आने दें।'
                      : 'Find a comfortable position, take a deep breath, and let yourself arrive in this moment.'
                    }
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
                    <strong>{currentLanguage === 'hi' ? 'आप अभी कैसा महसूस कर रहे हैं?' : 'How are you feeling right now?'}</strong>
                  </p>
                  <p className="text-base text-muted-foreground">
                    {currentLanguage === 'hi' 
                      ? 'अपने साथ जांच करने के लिए एक क्षण लें। आप कौन सी भावनाएं अनुभव कर रहे हैं? आपके दिमाग में क्या विचार हैं? आपकी प्रतिक्रिया आपकी कल्याण यात्रा को ट्रैक करने के लिए सहेजी जाएगी।'
                      : 'Take a moment to check in with yourself. What emotions are you experiencing? What thoughts are on your mind? Your response will be saved to track your wellness journey.'
                    }
                  </p>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={startVoiceInput}
                      disabled={isListening || !isPlaying || moodLoading}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      {isRecording ? (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                          {currentLanguage === 'hi' ? 'सुन रहा है...' : 'Listening...'}
                        </>
                      ) : moodLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          {currentLanguage === 'hi' ? 'सहेज रहा है...' : 'Saving...'}
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          {t.buttons.share}
                        </>
                      )}
                    </Button>
                    
                    {userInput && (
                      <div className="bg-accent/10 rounded-lg p-4 text-left">
                        <p className="text-sm font-medium mb-2">{currentLanguage === 'hi' ? 'आपने साझा किया:' : 'You shared:'}</p>
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
                    {currentLanguage === 'hi' 
                      ? '4-7-8 सांस लेना आपके शरीर की प्राकृतिक विश्राम प्रतिक्रिया को सक्रिय करता है'
                      : '4-7-8 breathing activates your body\'s natural relaxation response'
                    }
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm">
                    <strong>{currentLanguage === 'hi' ? 'विज्ञान:' : 'Science:'}</strong> {currentLanguage === 'hi' 
                      ? 'यह सांस लेने का पैटर्न आपकी वेगस तंत्रिका को उत्तेजित करता है, कॉर्टिसोल को कम करता है और तुरंत शांति के लिए आपके पैरासिम्पैथेटिक तंत्रिका तंत्र को सक्रिय करता है।'
                      : 'This breathing pattern stimulates your vagus nerve, reducing cortisol and activating your parasympathetic nervous system for instant calm.'
                    }
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
                    <p className="text-sm font-medium mb-2">{currentLanguage === 'hi' ? 'ग्राउंडिंग एक्सरसाइज:' : 'Grounding Exercise:'}</p>
                    <p className="text-sm">
                      {currentLanguage === 'hi' ? (
                        <>
                          अभी, नाम बताएं: <br />
                          • 3 चीजें जो आप अपने आसपास देख सकते हैं <br />
                          • 2 आवाजें जो आप सुन सकते हैं <br />
                          • 1 चीज जो आप शारीरिक रूप से महसूस कर सकते हैं
                        </>
                      ) : (
                        <>
                          Right now, name: <br />
                          • 3 things you can see around you <br />
                          • 2 sounds you can hear <br />
                          • 1 thing you can physically feel
                        </>
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'hi' 
                      ? 'यह आपको वर्तमान क्षण में पूरी तरह से लाता है, जहां आपके पास शक्ति और विकल्प है।'
                      : 'This brings you fully into the present moment, where you have power and choice.'
                    }
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
                  <p className="text-xl font-medium">{currentLanguage === 'hi' ? 'आपने कर दिया! आपका मानसिक रीसेट पूरा हो गया।' : 'You did it! Your mental reset is complete.'}</p>
                  <p className="text-base text-muted-foreground">
                    {currentLanguage === 'hi' 
                      ? 'एक क्षण रुकें और देखें: 3 मिनट पहले की तुलना में आप अब कैसा महसूस करते हैं?'
                      : 'Take a moment to notice: How do you feel now compared to 3 minutes ago?'
                    }
                  </p>
                  <div className="bg-secondary/10 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">✨ {currentLanguage === 'hi' ? 'आपने जो हासिल किया:' : 'What you accomplished:'}</p>
                    <ul className="text-sm text-left space-y-1">
                      <li>• {currentLanguage === 'hi' ? 'भावनात्मक जागरूकता और आत्म-करुणा का अभ्यास किया' : 'Practiced emotional awareness and self-compassion'}</li>
                      <li>• {currentLanguage === 'hi' ? 'आपके शरीर के प्राकृतिक तनाव-राहत सिस्टम को सक्रिय किया' : 'Activated your body\'s natural stress-relief system'}</li>
                      <li>• {currentLanguage === 'hi' ? 'सकारात्मक न्यूरल पाथवे को मजबूत किया' : 'Reinforced positive neural pathways'}</li>
                      <li>• {currentLanguage === 'hi' ? 'आपका डेटा आपकी कल्याण यात्रा को ट्रैक करने के लिए सहेजा गया है' : 'Your data has been saved to track your wellness journey'}</li>
                    </ul>
                  </div>
                  {stats && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        🎯 {currentLanguage === 'hi' 
                          ? `अब आपके पास ${stats.totalSessions + 1} पूर्ण सत्र हैं!${stats.streak > 0 ? ` आपकी वर्तमान स्ट्रीक: ${stats.streak} दिन।` : ''}`
                          : `You now have ${stats.totalSessions + 1} completed sessions!${stats.streak > 0 ? ` Your current streak: ${stats.streak} days.` : ''}`
                        }
                      </p>
                    </div>
                  )}
                  <p className="text-sm font-medium text-accent">
                    {currentLanguage === 'hi' 
                      ? 'इसे दैनिक अभ्यास बनाने पर विचार करें - केवल 3 मिनट भी समय के साथ आपकी मानसिक कल्याण को बदल सकते हैं।'
                      : 'Consider making this a daily practice - even 3 minutes can transform your mental wellness over time.'
                    }
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
                  {t.buttons.pause}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  {progress > 0 ? (currentLanguage === 'hi' ? 'फिर से शुरू करें' : 'Resume') : t.buttons.start}
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

            <Button
              variant="outline"
              size="icon"
              onClick={handleExportData}
              disabled={exportLoading}
              className="border-green-500 text-green-500 hover:bg-green-50"
            >
              {exportLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            </Button>
          </div>

          {/* Updated Status Indicators */}
          <div className="text-center space-y-2">
            {isVoiceActive && (
              <p className="text-sm text-accent">🎤 {currentLanguage === 'hi' ? 'आवाज मार्गदर्शन सक्रिय' : 'Voice guidance active'}</p>
            )}
            {isRecording && (
              <p className="text-sm text-red-500">🔴 {currentLanguage === 'hi' ? 'आपकी आवाज रिकॉर्ड कर रहा है...' : 'Recording your voice...'}</p>
            )}
            {userInput && !isRecording && (
              <p className="text-sm text-green-600">✓ {currentLanguage === 'hi' ? 'आवाज इनपुट प्राप्त और सहेजा गया' : 'Voice input received and saved'}</p>
            )}
            {moodLoading && (
              <p className="text-sm text-blue-500">💾 {currentLanguage === 'hi' ? 'आपका कल्याण डेटा सहेज रहा है...' : 'Saving your wellness data...'}</p>
            )}
            {isAnalyzing && (
              <p className="text-sm text-blue-500">🧠 {currentLanguage === 'hi' ? 'आपकी भावनाओं का विश्लेषण कर रहा है...' : 'Analyzing your emotional state...'}</p>
            )}
            {triggerResponse && (
              <p className="text-sm text-green-600">
                ✓ {currentLanguage === 'hi' 
                  ? `व्यक्तिगत सहायता सुझाव तैयार (${triggerResponse.category})`
                  : `Personalized support suggestions ready (${triggerResponse.category})`
                }
              </p>
            )}
            {stats && (
              <p className="text-sm text-muted-foreground">
                📊 {currentLanguage === 'hi' 
                  ? `कुल सत्र: ${stats.totalSessions} | औसत मूड: ${stats.averageMood}/5`
                  : `Total sessions: ${stats.totalSessions} | Average mood: ${stats.averageMood}/5`
                }
              </p>
            )}
            {snapshot && (
              <p className="text-sm text-purple-600">
                📈 {currentLanguage === 'hi' 
                  ? `कल्याण स्नैपशॉट तैयार! ${snapshot.insights.length} अंतर्दृष्टि उपलब्ध।`
                  : `Wellness snapshot ready! ${snapshot.insights.length} insights available.`
                }
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoMentalReset;
