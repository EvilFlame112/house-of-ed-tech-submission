'use client';

import { useState } from 'react';
import { Brain, Trash2 } from 'lucide-react';
import { useDeleteFlashcard } from '@/lib/hooks/useFlashcards';

interface FlashcardFlipProps {
  flashcard: {
    id: string;
    question: string;
    answer: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    isAIGenerated: boolean;
  };
}

const difficultyColors = {
  EASY: 'text-accent-green',
  MEDIUM: 'text-status-inProgress',
  HARD: 'text-status-error',
};

export function FlashcardFlip({ flashcard }: FlashcardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const deleteFlashcard = useDeleteFlashcard();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this flashcard?')) {
      await deleteFlashcard.mutateAsync(flashcard.id);
    }
  };

  return (
    <div className="relative w-full h-64 perspective-1000 group">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-retro-blue to-retro-purple border-4 border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(66,135,245,0.4)]">
          <div className="text-xs font-body text-white/60 mb-4 flex items-center gap-2">
            {flashcard.isAIGenerated && (
              <span className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI Generated
              </span>
            )}
            <span className={difficultyColors[flashcard.difficulty]}>
              {flashcard.difficulty}
            </span>
          </div>
          <p className="text-xl font-body text-white text-center mb-4">
            {flashcard.question}
          </p>
          <div className="text-sm font-body text-white/60 animate-pulse">
            Click to reveal answer
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-retro-purple to-retro-pink border-4 border-white/20 rounded-2xl p-6 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)]">
          <div className="text-center">
            <div className="text-sm font-body text-white/60 mb-4">Answer:</div>
            <p className="text-lg font-body text-white whitespace-pre-wrap">
              {flashcard.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-2 bg-status-error/20 hover:bg-status-error/40 text-status-error rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
        title="Delete flashcard"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

