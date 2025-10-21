'use client';

import { useModule } from '@/lib/hooks/useModules';
import { useFlashcards } from '@/lib/hooks/useFlashcards';
import { FlashcardFlip } from '@/components/flashcards/FlashcardFlip';
import { GenerateFlashcardsButton } from '@/components/flashcards/GenerateFlashcardsButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Sparkles, FileText, Calendar, Flag } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ModuleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: module, isLoading: moduleLoading } = useModule(params.id);
  const { data: flashcards, isLoading: flashcardsLoading } = useFlashcards(
    params.id
  );

  if (moduleLoading || flashcardsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-retro-blue" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-heading text-white mb-4">
          MODULE NOT FOUND
        </h2>
        <Link href="/dashboard/courses">
          <Button variant="primary">BACK TO COURSES</Button>
        </Link>
      </div>
    );
  }

  const statusConfig = {
    PLANNED: { color: 'text-status-planned', bg: 'bg-status-planned/20' },
    IN_PROGRESS: { color: 'text-status-inProgress', bg: 'bg-status-inProgress/20' },
    COMPLETED: { color: 'text-accent-green', bg: 'bg-accent-green/20' },
  };

  const status = statusConfig[module.status];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/dashboard/courses/${module.course.id}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-body text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {module.course.title}
        </Link>

        <div className="bg-gradient-to-br from-background-secondary to-background-tertiary border-2 border-retro-purple rounded-2xl p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-heading text-white mb-2">
                {module.title}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <span
                  className={`px-3 py-1 font-heading text-sm ${status.bg} ${status.color} rounded-full`}
                >
                  {module.status.replace('_', ' ')}
                </span>
                <span className="text-gray-400 font-body text-sm">
                  {module.estimatedHours}h estimated
                </span>
                {module.dueDate && (
                  <span className="flex items-center gap-1 text-gray-400 font-body text-sm">
                    <Calendar className="w-4 h-4" />
                    Due {format(new Date(module.dueDate), 'MMM d, yyyy')}
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-400 font-body text-sm">
                  <Flag className="w-4 h-4" />
                  {module.priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {module.notes && (
            <div className="mt-6 bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-heading">STUDY NOTES</span>
              </div>
              <p className="text-gray-300 font-body text-sm whitespace-pre-wrap">
                {module.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Flashcards Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-heading text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-retro-pink" />
              FLASHCARDS
            </h2>
            <p className="text-gray-400 font-body text-sm">
              {flashcards?.length || 0} flashcard
              {flashcards?.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <GenerateFlashcardsButton
            moduleId={params.id}
            hasNotes={!!(module.notes && module.notes.length >= 50)}
          />
        </div>

        {!flashcards || flashcards.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-background-secondary border-2 border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🎴</div>
              <h3 className="text-2xl font-heading text-white mb-2">
                NO FLASHCARDS YET
              </h3>
              <p className="text-gray-400 font-body mb-6">
                {module.notes && module.notes.length >= 50
                  ? 'Generate flashcards using AI or create them manually'
                  : 'Add at least 50 characters of notes to use AI generation'}
              </p>
              {module.notes && module.notes.length >= 50 && (
                <GenerateFlashcardsButton
                  moduleId={params.id}
                  hasNotes={true}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((flashcard) => (
              <FlashcardFlip key={flashcard.id} flashcard={flashcard} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

