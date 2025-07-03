
export interface MoodTrend {
  date: string;
  mood: string;
  score: number;
}

export interface WellnessInsight {
  type: 'warning' | 'positive' | 'neutral';
  message: string;
  suggestion: string;
}

export interface WellnessSnapshot {
  period: string;
  averageMood: number;
  totalSessions: number;
  streakDays: number;
  topActivities: string[];
  moodTrends: MoodTrend[];
  insights: WellnessInsight[];
  generatedAt: string;
}

export const generateWellnessSnapshot = async (): Promise<WellnessSnapshot> => {
  try {
    const entries = JSON.parse(localStorage.getItem('wellnest_mood_entries') || '[]');
    const last30Days = entries.filter((entry: any) => {
      const entryDate = new Date(entry.timestamp);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return entryDate >= thirtyDaysAgo;
    });

    const moodTrends: MoodTrend[] = last30Days.map((entry: any) => ({
      date: new Date(entry.timestamp).toISOString().split('T')[0],
      mood: entry.mood,
      score: entry.intensity || 3
    }));

    const insights: WellnessInsight[] = [];
    
    if (last30Days.length > 0) {
      const avgMood = last30Days.reduce((sum: number, entry: any) => sum + (entry.intensity || 3), 0) / last30Days.length;
      
      if (avgMood < 2.5) {
        insights.push({
          type: 'warning',
          message: 'Your mood has been trending lower recently.',
          suggestion: 'Consider scheduling more frequent mental reset sessions or speaking with a counselor.'
        });
      } else if (avgMood > 4) {
        insights.push({
          type: 'positive',
          message: 'Your mental wellness is trending positively!',
          suggestion: 'Keep up your current wellness practices - they\'re working well for you.'
        });
      }
    }

    const allActivities = last30Days.flatMap((entry: any) => entry.activities || []);
    const activityCounts = allActivities.reduce((acc: any, activity: string) => {
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {});
    
    const topActivities = Object.entries(activityCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([activity]) => activity);

    return {
      period: 'Last 30 Days',
      averageMood: parseFloat((last30Days.reduce((sum: number, entry: any) => sum + (entry.intensity || 3), 0) / Math.max(last30Days.length, 1)).toFixed(1)),
      totalSessions: last30Days.length,
      streakDays: calculateStreak(entries),
      topActivities,
      moodTrends,
      insights,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating wellness snapshot:', error);
    throw error;
  }
};

const calculateStreak = (entries: any[]): number => {
  if (entries.length === 0) return 0;
  
  const sortedEntries = entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  let streak = 0;
  let currentDate = new Date();
  
  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.timestamp);
    const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= streak + 1) {
      streak++;
      currentDate = entryDate;
    } else {
      break;
    }
  }
  
  return streak;
};

export const exportWellnessData = async (): Promise<string> => {
  try {
    const snapshot = await generateWellnessSnapshot();
    const exportData = {
      ...snapshot,
      exportFormat: 'WellNest Wellness Snapshot',
      instructions: 'This data can be shared with healthcare providers or used for personal reflection.'
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting wellness data:', error);
    throw error;
  }
};
