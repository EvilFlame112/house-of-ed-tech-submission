import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/get-session';
import { updateModuleSchema } from '@/lib/validations/module.schema';

// GET single module by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            color: true,
            userId: true,
          },
        },
        flashcards: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        studySessions: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    // Check ownership
    if (module.course.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error('Get module error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update module
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if module exists and user owns it
    const existingModule = await prisma.module.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!existingModule) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    if (existingModule.course.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = updateModuleSchema.parse(body);

    // Convert date strings to Date objects
    const updateData: any = { ...validatedData };
    if (validatedData.dueDate !== undefined) {
      updateData.dueDate = validatedData.dueDate
        ? new Date(validatedData.dueDate)
        : null;
    }
    if (validatedData.completedAt !== undefined) {
      updateData.completedAt = validatedData.completedAt
        ? new Date(validatedData.completedAt)
        : null;
    }

    const module = await prisma.module.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(module);
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

    console.error('Update module error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE module
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if module exists and user owns it
    const existingModule = await prisma.module.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!existingModule) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    if (existingModule.course.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.module.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Module deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Delete module error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

