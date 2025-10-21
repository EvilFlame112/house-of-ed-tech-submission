'use client';

import { useCourse } from '@/lib/hooks/useCourses';
import { useModules } from '@/lib/hooks/useModules';
import { CreateModuleDialog } from '@/components/modules/CreateModuleDialog';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { ArrowLeft, Book, Clock, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: course, isLoading: courseLoading } = useCourse(params.id);
  const { data: modules, isLoading: modulesLoading } = useModules(params.id);

  if (courseLoading || modulesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-retro-blue" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-heading text-white mb-4">
          COURSE NOT FOUND
        </h2>
        <Link href="/dashboard/courses">
          <Button variant="primary">BACK TO COURSES</Button>
        </Link>
      </div>
    );
  }

  const completionPercent = modules?.length
    ? Math.round(
        (modules.filter((m) => m.status === 'COMPLETED').length /
          modules.length) *
          100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-body text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        <div
          className="bg-gradient-to-br from-background-secondary to-background-tertiary border-2 rounded-2xl p-8"
          style={{ borderColor: course.color || '#10b981' }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-heading text-white mb-2">
                {course.title}
              </h1>
              {course.description && (
                <p className="text-gray-400 font-body">{course.description}</p>
              )}
            </div>
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center ml-4"
              style={{ backgroundColor: (course.color || '#10b981') + '20' }}
            >
              <Book className="w-8 h-8" style={{ color: course.color }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Book className="w-4 h-4" />
                <span className="text-xs font-body">Total Modules</span>
              </div>
              <div className="text-2xl font-heading text-white">
                {modules?.length || 0}
              </div>
            </div>

            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-body">Estimated Hours</span>
              </div>
              <div className="text-2xl font-heading text-white">
                {course.totalEstimatedHours}h
              </div>
            </div>

            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-body">Progress</span>
              </div>
              <div className="text-2xl font-heading text-accent-green">
                {completionPercent}%
              </div>
            </div>

            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Book className="w-4 h-4" />
                <span className="text-xs font-body">Completed</span>
              </div>
              <div className="text-2xl font-heading text-accent-green">
                {modules?.filter((m) => m.status === 'COMPLETED').length || 0}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {modules && modules.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-xs font-body text-gray-400 mb-2">
                <span>Course Progress</span>
                <span>
                  {modules.filter((m) => m.status === 'COMPLETED').length} /{' '}
                  {modules.length} modules completed
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-green to-accent-greenLight rounded-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modules Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-heading text-white">MODULES</h2>
            <p className="text-gray-400 font-body text-sm">
              Learning topics and chapters
            </p>
          </div>
          <CreateModuleDialog courseId={params.id} />
        </div>

        {!modules || modules.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-background-secondary border-2 border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-heading text-white mb-2">
                NO MODULES YET
              </h3>
              <p className="text-gray-400 font-body mb-6">
                Start by adding your first learning module or topic to this
                course
              </p>
              <CreateModuleDialog courseId={params.id} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

