import axios from 'axios';
import { JokeApiResponse } from '../types/joke';

/**
 * Get random joke from JokeAPI
 * API: https://jokeapi.dev/
 * Endpoint: https://v2.jokeapi.io/joke/Any
 * 
 * Trich xuat du lieu tu 2 loai joke:
 * - Single joke: tra ve field 'joke'
 * - Two-part joke: tra ve fields 'setup' va 'delivery'
 * 
 * @returns Object chua joke text hoac loi
 */
export const getRandomJoke = async (): Promise<{
  text: string;
  success: boolean;
}> => {
  try {
    // Goi JokeAPI - tro ve random joke
    const response = await axios.get<JokeApiResponse>(
      'https://v2.jokeapi.io/joke/Any',
      {
        timeout: 5000, // Timeout 5s
      }
    );

    const data = response.data;

    // Kiem tra neu co loi
    if (data.error) {
      return {
        text: 'Khong the lay tro cuoi. Vui long thu lai sau.',
        success: false,
      };
    }

    // Neu la single joke
    if (data.type === 'single' && data.joke) {
      return {
        text: data.joke,
        success: true,
      };
    }

    // Neu la two-part joke
    if (data.type === 'twopart' && data.setup && data.delivery) {
      return {
        text: `${data.setup}\n\n${data.delivery}`,
        success: true,
      };
    }

    return {
      text: 'Tro cuoi khong co san. Vui long thu lai sau.',
      success: false,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return {
          text: 'Khong ket noi duoc toi JokeAPI. Vui long kiem tra ket noi internet.',
          success: false,
        };
      }
      return {
        text: `Loi API: ${error.response.status}`,
        success: false,
      };
    }
    return {
      text: 'Co loi xay ra. Vui long thu lai sau.',
      success: false,
    };
  }
};
