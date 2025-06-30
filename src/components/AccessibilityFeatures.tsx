
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Ear, Hand, Globe, Mic, Type, Moon, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AccessibilityFeatures = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");
  const { toast } = useToast();

  const accessibilityFeatures = [
    {
      icon: Eye,
      title: "Visual Accessibility",
      description: "High contrast, large fonts, screen reader optimization",
      features: [
        "WCAG 2.1 AA compliance",
        "Adjustable font sizes (16px - 24px)",
        "High contrast color schemes",
        "Focus indicators and navigation",
        "Alt text for all images and icons"
      ],
      demoId: "visual",
      gradient: "from-wellness-mint to-wellness-ocean"
    },
    {
      icon: Ear,
      title: "Auditory Support",
      description: "Voice input, text-to-speech, and audio feedback",
      features: [
        "Voice journaling with speech recognition",
        "Text-to-speech for all content",
        "Audio cues for interactions",
        "Adjustable playback speed",
        "Offline voice support"
      ],
      demoId: "auditory",
      gradient: "from-wellness-lavender to-wellness-coral"
    },
    {
      icon: Hand,
      title: "Motor Accessibility",
      description: "Keyboard navigation, touch-friendly, and gesture support",
      features: [
        "Full keyboard navigation",
        "Large touch targets (44px minimum)",
        "Voice commands for all actions",
        "Customizable gesture controls",
        "One-handed operation mode"
      ],
      demoId: "motor",
      gradient: "from-wellness-sunset to-wellness-mint"
    },
    {
      icon: Globe,
      title: "Cultural & Language Support",
      description: "Multilingual interface with cultural wellness adaptation",
      features: [
        "English and Hindi interfaces",
        "Cultural wellness practices integration",
        "Respectful mental health terminology",
        "Local community resources",
        "Culturally appropriate affirmations"
      ],
      demoId: "cultural",
      gradient: "from-wellness-ocean to-wellness-forest"
    }
  ];

  const inclusiveDesignPrinciples = [
    {
      principle: "Universal Design",
      description: "Usable by all people, to the greatest extent possible, without adaptation",
      example: "Voice input works for users with motor disabilities and busy multitaskers alike"
    },
    {
      principle: "Flexible Interaction",
      description: "Multiple ways to accomplish the same wellness goals",
      example: "Mood tracking via emoji, voice, text, or even typing pattern analysis"
    },
    {
      principle: "Simple & Intuitive",
      description: "Easy to understand regardless of experience or language skills",
      example: "3-minute sessions with clear visual progress and simple next steps"
    },
    {
      principle: "Perceptible Information",
      description: "Information communicated effectively regardless of ambient conditions",
      example: "Visual, auditory, and haptic feedback for all important interactions"
    }
  ];

  const handleDemoToggle = (demoId: string) => {
    setActiveDemo(activeDemo === demoId ? null : demoId);
    toast({
      title: `${activeDemo === demoId ? 'Disabled' : 'Enabled'} ${demoId} demo`,
      description: "Experience accessibility features in action",
    });
  };

  const handleLanguageToggle = () => {
    const newLang = language === "English" ? "Hindi" : "English";
    setLanguage(newLang);
    toast({
      title: `Language switched to ${newLang}`,
      description: newLang === "Hindi" ? "भाषा हिंदी में बदली गई" : "Language changed to English",
    });
  };

  return (
    <div className="space-y-12">
      {/* Accessibility Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {accessibilityFeatures.map((feature, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
                <Button
                  variant={activeDemo === feature.demoId ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDemoToggle(feature.demoId)}
                >
                  {activeDemo === feature.demoId ? "Stop Demo" : "Try Demo"}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {feature.features.map((featureItem, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className={activeDemo === feature.demoId ? "text-primary font-medium" : ""}>
                      {featureItem}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* Demo States */}
              {activeDemo === feature.demoId && (
                <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>Demo Active: {feature.title} features enabled</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Accessibility Demo */}
      <Card className="bg-gradient-to-r from-wellness-mint/10 to-wellness-ocean/10 border-wellness-mint/20">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">Live Accessibility Demo</CardTitle>
          <CardDescription>
            Try WellNest's accessibility features right now
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-wellness-ocean" />
              <div>
                <div className="font-semibold">Current Language: {language}</div>
                <div className="text-sm text-muted-foreground">
                  {language === "Hindi" ? "भाषा समर्थन सक्रिय है" : "Language support is active"}
                </div>
              </div>
            </div>
            <Button onClick={handleLanguageToggle} variant="outline">
              Switch to {language === "English" ? "Hindi" : "English"}
            </Button>
          </div>

          {/* Font Size Demo */}
          <div className="p-4 rounded-lg bg-card border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Type className="w-5 h-5 text-wellness-lavender" />
                <span className="font-semibold">Adjustable Text Size</span>
              </div>
              <Badge>AA Compliant</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm">Small (14px): How are you feeling today?</div>
              <div className="text-base">Medium (16px): How are you feeling today?</div>
              <div className="text-lg">Large (18px): How are you feeling today?</div>
              <div className="text-xl">Extra Large (20px): How are you feeling today?</div>
            </div>
          </div>

          {/* Voice Input Demo */}
          <div className="p-4 rounded-lg bg-card border">
            <div className="flex items-center space-x-3 mb-3">
              <Mic className="w-5 h-5 text-wellness-coral" />
              <span className="font-semibold">Voice Input</span>
              <Badge variant="outline">Try saying "I feel anxious"</Badge>
            </div>
            <div className="p-3 rounded bg-muted/50 text-sm italic">
              🎙️ Voice input active - speak naturally about your feelings
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inclusive Design Principles */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-playfair font-semibold mb-2">Inclusive Design Principles</h3>
          <p className="text-muted-foreground">Our accessibility foundation built on proven UX principles</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inclusiveDesignPrinciples.map((principle, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{principle.principle}</CardTitle>
                <CardDescription>{principle.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-wellness-mint/10 border-l-4 border-wellness-mint">
                  <p className="text-sm"><strong>Example:</strong> {principle.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Accessibility Statistics */}
      <Card className="gradient-wellness text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">Accessibility Impact</CardTitle>
          <CardDescription className="text-white/90">
            Making mental wellness truly accessible to everyone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">1.3B</div>
              <div className="text-sm text-white/80">People with disabilities worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">71%</div>
              <div className="text-sm text-white/80">Websites fail basic accessibility</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-white/80">WellNest WCAG 2.1 AA compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">3x</div>
              <div className="text-sm text-white/80">Higher engagement with accessible design</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Examples */}
      <Card className="border-2 border-dashed border-primary">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Real-World Integration</span>
          </CardTitle>
          <CardDescription>
            How WellNest accessibility features work in different environments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-wellness-forest">🏫 Schools & Universities</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Screen reader support for visually impaired students</li>
                <li>• Voice input for students with writing difficulties</li>
                <li>• Large text modes for reading disabilities</li>
                <li>• Multilingual support for ESL students</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-wellness-ocean">🏢 Corporate Wellness</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard-only navigation for motor disabilities</li>
                <li>• High contrast modes for visual fatigue</li>
                <li>• Voice commands for hands-free operation</li>
                <li>• Cultural adaptation for diverse workforces</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-wellness-coral">🌍 Community Health</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• SMS integration for low-tech devices</li>
                <li>• Offline voice support</li>
                <li>• Simple language and clear instructions</li>
                <li>• Cultural wellness practice integration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityFeatures;
