import { GoogleGenerativeAI } from '@google/generative-ai';

if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: Gemini AI client must NEVER be called from client code!');
}

const apiKey = process.env.GEMINI_API_KEY || '';

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
export const GEMINI_EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'text-embedding-004';

export async function generateText(prompt: string, systemInstruction?: string): Promise<string> {
  if (!genAI) {
    return 'Gemini API key is not configured. Please add GEMINI_API_KEY to .env.local to activate AI features.';
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: systemInstruction ? { role: 'system', parts: [{ text: systemInstruction }] } : undefined,
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini generation error:', error);
    return 'An error occurred while generating AI response. Please check your API quota or model settings.';
  }
}

export async function generateEmbedding(text: string): Promise<number[] | null> {
  if (!genAI) return null;

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_EMBEDDING_MODEL });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Gemini embedding error:', error);
    return null;
  }
}
