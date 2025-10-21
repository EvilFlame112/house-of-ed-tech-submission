'use client';

import Link from 'next/link';
import { Book, Clock, TrendingUp } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description?: string;
    totalEstimatedHours: number;
    color?: string;
    progress?: {
      total: number;
      completed: number;
      inProgress: number;
      planned: number;
    };
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const completionPercent = course.progress?.total
    ? Math.round((course.progress.completed / course.progress.total) * 100)
    : 0;

  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <div
        className="group bg-gradient-to-br from-background-secondary to-background-tertiary border-2 border-gray-800 rounded-2xl p-6 hover:border-retro-blue hover:shadow-[0_0_30px_rgba(66,135,245,0.4)] transition-all duration-300 cursor-pointer h-full"
        style={{
          borderLeftColor: course.color || '#10b981',
          borderLeftWidth: '4px',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-heading text-white group-hover:text-retro-blue transition-colors line-clamp-2">
              {course.title}
            </h3>
            {course.description && (
              <p className="text-sm text-gray-400 font-body mt-1 line-clamp-2">
                {course.description}
              </p>
            )}
          </div>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: course.color + '20' }}
          >
            <Book className="w-6 h-6" style={{ color: course.color }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-background-tertiary rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-body">Hours</span>
            </div>
            <div className="text-lg font-heading text-white">
              {course.totalEstimatedHours}h
            </div>
          </div>
          <div className="bg-background-tertiary rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-body">Progress</span>
            </div>
            <div className="text-lg font-heading text-accent-green">
              {completionPercent}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs font-body text-gray-400 mb-2">
            <span>Modules: {course.progress?.total || 0}</span>
            <span>
              {course.progress?.completed || 0} completed
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-green to-accent-greenLight rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {/* Module Status */}
        <div className="flex gap-2 text-xs font-body">
          {course.progress && (
            <>
              <span className="px-2 py-1 bg-status-planned/20 text-status-planned rounded">
                {course.progress.planned} planned
              </span>
              <span className="px-2 py-1 bg-status-inProgress/20 text-status-inProgress rounded">
                {course.progress.inProgress} active
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

