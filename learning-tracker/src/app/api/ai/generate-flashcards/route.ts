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
    const module = await prisma.module.findUnique({
      where: { id: validatedData.moduleId },
      include: {
        course: true,
      },
    });

    if (!module || module.course.userId !== user.id) {
      return NextResponse.json(
        { error: 'Module not found or access denied' },
        { status: 403 }
      );
    }

    // Check if module has notes
    if (!module.notes || module.notes.trim().length < 50) {
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
      module.notes,
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
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Validation error',
          issues: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Generate flashcards error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to generate flashcards',
      },
      { status: 500 }
    );
  }
}

