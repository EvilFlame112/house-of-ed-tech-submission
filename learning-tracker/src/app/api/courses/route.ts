import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/get-session';
import { createCourseSchema } from '@/lib/validations/course.schema';

// GET all courses for the authenticated user
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courses = await prisma.course.findMany({
      where: {
        userId: user.id,
      },
      include: {
        _count: {
          select: {
            modules: true,
          },
        },
        modules: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate progress for each course
    const coursesWithProgress = courses.map((course) => {
      const totalModules = course.modules.length;
      const completed = course.modules.filter(
        (m) => m.status === 'COMPLETED'
      ).length;
      const inProgress = course.modules.filter(
        (m) => m.status === 'IN_PROGRESS'
      ).length;
      const planned = course.modules.filter((m) => m.status === 'PLANNED').length;

      const { modules, ...courseData } = course;

      return {
        ...courseData,
        progress: {
          total: totalModules,
          completed,
          inProgress,
          planned,
        },
      };
    });

    return NextResponse.json({
      courses: coursesWithProgress,
      total: courses.length,
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new course
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createCourseSchema.parse(body);

    const course = await prisma.course.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    });

    return NextResponse.json(course, { status: 201 });
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

    console.error('Create course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

