
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Zap, Globe, Shield, Code, Server, Smartphone } from "lucide-react";

const TechArchitecture = () => {
  const techStack = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      gradient: "from-wellness-mint to-wellness-ocean",
      technologies: [
        { name: "GPT-4 / Gemini", purpose: "Natural language processing & personalized responses" },
        { name: "LangChain", purpose: "AI agent orchestration & workflow management" },
        { name: "Pinecone Vector DB", purpose: "Semantic search & memory for personalization" },
        { name: "Hugging Face Transformers", purpose: "Sentiment analysis & emotion detection" },
        { name: "OpenAI Embeddings", purpose: "Context understanding & user profiling" }
      ]
    },
    {
      category: "Frontend & UX",
      icon: Globe,
      gradient: "from-wellness-lavender to-wellness-sunset",
      technologies: [
        { name: "React 18 + TypeScript", purpose: "Modern, type-safe user interface" },
        { name: "Tailwind CSS", purpose: "Accessible, responsive design system" },
        { name: "Framer Motion", purpose: "Smooth animations & micro-interactions" },
        { name: "ShadCN UI", purpose: "Accessible component library" },
        { name: "Web Speech API", purpose: "Voice input & text-to-speech" }
      ]
    },
    {
      category: "Backend & Infrastructure",
      icon: Server,
      gradient: "from-wellness-ocean to-wellness-forest",
      technologies: [
        { name: "Supabase", purpose: "Database, auth, real-time subscriptions" },
        { name: "Edge Functions", purpose: "Serverless API endpoints" },
        { name: "PostgreSQL", purpose: "User data & wellness metrics storage" },
        { name: "Redis", purpose: "Session management & caching" },
        { name: "WebSocket", purpose: "Real-time mood tracking" }
      ]
    },
    {
      category: "Accessibility & Mobile",
      icon: Smartphone,
      gradient: "from-wellness-coral to-wellness-mint",
      technologies: [
        { name: "WCAG 2.1 AA", purpose: "Web accessibility standards compliance" },
        { name: "Progressive Web App", purpose: "Native-like mobile experience" },
        { name: "i18n (React-i18next)", purpose: "Multi-language support (EN/HI)" },
        { name: "WhatsApp Business API", purpose: "SMS/WhatsApp integration" },
        { name: "Screen Reader Support", purpose: "Assistive technology compatibility" }
      ]
    }
  ];

  const architecture = {
    layers: [
      {
        name: "Presentation Layer",
        description: "Accessible React UI with voice, touch, and keyboard navigation",
        color: "bg-wellness-mint/20"
      },
      {
        name: "AI Agent Layer",
        description: "LangChain orchestrated agents for personalized wellness interventions",
        color: "bg-wellness-ocean/20"
      },
      {
        name: "Data Processing Layer",
        description: "Real-time emotion analysis, habit tracking, and biofeedback processing",
        color: "bg-wellness-lavender/20"
      },
      {
        name: "Storage Layer",
        description: "Secure user data, wellness metrics, and personalization vectors",
        color: "bg-wellness-forest/20"
      }
    ]
  };

  const deploymentOptions = [
    {
      title: "School Districts",
      description: "White-label deployment with FERPA compliance",
      features: ["Student privacy protection", "Parental consent management", "Educational wellness metrics"]
    },
    {
      title: "Corporate Wellness",
      description: "Employee mental health support integration",
      features: ["Anonymous usage analytics", "Stress reduction metrics", "Team wellness dashboards"]
    },
    {
      title: "NGO & Community Health",
      description: "Low-bandwidth, multilingual community deployment",
      features: ["SMS-based interactions", "Offline mode support", "Cultural adaptation frameworks"]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Technology Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {techStack.map((stack, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stack.gradient} flex items-center justify-center`}>
                  <stack.icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl">{stack.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stack.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex flex-col space-y-1 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{tech.name}</span>
                      <Badge variant="outline" className="text-xs">Core</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tech.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">System Architecture</CardTitle>
          <CardDescription>
            Layered architecture designed for scalability, accessibility, and real-time AI processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {architecture.layers.map((layer, index) => (
              <div key={index} className={`p-4 rounded-lg ${layer.color} border-l-4 border-primary`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{layer.name}</h4>
                  <Badge variant="outline">Layer {index + 1}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{layer.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-wellness-mint/10 to-wellness-ocean/10">
            <h4 className="font-semibold mb-2">🔄 Data Flow</h4>
            <p className="text-sm text-muted-foreground">
              User Input → Emotion Detection → AI Processing → Personalized Response → Feedback Loop → 
              Long-term Learning → Improved Personalization
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Deployment & Scalability */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-playfair font-semibold mb-2">Deployment & Scalability</h3>
          <p className="text-muted-foreground">Designed for diverse environments and user needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deploymentOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Metrics */}
      <Card className="gradient-wellness text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">Technical Performance</CardTitle>
          <CardDescription className="text-white/90">
            Built for production-scale wellness delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">&lt;200ms</div>
              <div className="text-sm text-white/80">AI Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-white/80">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-sm text-white/80">Concurrent Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">WCAG AA</div>
              <div className="text-sm text-white/80">Accessibility</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Open Source & Documentation */}
      <Card className="border-2 border-dashed border-primary">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Code className="w-6 h-6 text-primary" />
            <CardTitle>Open Source & Documentation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">📂 Repository Structure</h4>
              <div className="font-mono text-sm space-y-1 text-muted-foreground">
                <div>├── /src/components (UI Components)</div>
                <div>├── /src/agents (AI Agent Logic)</div>
                <div>├── /src/utils (Wellness Algorithms)</div>
                <div>├── /supabase (Database Schema)</div>
                <div>├── /docs (API Documentation)</div>
                <div>└── /deployment (Docker & K8s)</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">🚀 Quick Start</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 rounded bg-muted font-mono">npm install wellnest-ai</div>
                <div className="p-2 rounded bg-muted font-mono">npm run dev</div>
                <div className="p-2 rounded bg-muted font-mono">wellnest setup --ai-key=YOUR_KEY</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechArchitecture;
