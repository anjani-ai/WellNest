
import { useState } from 'react';
import { getPersonalizedHabitSuggestion, getAllMicroHabits, HabitSuggestion, MicroHabit } from '@/services/habitCoachingApi';
import { useToast } from '@/hooks/use-toast';

export const useHabitCoaching = () => {
  const [suggestion, setSuggestion] = useState<HabitSuggestion | null>(null);
  const [allHabits, setAllHabits] = useState<MicroHabit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getPersonalizedSuggestion = async (currentMood?: string, recentActivities?: string[]) => {
    try {
      setIsLoading(true);
      setError(null);
      const habitSuggestion = await getPersonalizedHabitSuggestion(currentMood, recentActivities);
      setSuggestion(habitSuggestion);
      console.log('Habit suggestion generated:', habitSuggestion);
    } catch (err) {
      setError('Failed to get habit suggestion');
      console.error('Error in useHabitCoaching:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllHabits = async () => {
    try {
      setIsLoading(true);
      const habits = await getAllMicroHabits();
      setAllHabits(habits);
      console.log('All micro habits loaded:', habits);
    } catch (err) {
      setError('Failed to load habits');
      console.error('Error loading habits:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const markHabitCompleted = (habitId: string) => {
    const completedHabits = JSON.parse(localStorage.getItem('wellnest_completed_habits') || '[]');
    const today = new Date().toISOString().split('T')[0];
    const entry = { habitId, date: today, timestamp: new Date().toISOString() };
    
    completedHabits.push(entry);
    localStorage.setItem('wellnest_completed_habits', JSON.stringify(completedHabits));
    
    toast({
      title: "Micro-habit completed! 🌟",
      description: "Great job building your wellness routine step by step.",
    });
    
    console.log('Habit marked as completed:', entry);
  };

  return {
    suggestion,
    allHabits,
    isLoading,
    error,
    getPersonalizedSuggestion,
    loadAllHabits,
    markHabitCompleted
  };
};
