
import { useState, useEffect } from 'react';
import { fetchWeatherData, getWeatherBasedSuggestion, WeatherData, MoodSuggestion } from '@/services/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [suggestion, setSuggestion] = useState<MoodSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeatherData(latitude, longitude);
          const weatherSuggestion = getWeatherBasedSuggestion(weatherData);
          
          setWeather(weatherData);
          setSuggestion(weatherSuggestion);
          console.log('Weather data fetched:', weatherData);
          console.log('Weather suggestion:', weatherSuggestion);
        } catch (err) {
          setError('Failed to fetch weather data');
          console.error('Weather fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError('Location access denied');
        setIsLoading(false);
        console.error('Geolocation error:', err);
      }
    );
  };

  return { weather, suggestion, isLoading, error, fetchWeather };
};
