
// Quotable API for inspirational quotes
export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  length: number;
}

export const fetchInspirationalQuote = async (): Promise<Quote> => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=inspirational,motivational,wellness&minLength=50&maxLength=150');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Fallback quote
    return {
      _id: 'fallback',
      content: "You are stronger than you think and more resilient than you know. Every breath you take is a step toward healing.",
      author: "WellNest",
      tags: ['wellness'],
      length: 95
    };
  }
};
