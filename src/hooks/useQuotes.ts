
import { useState, useEffect } from 'react';
import { fetchInspirationalQuote, Quote } from '@/services/quotesApi';

export const useQuotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const newQuote = await fetchInspirationalQuote();
      setQuote(newQuote);
      console.log('Quote fetched successfully:', newQuote);
    } catch (err) {
      setError('Failed to load inspirational quote');
      console.error('Error in useQuotes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return { quote, isLoading, error, refetchQuote: fetchQuote };
};
