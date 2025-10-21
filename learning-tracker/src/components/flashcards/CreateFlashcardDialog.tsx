'use client';

import { useState } from 'react';
import { useCreateFlashcard } from '@/lib/hooks/useFlashcards';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface CreateFlashcardDialogProps {
  moduleId: string;
}

export function CreateFlashcardDialog({ moduleId }: CreateFlashcardDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    difficulty: 'MEDIUM' as 'EASY' | 'MEDIUM' | 'HARD',
  });

  const createFlashcard = useCreateFlashcard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createFlashcard.mutateAsync({
        moduleId,
        question: formData.question,
        answer: formData.answer,
        difficulty: formData.difficulty,
      });
      setFormData({
        question: '',
        answer: '',
        difficulty: 'MEDIUM',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to create flashcard:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="md">
          <Plus className="w-5 h-5 mr-2" />
          CREATE FLASHCARD
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>CREATE FLASHCARD</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="What is the question you want to ask?"
              rows={3}
              required
            />
            <p className="text-xs text-gray-500 mt-1 font-body">
              Write a clear, concise question
            </p>
          </div>

          <div>
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              placeholder="What is the correct answer?"
              rows={4}
              required
            />
            <p className="text-xs text-gray-500 mt-1 font-body">
              Provide a complete, accurate answer
            </p>
          </div>

          <div>
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value: any) =>
                setFormData({ ...formData, difficulty: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button type="submit" disabled={createFlashcard.isPending}>
              {createFlashcard.isPending ? 'CREATING...' : 'CREATE FLASHCARD'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

