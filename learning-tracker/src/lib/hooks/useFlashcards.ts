'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Flashcard {
  id: string;
  moduleId: string;
  question: string;
  answer: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  reviewCount: number;
  lastReviewed?: string;
  isAIGenerated: boolean;
  createdAt: string;
}

export function useFlashcards(moduleId?: string) {
  return useQuery({
    queryKey: moduleId ? ['flashcards', moduleId] : ['flashcards'],
    queryFn: async () => {
      const url = moduleId
        ? `/api/flashcards?moduleId=${moduleId}`
        : '/api/flashcards';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch flashcards');
      const data = await response.json();
      return data.flashcards as Flashcard[];
    },
  });
}

export function useCreateFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      moduleId: string;
      question: string;
      answer: string;
      difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    }) => {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create flashcard');
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
      queryClient.invalidateQueries({
        queryKey: ['flashcards', variables.moduleId],
      });
      queryClient.invalidateQueries({
        queryKey: ['modules', variables.moduleId],
      });
    },
  });
}

export function useGenerateFlashcards() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { moduleId: string; count?: number }) => {
      const response = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate flashcards');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
      queryClient.invalidateQueries({
        queryKey: ['flashcards', variables.moduleId],
      });
      queryClient.invalidateQueries({
        queryKey: ['modules', variables.moduleId],
      });
    },
  });
}

export function useDeleteFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/flashcards/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete flashcard');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
}

