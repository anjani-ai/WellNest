
// Simulated mood tracking API (would connect to backend in production)
export interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  timestamp: Date;
  activities: string[];
  notes?: string;
}

export interface MoodStats {
  averageMood: number;
  streak: number;
  totalSessions: number;
  topActivities: string[];
}

// Simulate API calls with localStorage for demo purposes
export const saveMoodEntry = async (mood: string, activities: string[], notes?: string): Promise<MoodEntry> => {
  try {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity: Math.floor(Math.random() * 5) + 1,
      timestamp: new Date(),
      activities,
      notes
    };
    
    const existingEntries = JSON.parse(localStorage.getItem('wellnest_mood_entries') || '[]');
    existingEntries.push(entry);
    localStorage.setItem('wellnest_mood_entries', JSON.stringify(existingEntries));
    
    console.log('Mood entry saved:', entry);
    return entry;
  } catch (error) {
    console.error('Error saving mood entry:', error);
    throw error;
  }
};

export const fetchMoodStats = async (): Promise<MoodStats> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const entries = JSON.parse(localStorage.getItem('wellnest_mood_entries') || '[]');
    
    return {
      averageMood: entries.length > 0 ? 4.2 : 0,
      streak: Math.max(entries.length, 0),
      totalSessions: entries.length,
      topActivities: ['Breathing exercises', 'Gratitude practice', 'Mindful meditation']
    };
  } catch (error) {
    console.error('Error fetching mood stats:', error);
    throw error;
  }
};

export const fetchRecentMoodEntries = async (): Promise<MoodEntry[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    const entries = JSON.parse(localStorage.getItem('wellnest_mood_entries') || '[]');
    return entries.slice(-7); // Return last 7 entries
  } catch (error) {
    console.error('Error fetching mood entries:', error);
    throw error;
  }
};
