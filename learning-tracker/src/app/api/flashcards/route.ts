import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/get-session';
import { createFlashcardSchema } from '@/lib/validations/flashcard.schema';

// GET all flashcards
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');

    const flashcards = await prisma.flashcard.findMany({
      where: {
        module: {
          course: {
            userId: user.id,
          },
        },
        ...(moduleId && { moduleId }),
      },
      include: {
        module: {
          select: {
            title: true,
            course: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      flashcards,
      total: flashcards.length,
    });
  } catch (error) {
    console.error('Get flashcards error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new flashcard
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createFlashcardSchema.parse(body);

    // Verify user owns the module
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

    const flashcard = await prisma.flashcard.create({
      data: validatedData,
    });

    return NextResponse.json(flashcard, { status: 201 });
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

    console.error('Create flashcard error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

