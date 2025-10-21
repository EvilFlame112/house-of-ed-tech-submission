import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/get-session';
import { generateFlashcardsSchema } from '@/lib/validations/flashcard.schema';
import { generateFlashcardsFromNotes } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = generateFlashcardsSchema.parse(body);

    // Fetch module with notes
    const learningModule = await prisma.module.findUnique({
      where: { id: validatedData.moduleId },
      include: {
        course: true,
      },
    });

    if (!learningModule || learningModule.course.userId !== user.id) {
      return NextResponse.json(
        { error: 'Module not found or access denied' },
        { status: 403 }
      );
    }

    // Check if module has notes
    if (!learningModule.notes || learningModule.notes.trim().length < 50) {
      return NextResponse.json(
        {
          error:
            'Module notes are too short. Please add at least 50 characters of notes to generate flashcards.',
        },
        { status: 400 }
      );
    }

    // Generate flashcards using AI
    const generatedFlashcards = await generateFlashcardsFromNotes(
      learningModule.notes,
      validatedData.count
    );

    // Save flashcards to database
    const savedFlashcards = await prisma.$transaction(
      generatedFlashcards.map((card) =>
        prisma.flashcard.create({
          data: {
            moduleId: validatedData.moduleId,
            question: card.question,
            answer: card.answer,
            difficulty: card.difficulty,
            isAIGenerated: true,
          },
        })
      )
    );

    return NextResponse.json({
      flashcards: savedFlashcards,
      count: savedFlashcards.length,
      message: `Successfully generated ${savedFlashcards.length} flashcards`,
    });
  } catch (error: unknown) {
    const err = error as Error;
    if (err.name === 'ZodError') {
      const zodError = error as unknown as { errors: unknown[] };
      return NextResponse.json(
        {
          error: 'Validation error',
          issues: zodError.errors,
        },
        { status: 400 }
      );
    }

    console.error('Generate flashcards error:', err);
    return NextResponse.json(
      {
        error: err.message || 'Failed to generate flashcards',
      },
      { status: 500 }
    );
  }
}

