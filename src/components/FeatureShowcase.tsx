
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Mic, MessageSquare, BarChart, Globe, Zap, Clock, Users } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: Heart,
      title: "Emotion-Aware Journaling",
      description: "Voice, text, or emoji input with AI-powered sentiment analysis and personalized insights.",
      tags: ["GPT-4", "Voice Recognition", "Sentiment AI"],
      gradient: "from-wellness-coral to-wellness-sunset",
      demo: "Try speaking: 'I'm feeling overwhelmed today...' and watch AI respond with empathy."
    },
    {
      icon: Brain,
      title: "AI Mental Reset Capsules",
      description: "3-5 minute personalized wellness sessions combining mood tracking with healing actions.",
      tags: ["LangChain", "Personalization", "Micro-sessions"],
      gradient: "from-wellness-mint to-wellness-ocean",
      demo: "Each capsule adapts to your emotional state, time of day, and wellness history."
    },
    {
      icon: Zap,
      title: "Micro-Habit Coaching",
      description: "Tiny daily wellness goals: gratitude prompts, breathwork, hydration reminders, and more.",
      tags: ["Behavioral Science", "Habit Tracking", "Gentle Nudges"],
      gradient: "from-wellness-lavender to-wellness-mint",
      demo: "Get personalized micro-habits like '3 deep breaths' or 'name one thing you're grateful for'."
    },
    {
      icon: BarChart,
      title: "Passive Biofeedback Analysis",
      description: "Mood inference through typing speed, word choice, and voice tone patterns.",
      tags: ["ML Analysis", "Privacy-First", "Biometric Insights"],
      gradient: "from-wellness-ocean to-wellness-lavender",
      demo: "AI detects stress from your typing rhythm and suggests immediate wellness interventions."
    },
    {
      icon: Globe,
      title: "Accessibility-First Design",
      description: "Voice support, large fonts, dark mode, English/Hindi interface, and screen reader optimization.",
      tags: ["WCAG 2.1 AA", "Multi-language", "Universal Design"],
      gradient: "from-wellness-sunset to-wellness-coral",
      demo: "Works seamlessly with voice commands, supports visual impairments, and cultural contexts."
    },
    {
      icon: MessageSquare,
      title: "WhatsApp & SMS Integration",
      description: "Reach users where they are with simple text-based wellness check-ins and reminders.",
      tags: ["Cross-platform", "Low-bandwidth", "Inclusive Access"],
      gradient: "from-wellness-mint to-wellness-forest",
      demo: "Get daily wellness prompts via WhatsApp: 'How's your energy today? Reply with 1-10'."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            
            <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2">
              {feature.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Demo Description */}
            <div className="p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
              <p className="text-sm italic text-muted-foreground">
                💡 {feature.demo}
              </p>
            </div>
            
            {/* Interactive Element */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Call-to-Action Card */}
      <Card className="md:col-span-2 lg:col-span-3 gradient-wellness text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-playfair">
            🚀 Ready to Experience WellNest?
          </CardTitle>
          <CardDescription className="text-white/90 text-lg">
            Join our beta program and help shape the future of accessible mental wellness technology.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-6 h-6" />
              <span>3-minute sessions</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6" />
              <span>500+ beta users</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Heart className="w-6 h-6" />
              <span>4.9/5 impact score</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-wellness-forest px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Start Free Beta
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              View Source Code
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureShowcase;
