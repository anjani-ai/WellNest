
import { useState } from 'react';
import { analyzeTriggers, getTriggerResponse, TriggerAnalysis, TriggerResponse } from '@/services/triggerDetectionApi';
import { useToast } from '@/hooks/use-toast';

export const useTriggerDetection = () => {
  const [analysis, setAnalysis] = useState<TriggerAnalysis | null>(null);
  const [response, setResponse] = useState<TriggerResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeInput = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const triggerAnalysis = await analyzeTriggers(text);
      const triggerResponse = getTriggerResponse(triggerAnalysis);
      
      setAnalysis(triggerAnalysis);
      setResponse(triggerResponse);
      
      console.log('Trigger analysis:', triggerAnalysis);
      console.log('Trigger response:', triggerResponse);
      
      // Show toast for high-severity triggers
      if (triggerResponse.urgency === 'high') {
        toast({
          title: "Important: High-Priority Support Needed",
          description: "I've detected you may need immediate support. Please consider reaching out to someone.",
          variant: "destructive",
        });
      } else if (triggerResponse.urgency === 'medium') {
        toast({
          title: "Personalized Support Available",
          description: "I've identified some areas where I can offer targeted help.",
        });
      }
      
    } catch (err) {
      setError('Failed to analyze your input');
      console.error('Error in trigger analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setResponse(null);
    setError(null);
  };

  return {
    analysis,
    response,
    isAnalyzing,
    error,
    analyzeInput,
    clearAnalysis
  };
};
