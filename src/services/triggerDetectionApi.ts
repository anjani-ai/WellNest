
export interface TriggerWord {
  word: string;
  category: 'stress' | 'anxiety' | 'depression' | 'anger' | 'fatigue' | 'overwhelm' | 'positive';
  severity: 'low' | 'medium' | 'high';
}

export interface TriggerAnalysis {
  detectedTriggers: TriggerWord[];
  primaryCategory: string;
  severityLevel: 'low' | 'medium' | 'high';
  confidence: number;
}

export interface TriggerResponse {
  category: string;
  severity: string;
  message: string;
  suggestions: string[];
  urgency: 'low' | 'medium' | 'high';
}

const triggerWords: TriggerWord[] = [
  // Stress triggers
  { word: 'stressed', category: 'stress', severity: 'medium' },
  { word: 'overwhelmed', category: 'overwhelm', severity: 'high' },
  { word: 'pressure', category: 'stress', severity: 'medium' },
  { word: 'deadline', category: 'stress', severity: 'medium' },
  { word: 'burnout', category: 'stress', severity: 'high' },
  
  // Anxiety triggers
  { word: 'anxious', category: 'anxiety', severity: 'medium' },
  { word: 'worried', category: 'anxiety', severity: 'low' },
  { word: 'panic', category: 'anxiety', severity: 'high' },
  { word: 'nervous', category: 'anxiety', severity: 'low' },
  { word: 'fear', category: 'anxiety', severity: 'medium' },
  
  // Depression triggers
  { word: 'sad', category: 'depression', severity: 'medium' },
  { word: 'hopeless', category: 'depression', severity: 'high' },
  { word: 'empty', category: 'depression', severity: 'medium' },
  { word: 'worthless', category: 'depression', severity: 'high' },
  { word: 'lonely', category: 'depression', severity: 'medium' },
  
  // Anger triggers
  { word: 'angry', category: 'anger', severity: 'medium' },
  { word: 'frustrated', category: 'anger', severity: 'medium' },
  { word: 'furious', category: 'anger', severity: 'high' },
  { word: 'irritated', category: 'anger', severity: 'low' },
  
  // Fatigue triggers
  { word: 'tired', category: 'fatigue', severity: 'medium' },
  { word: 'exhausted', category: 'fatigue', severity: 'high' },
  { word: 'drained', category: 'fatigue', severity: 'high' },
  { word: 'sleepy', category: 'fatigue', severity: 'low' },
  
  // Positive triggers
  { word: 'happy', category: 'positive', severity: 'low' },
  { word: 'grateful', category: 'positive', severity: 'low' },
  { word: 'excited', category: 'positive', severity: 'low' },
  { word: 'calm', category: 'positive', severity: 'low' },
];

