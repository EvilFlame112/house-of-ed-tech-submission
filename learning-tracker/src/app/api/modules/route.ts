import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/get-session';
import { createModuleSchema } from '@/lib/validations/module.schema';

// GET all modules for the authenticated user
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');

    const modules = await prisma.module.findMany({
      where: {
        course: {
          userId: user.id,
        },
        ...(courseId && { courseId }),
        ...(status && { status: status as any }),
      },
      include: {
        course: {
          select: {
            title: true,
            color: true,
          },
        },
        _count: {
          select: {
            flashcards: true,
            studySessions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      modules,
      total: modules.length,
    });
  } catch (error) {
    console.error('Get modules error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new module
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createModuleSchema.parse(body);

    // Verify user owns the course
    const course = await prisma.course.findUnique({
      where: { id: validatedData.courseId },
    });

    if (!course || course.userId !== user.id) {
      return NextResponse.json(
        { error: 'Course not found or access denied' },
        { status: 403 }
      );
    }

    // Convert dueDate string to Date if provided
    const moduleData: any = {
      ...validatedData,
      dueDate: validatedData.dueDate
        ? new Date(validatedData.dueDate)
        : undefined,
    };

    const module = await prisma.module.create({
      data: moduleData,
      include: {
        course: {
          select: {
            title: true,
            color: true,
          },
        },
      },
    });

    return NextResponse.json(module, { status: 201 });
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

    console.error('Create module error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

