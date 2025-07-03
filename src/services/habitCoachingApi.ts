
export interface MicroHabit {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'mindfulness' | 'movement' | 'gratitude' | 'breathing';
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string[];
}

export interface HabitSuggestion {
  habit: MicroHabit;
  reason: string;
  personalizedTip: string;
}

const microHabits: MicroHabit[] = [
  {
    id: 'gratitude-3',
    title: '3 Gratitudes',
    description: 'Name three things you\'re grateful for right now',
    duration: '1 minute',
    category: 'gratitude',
    difficulty: 'easy',
    instructions: [
      'Take a deep breath',
      'Think of 3 specific things you appreciate today',
      'Say them out loud or write them down',
      'Notice how this makes you feel'
    ]
  },
  {
    id: 'body-scan',
    title: 'Quick Body Scan',
    description: 'Check in with your physical sensations',
    duration: '2 minutes',
    category: 'mindfulness',
    difficulty: 'easy',
    instructions: [
      'Sit comfortably and close your eyes',
      'Start from the top of your head',
      'Notice any tension or sensations',
      'Breathe into areas that feel tight',
      'Move down to your toes'
    ]
  },
  {
    id: 'desk-stretch',
    title: 'Desk Stretch Sequence',
    description: 'Gentle stretches for computer workers',
    duration: '3 minutes',
    category: 'movement',
    difficulty: 'easy',
    instructions: [
      'Roll your shoulders back 5 times',
      'Gently turn your head left and right',
      'Stretch your arms above your head',
      'Twist your torso gently to each side',
      'Take 3 deep breaths'
    ]
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: 'Structured breathing for instant calm',
    duration: '2 minutes',
    category: 'breathing',
    difficulty: 'medium',
    instructions: [
      'Inhale for 4 counts',
      'Hold for 4 counts',
      'Exhale for 4 counts',
      'Hold empty for 4 counts',
      'Repeat 4-6 times'
    ]
  }
];

export const getPersonalizedHabitSuggestion = async (currentMood?: string, recentActivities?: string[]): Promise<HabitSuggestion> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    let suggestedHabit: MicroHabit;
    let reason: string;
    let personalizedTip: string;

    if (currentMood === 'stressed' || currentMood === 'overwhelmed') {
      suggestedHabit = microHabits.find(h => h.category === 'breathing') || microHabits[0];
      reason = 'Breathing exercises are scientifically proven to activate your parasympathetic nervous system and reduce stress hormones.';
      personalizedTip = 'Since you\'re feeling stressed, focus on making your exhales longer than your inhales to maximize the calming effect.';
    } else if (currentMood === 'sad' || currentMood === 'down') {
      suggestedHabit = microHabits.find(h => h.category === 'gratitude') || microHabits[0];
      reason = 'Gratitude practices have been shown to increase serotonin and improve mood within minutes.';
      personalizedTip = 'When feeling down, try to find gratitude in small, specific details rather than big, general things.';
    } else if (currentMood === 'tired' || currentMood === 'exhausted') {
      suggestedHabit = microHabits.find(h => h.category === 'movement') || microHabits[0];
      reason = 'Gentle movement increases blood flow and can provide natural energy without caffeine.';
      personalizedTip = 'Since you\'re tired, focus on gentle, mindful movements rather than vigorous exercise.';
    } else {
      suggestedHabit = microHabits.find(h => h.category === 'mindfulness') || microHabits[0];
      reason = 'Mindfulness practices help maintain emotional balance and present-moment awareness.';
      personalizedTip = 'This is a great opportunity to build your mindfulness foundation when you\'re feeling stable.';
    }

    return {
      habit: suggestedHabit,
      reason,
      personalizedTip
    };
  } catch (error) {
    console.error('Error getting habit suggestion:', error);
    throw error;
  }
};

export const getAllMicroHabits = async (): Promise<MicroHabit[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    return microHabits;
  } catch (error) {
    console.error('Error fetching micro habits:', error);
    throw error;
  }
};