export const analyzeTriggers = async (text: string): Promise<TriggerAnalysis> => {
  try {
    const lowerText = text.toLowerCase();
    const detectedTriggers: TriggerWord[] = [];
    
    triggerWords.forEach(trigger => {
      if (lowerText.includes(trigger.word)) {
        detectedTriggers.push(trigger);
      }
    });
    
    if (detectedTriggers.length === 0) {
      return {
        detectedTriggers: [],
        primaryCategory: 'neutral',
        severityLevel: 'low',
        confidence: 0
      };
    }
    
    // Determine primary category and severity
    const categoryCount = detectedTriggers.reduce((acc, trigger) => {
      acc[trigger.category] = (acc[trigger.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const primaryCategory = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    const maxSeverity = detectedTriggers.reduce((max, trigger) => {
      const severityOrder = { low: 1, medium: 2, high: 3 };
      return severityOrder[trigger.severity] > severityOrder[max] ? trigger.severity : max;
    }, 'low' as 'low' | 'medium' | 'high');
    
    const confidence = Math.min(detectedTriggers.length / 3, 1);
    
    return {
      detectedTriggers,
      primaryCategory,
      severityLevel: maxSeverity,
      confidence
    };
  } catch (error) {
    console.error('Error analyzing triggers:', error);
    throw error;
  }
};

export const getTriggerResponse = (analysis: TriggerAnalysis): TriggerResponse => {
  const responses = {
    stress: {
      low: {
        message: "I notice you're feeling some stress. This is completely normal and manageable.",
        suggestions: ["Try the 4-7-8 breathing technique", "Take a 5-minute walk", "Practice progressive muscle relaxation"]
      },
      medium: {
        message: "You're experiencing significant stress right now. Let's work on some immediate relief techniques.",
        suggestions: ["Start with deep breathing exercises", "Try grounding techniques (5-4-3-2-1)", "Take a short break from your current task"]
      },
      high: {
        message: "You're under high stress. It's important to address this immediately for your wellbeing.",
        suggestions: ["Prioritize immediate stress relief", "Consider talking to someone you trust", "Practice emergency calm-down techniques"]
      }
    },
    anxiety: {
      low: {
        message: "I can sense some anxiety in what you're sharing. These feelings are valid and treatable.",
        suggestions: ["Practice mindful breathing", "Use grounding techniques", "Challenge anxious thoughts gently"]
      },
      medium: {
        message: "Your anxiety seems to be affecting you significantly. Let's focus on bringing you back to the present.",
        suggestions: ["Try the 5-4-3-2-1 grounding technique", "Practice box breathing", "Use positive self-talk"]
      },
      high: {
        message: "You're experiencing high anxiety. Remember that you're safe right now, and this feeling will pass.",
        suggestions: ["Focus on your breath immediately", "Use emergency grounding techniques", "Consider reaching out for support"]
      }
    },
    depression: {
      low: {
        message: "I hear that you're feeling down. These emotions are valid, and you deserve support.",
        suggestions: ["Practice self-compassion", "Engage in a small, enjoyable activity", "Connect with someone who cares about you"]
      },
      medium: {
        message: "You're going through a difficult time emotionally. Please know that you're not alone in this.",
        suggestions: ["Focus on basic self-care", "Reach out to a trusted friend or family member", "Consider professional support"]
      },
      high: {
        message: "You're experiencing intense emotional pain. Your life has value, and help is available.",
        suggestions: ["Reach out to someone immediately", "Contact a mental health professional", "Call a crisis helpline if needed"]
      }
    },
    anger: {
      low: {
        message: "I can sense some frustration in your words. These feelings are understandable.",
        suggestions: ["Take slow, deep breaths", "Count to ten before responding", "Try gentle physical movement"]
      },
      medium: {
        message: "You're feeling quite angry right now. Let's work on releasing this energy safely.",
        suggestions: ["Step away from the situation temporarily", "Try physical exercise or movement", "Practice anger management breathing"]
      },
      high: {
        message: "Your anger is very intense right now. Let's focus on safe ways to process these feelings.",
        suggestions: ["Remove yourself from triggers immediately", "Use intense physical exercise safely", "Consider talking to someone you trust"]
      }
    },
    fatigue: {
      low: {
        message: "You're feeling a bit tired. This is your body's way of asking for care.",
        suggestions: ["Take a short power nap if possible", "Do some gentle stretching", "Stay hydrated"]
      },
      medium: {
        message: "You're experiencing significant fatigue. Your body and mind need rest and restoration.",
        suggestions: ["Prioritize rest and sleep", "Reduce non-essential activities", "Practice gentle self-care"]
      },
      high: {
        message: "You're completely exhausted. This level of fatigue requires immediate attention to your wellbeing.",
        suggestions: ["Rest immediately if possible", "Delegate or postpone non-urgent tasks", "Consider if this fatigue has deeper causes"]
      }
    },
    overwhelm: {
      low: {
        message: "Things feel a bit much right now. Let's break this down into manageable pieces.",
        suggestions: ["List your priorities", "Focus on one task at a time", "Take regular breaks"]
      },
      medium: {
        message: "You're feeling quite overwhelmed. Let's simplify and focus on what's most important.",
        suggestions: ["Write down everything on your mind", "Identify what's urgent vs. important", "Ask for help where possible"]
      },
      high: {
        message: "You're completely overwhelmed right now. Let's focus on immediate relief and support.",
        suggestions: ["Stop and breathe deeply", "Reach out for immediate support", "Postpone non-critical decisions"]
      }
    },
    positive: {
      low: {
        message: "I'm glad to hear some positive emotions in your words! Let's build on this feeling.",
        suggestions: ["Savor this positive moment", "Share your good feelings with someone", "Practice gratitude for what's going well"]
      },
      medium: {
        message: "You're feeling good right now! This is wonderful and worth celebrating.",
        suggestions: ["Take time to fully experience this positivity", "Write down what's contributing to these good feelings", "Plan how to maintain this positive state"]
      },
      high: {
        message: "You're experiencing wonderful positive emotions! This is beautiful to see.",
        suggestions: ["Fully embrace and enjoy this moment", "Consider what led to these positive feelings", "Share your joy with others who matter to you"]
      }
    }
  };
  
  const categoryResponses = responses[analysis.primaryCategory as keyof typeof responses] || responses.stress;
  const severityResponse = categoryResponses[analysis.severityLevel];
  
  return {
    category: analysis.primaryCategory,
    severity: analysis.severityLevel,
    message: severityResponse.message,
    suggestions: severityResponse.suggestions,
    urgency: analysis.severityLevel
  };
};
