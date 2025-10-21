import { z } from 'zod';

export const createFlashcardSchema = z.object({
  moduleId: z.string().min(1, 'Module ID is required'),
  question: z.string().min(1, 'Question is required').max(1000, 'Question too long'),
  answer: z.string().min(1, 'Answer is required').max(2000, 'Answer too long'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
});

export const updateFlashcardSchema = z.object({
  question: z.string().min(1).max(1000).optional(),
  answer: z.string().min(1).max(2000).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
});

export const generateFlashcardsSchema = z.object({
  moduleId: z.string().min(1, 'Module ID is required'),
  count: z.number().min(1).max(20).optional().default(5),
});

export type CreateFlashcardInput = z.infer<typeof createFlashcardSchema>;
export type UpdateFlashcardInput = z.infer<typeof updateFlashcardSchema>;
export type GenerateFlashcardsInput = z.infer<typeof generateFlashcardsSchema>;

