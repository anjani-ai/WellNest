
export type SupportedLanguage = 'en' | 'hi';

export interface TranslatedContent {
  welcome: string;
  checkin: string;
  breathing: string;
  affirmation: string;
  completion: string;
  buttons: {
    start: string;
    pause: string;
    reset: string;
    share: string;
  };
  breathing_instructions: {
    inhale: string;
    hold: string;
    exhale: string;
  };
}

const translations: Record<SupportedLanguage, TranslatedContent> = {
  en: {
    welcome: "Welcome to your personal mental wellness space.",
    checkin: "How are you feeling right now? Take a moment to check in with yourself.",
    breathing: "Let's reset your nervous system together. Follow the breathing pattern.",
    affirmation: "You've shown up for yourself today. Here's a reminder of your inner strength.",
    completion: "You did it! Your mental reset is complete.",
    buttons: {
      start: "Start Reset",
      pause: "Pause Reset", 
      reset: "Reset",
      share: "Share Your Feelings"
    },
    breathing_instructions: {
      inhale: "Breathe in slowly through your nose",
      hold: "Hold your breath gently",
      exhale: "Exhale slowly through your mouth"
    }
  },
  hi: {
    welcome: "आपके व्यक्तिगत मानसिक कल्याण स्थान में आपका स्वागत है।",
    checkin: "आप अभी कैसा महसूस कर रहे हैं? अपने साथ जांच करने के लिए एक क्षण लें।",
    breathing: "आइए एक साथ अपने तंत्रिका तंत्र को रीसेट करें। सांस लेने के पैटर्न का पालन करें।",
    affirmation: "आपने आज अपने लिए समय निकाला है। यह आपकी आंतरिक शक्ति की याद दिलाता है।",
    completion: "आपने कर दिया! आपका मानसिक रीसेट पूरा हो गया।",
    buttons: {
      start: "रीसेट शुरू करें",
      pause: "रीसेट रोकें",
      reset: "दोबारा शुरू करें", 
      share: "अपनी भावनाएं साझा करें"
    },
    breathing_instructions: {
      inhale: "अपनी नाक से धीरे-धीरे सांस लें",
      hold: "अपनी सांस को धीरे से रोकें",
      exhale: "अपने मुंह से धीरे-धीरे सांस छोड़ें"
    }
  }
};

export const getTranslation = (language: SupportedLanguage): TranslatedContent => {
  return translations[language] || translations.en;
};

export const getCurrentLanguage = (): SupportedLanguage => {
  return (localStorage.getItem('wellnest_language') as SupportedLanguage) || 'en';
};

export const setLanguage = (language: SupportedLanguage): void => {
  localStorage.setItem('wellnest_language', language);
};

export const getSupportedLanguages = (): Array<{code: SupportedLanguage, name: string, nativeName: string}> => {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
  ];
};
