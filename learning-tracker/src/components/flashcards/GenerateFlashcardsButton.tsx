'use client';

import { useState } from 'react';
import { useGenerateFlashcards } from '@/lib/hooks/useFlashcards';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';

interface GenerateFlashcardsButtonProps {
  moduleId: string;
  hasNotes: boolean;
}

export function GenerateFlashcardsButton({
  moduleId,
  hasNotes,
}: GenerateFlashcardsButtonProps) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(5);
  const generateFlashcards = useGenerateFlashcards();

  const handleGenerate = async () => {
    try {
      const result = await generateFlashcards.mutateAsync({
        moduleId,
        count,
      });
      setOpen(false);
      alert(`Successfully generated ${result.count} flashcards!`);
    } catch (error: any) {
      alert(error.message || 'Failed to generate flashcards');
    }
  };

  if (!hasNotes) {
    return (
      <Button variant="secondary" disabled size="md">
        <Sparkles className="w-5 h-5 mr-2" />
        ADD NOTES TO USE AI
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="md">
          <Sparkles className="w-5 h-5 mr-2" />
          GENERATE AI FLASHCARDS
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI FLASHCARD GENERATION</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-retro-purple/10 border border-retro-purple rounded-lg p-4">
            <p className="text-sm font-body text-gray-300 mb-2">
              Our AI will analyze your module notes and generate study
              flashcards automatically using Google Gemini.
            </p>
            <ul className="text-xs font-body text-gray-400 space-y-1">
              <li>• Questions are based on key concepts in your notes</li>
              <li>• Answers are concise and clear</li>
              <li>• Difficulty is automatically assessed</li>
            </ul>
          </div>

          <div>
            <Label htmlFor="count">Number of Flashcards</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 5)}
              placeholder="5"
            />
            <p className="text-xs text-gray-500 mt-1 font-body">
              We recommend 5-10 flashcards per module
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={generateFlashcards.isPending}
            >
              {generateFlashcards.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  GENERATING...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  GENERATE {count} FLASHCARDS
                </>
              )}
            </Button>
          </div>

          {generateFlashcards.isPending && (
            <div className="bg-retro-blue/10 border border-retro-blue rounded-lg p-4">
              <p className="text-sm font-body text-retro-blue text-center">
                🤖 AI is analyzing your notes and creating flashcards...
                <br />
                This may take 10-30 seconds.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

