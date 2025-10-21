import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Free tier compatible models (try in this order):
// 1. gemini-1.5-flash-latest - Latest flash model (recommended)
// 2. gemini-1.5-flash - Standard flash model
// 3. gemini-pro - Older model (may be deprecated)
// 4. models/gemini-1.5-flash-latest - Full path version

// Using the latest stable version for free tier
export const AI_MODEL = 'models/gemini-2.5-flash';

export async function generateFlashcardsFromNotes(
  notes: string,
  count: number = 5
): Promise<
  Array<{
    question: string;
    answer: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  }>
> {
  try {
    const model = genAI.getGenerativeModel({ model: AI_MODEL });

    const prompt = `You are a helpful study assistant. Generate exactly ${count} flashcards from the following study notes. 

IMPORTANT: Return ONLY a valid JSON array with no additional text, explanations, or markdown formatting.

The JSON must have this exact structure:
[
  {
    "question": "Your question here?",
    "answer": "Your answer here",
    "difficulty": "EASY"
  }
]

Guidelines:
- Each flashcard should have a clear question and concise answer
- Difficulty should be one of: "EASY", "MEDIUM", "HARD"
- Focus on key concepts, definitions, and important facts
- Make questions specific and testable
- Answers should be clear and factual

Study Notes:
${notes}

Return ONLY the JSON array:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // Parse JSON
    const flashcards = JSON.parse(cleanedText);

    // Validate structure
    if (!Array.isArray(flashcards)) {
      throw new Error('AI response is not an array');
    }

    // Validate each flashcard
    const validFlashcards = flashcards
      .filter(
        (card) =>
          card.question &&
          card.answer &&
          ['EASY', 'MEDIUM', 'HARD'].includes(card.difficulty)
      )
      .slice(0, count); // Ensure we don't exceed requested count

    if (validFlashcards.length === 0) {
      throw new Error('No valid flashcards generated');
    }

    return validFlashcards;
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate flashcards with AI');
  }
}
