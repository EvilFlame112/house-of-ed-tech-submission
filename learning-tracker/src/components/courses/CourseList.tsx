'use client';

import { useCourses } from '@/lib/hooks/useCourses';
import { CourseCard } from './CourseCard';
import { CreateCourseDialog } from './CreateCourseDialog';
import { Loader2 } from 'lucide-react';

export function CourseList() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-retro-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-status-error font-body">Failed to load courses</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-background-secondary border-2 border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-heading text-white mb-2">
            NO COURSES YET
          </h3>
          <p className="text-gray-400 font-body mb-6">
            Create your first course to start organizing your learning journey
          </p>
          <CreateCourseDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading text-white">YOUR COURSES</h2>
          <p className="text-gray-400 font-body text-sm">
            {courses.length} course{courses.length !== 1 ? 's' : ''} in progress
          </p>
        </div>
        <CreateCourseDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

