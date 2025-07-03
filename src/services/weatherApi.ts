
// OpenWeatherMap API for weather-based mood suggestions
export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export interface MoodSuggestion {
  weather: string;
  suggestion: string;
  activities: string[];
}

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Using a free weather API (OpenWeatherMap requires API key in production)
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    const data = await response.json();
    
    // Transform the data to match our interface
    return {
      main: {
        temp: data.current_weather.temperature,
        feels_like: data.current_weather.temperature,
        humidity: 50 // Default value from free API
      },
      weather: [{
        main: data.current_weather.weathercode < 3 ? 'Clear' : 'Cloudy',
        description: data.current_weather.weathercode < 3 ? 'clear sky' : 'cloudy',
        icon: data.current_weather.weathercode < 3 ? '01d' : '02d'
      }],
      name: 'Your Location'
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const getWeatherBasedSuggestion = (weather: WeatherData): MoodSuggestion => {
  const temp = weather.main.temp;
  const condition = weather.weather[0].main.toLowerCase();
  
  if (condition.includes('rain')) {
    return {
      weather: 'Rainy',
      suggestion: 'Rainy days are perfect for introspection and cozy self-care.',
      activities: ['Indoor meditation', 'Journaling', 'Warm tea breathing exercise']
    };
  } else if (condition.includes('cloud')) {
    return {
      weather: 'Cloudy',
      suggestion: 'Cloudy skies remind us that all feelings are temporary.',
      activities: ['Gentle stretching', 'Gratitude practice', 'Creative expression']
    };
  } else if (temp > 25) {
    return {
      weather: 'Sunny & Warm',
      suggestion: 'Beautiful weather calls for energizing activities!',
      activities: ['Outdoor breathing', 'Nature visualization', 'Vitamin D meditation']
    };
  } else {
    return {
      weather: 'Cool & Clear',
      suggestion: 'Cool air helps clear the mind and refresh the spirit.',
      activities: ['Deep breathing', 'Mindful walking', 'Fresh air meditation']
    };
  }
};
