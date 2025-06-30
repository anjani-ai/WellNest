
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Mic, MessageSquare, BarChart, Globe, Zap, Clock, Users, FileText } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: Heart,
      title: "Emotion-Aware Journaling",
      description: "Express yourself through voice notes, text, or emoji. AI analyzes your emotional patterns and provides empathetic responses.",
      tags: ["Voice Input", "Text Analysis", "Emoji Recognition"],
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
      demo: "Say 'I'm feeling overwhelmed' and get instant, personalized emotional support."
    },
    {
      icon: Brain,
      title: "AI Mental Reset Capsules",
      description: "3-5 minute personalized wellness sessions using GPT-4 that adapt to your mood, time of day, and emotional history.",
      tags: ["GPT-4 Powered", "Personalization", "Micro-sessions"],
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
      demo: "Each session combines breathwork, affirmations, and micro-habits tailored to you."
    },
    {
      icon: Zap,
      title: "Micro-Habit Coaching",
      description: "Gentle daily wellness nudges: gratitude prompts, hydration reminders, breathing exercises, and mindful moments.",
      tags: ["Behavioral Science", "Habit Formation", "Gentle Nudges"],
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      demo: "Get bite-sized habits like '3 deep breaths' or 'name one thing you're grateful for'."
    },
    {
      icon: BarChart,
      title: "Passive Mood Tracking",
      description: "AI infers your emotional state through typing patterns, word choice, and voice tone without intrusive monitoring.",
      tags: ["Privacy-First", "Biometric Analysis", "Pattern Recognition"],
      bgColor: "bg-wellness-teal/10",
      iconColor: "text-wellness-teal",
      demo: "Your typing rhythm reveals stress - get immediate wellness suggestions."
    },
    {
      icon: Globe,
      title: "Inclusive Accessibility",
      description: "Voice support, large fonts, dark mode, English/Hindi interface, and screen reader optimization for universal access.",
      tags: ["WCAG 2.1 AA", "Multi-language", "Universal Design"],
      bgColor: "bg-muted",
      iconColor: "text-muted-foreground",
      demo: "Works seamlessly with assistive technologies and cultural contexts."
    },
    {
      icon: FileText,
      title: "Monthly Wellness Snapshots",
      description: "Comprehensive wellness reports showing your emotional journey, habit progress, and personalized insights to share or keep private.",
      tags: ["Progress Tracking", "Data Export", "Privacy Control"],
      bgColor: "bg-accent/5",
      iconColor: "text-accent",
      demo: "Export beautiful wellness reports to track your mental health journey over time."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
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
            <div className="p-3 rounded-lg bg-muted/50 border-l-4 border-secondary">
              <p className="text-sm italic text-muted-foreground">
                💡 {feature.demo}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* WhatsApp/SMS Integration Card */}
      <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-secondary/20 to-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-playfair">
            📱 WhatsApp & SMS Integration
          </CardTitle>
          <CardDescription className="text-lg">
            Reach users where they are with simple text-based wellness check-ins and reminders.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <MessageSquare className="w-6 h-6 text-secondary" />
              <span>WhatsApp wellness prompts</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-6 h-6 text-accent" />
              <span>Daily check-in reminders</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Globe className="w-6 h-6 text-primary" />
              <span>Low-bandwidth support</span>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-lg border max-w-md mx-auto">
            <div className="text-left space-y-2">
              <div className="text-sm text-muted-foreground">WellNest Bot</div>
              <div className="bg-secondary/20 p-2 rounded text-sm">
                Good morning! How's your energy today? Reply with 1-10 or use an emoji 😊😔😰
              </div>
              <div className="bg-primary/20 p-2 rounded text-sm ml-8">
                😔 4
              </div>
              <div className="bg-secondary/20 p-2 rounded text-sm">
                I sense you're having a tough morning. Let's try a 2-minute breathing exercise. Ready? 🌱
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureShowcase;
