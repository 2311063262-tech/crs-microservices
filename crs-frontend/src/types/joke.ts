// Interface cho Joke API response
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

// Interface cho JokeAPI response (alternative format)
export interface JokeApiResponse {
  error: boolean;
  category: string;
  type: string;
  joke?: string;  // Cho single joke
  setup?: string; // Cho two-part joke
  delivery?: string; // Cho two-part joke
}
