
import { useState } from 'react';
import { saveMoodEntry, fetchMoodStats, fetchRecentMoodEntries, MoodEntry, MoodStats } from '@/services/moodApi';
import { useToast } from '@/hooks/use-toast';

export const useMoodTracking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<MoodStats | null>(null);
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  const saveMood = async (mood: string, activities: string[], notes?: string) => {
    try {
      setIsLoading(true);
      const entry = await saveMoodEntry(mood, activities, notes);
      console.log('Mood saved successfully:', entry);
      
      toast({
        title: "Mood Saved! 📝",
        description: `Your ${mood} mood and activities have been recorded.`,
      });
      
      // Refresh stats after saving
      await loadStats();
      return entry;
    } catch (error) {
      console.error('Error saving mood:', error);
      toast({
        title: "Error",
        description: "Failed to save your mood entry. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const [statsData, entriesData] = await Promise.all([
        fetchMoodStats(),
        fetchRecentMoodEntries()
      ]);
      
      setStats(statsData);
      setRecentEntries(entriesData);
      console.log('Mood stats loaded:', statsData);
      console.log('Recent entries loaded:', entriesData);
    } catch (error) {
      console.error('Error loading mood data:', error);
    }
  };

  return {
    saveMood,
    loadStats,
    stats,
    recentEntries,
    isLoading
  };
};
