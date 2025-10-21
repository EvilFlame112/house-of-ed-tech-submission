'use client';

import { useCourses } from '@/lib/hooks/useCourses';
import { useModules } from '@/lib/hooks/useModules';
import { useFlashcards } from '@/lib/hooks/useFlashcards';
import {
  TrendingUp,
  BookOpen,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: allModules, isLoading: modulesLoading } = useModules();
  const { data: allFlashcards, isLoading: flashcardsLoading } = useFlashcards();

  if (coursesLoading || modulesLoading || flashcardsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-retro-blue" />
      </div>
    );
  }

  const totalCourses = courses?.length || 0;
  const totalModules = allModules?.length || 0;
  const totalFlashcards = allFlashcards?.length || 0;

  const completedModules =
    allModules?.filter((m) => m.status === 'COMPLETED').length || 0;
  const inProgressModules =
    allModules?.filter((m) => m.status === 'IN_PROGRESS').length || 0;
  const plannedModules =
    allModules?.filter((m) => m.status === 'PLANNED').length || 0;

  const totalEstimatedHours =
    allModules?.reduce((sum, m) => sum + m.estimatedHours, 0) || 0;
  const completedHours =
    allModules
      ?.filter((m) => m.status === 'COMPLETED')
      .reduce((sum, m) => sum + m.estimatedHours, 0) || 0;

  const overallProgress =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  const aiGeneratedFlashcards =
    allFlashcards?.filter((f) => f.isAIGenerated).length || 0;

  // Get recent activity
  const recentModules = allModules
    ?.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading text-white mb-2 flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-retro-blue" />
          LEARNING ANALYTICS
        </h1>
        <p className="text-gray-400 font-body">
          Track your progress and study patterns
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-retro-blue/20 to-retro-blue/5 border-2 border-retro-blue rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-retro-blue" />
            <span className="text-xs font-body text-gray-400">TOTAL</span>
          </div>
          <div className="text-3xl font-heading text-white mb-1">
            {totalCourses}
          </div>
          <div className="text-sm font-body text-gray-400">Courses</div>
        </div>

        <div className="bg-gradient-to-br from-retro-purple/20 to-retro-purple/5 border-2 border-retro-purple rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-retro-purple" />
            <span className="text-xs font-body text-gray-400">COMPLETED</span>
          </div>
          <div className="text-3xl font-heading text-white mb-1">
            {completedModules}
          </div>
          <div className="text-sm font-body text-gray-400">
            of {totalModules} modules
          </div>
        </div>

        <div className="bg-gradient-to-br from-retro-pink/20 to-retro-pink/5 border-2 border-retro-pink rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Brain className="w-8 h-8 text-retro-pink" />
            <span className="text-xs font-body text-gray-400">AI CARDS</span>
          </div>
          <div className="text-3xl font-heading text-white mb-1">
            {aiGeneratedFlashcards}
          </div>
          <div className="text-sm font-body text-gray-400">
            of {totalFlashcards} flashcards
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-green/20 to-accent-green/5 border-2 border-accent-green rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-accent-green" />
            <span className="text-xs font-body text-gray-400">PROGRESS</span>
          </div>
          <div className="text-3xl font-heading text-white mb-1">
            {overallProgress}%
          </div>
          <div className="text-sm font-body text-gray-400">Overall</div>
        </div>
      </div>

      {/* Progress Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Status Distribution */}
        <div className="bg-background-secondary border-2 border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-heading text-white mb-6">
            MODULE STATUS
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-body mb-2">
                <span className="text-gray-400">Completed</span>
                <span className="text-accent-green">{completedModules}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-accent-green rounded-full transition-all"
                  style={{
                    width: `${totalModules > 0 ? (completedModules / totalModules) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-body mb-2">
                <span className="text-gray-400">In Progress</span>
                <span className="text-status-inProgress">
                  {inProgressModules}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-status-inProgress rounded-full transition-all"
                  style={{
                    width: `${totalModules > 0 ? (inProgressModules / totalModules) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-body mb-2">
                <span className="text-gray-400">Planned</span>
                <span className="text-status-planned">{plannedModules}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-status-planned rounded-full transition-all"
                  style={{
                    width: `${totalModules > 0 ? (plannedModules / totalModules) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Study Hours */}
        <div className="bg-background-secondary border-2 border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-heading text-white mb-6">STUDY HOURS</h2>
          <div className="space-y-6">
            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="text-sm font-body text-gray-400 mb-1">
                Total Estimated
              </div>
              <div className="text-3xl font-heading text-retro-cyan">
                {totalEstimatedHours.toFixed(1)}h
              </div>
            </div>

            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="text-sm font-body text-gray-400 mb-1">
                Completed
              </div>
              <div className="text-3xl font-heading text-accent-green">
                {completedHours.toFixed(1)}h
              </div>
            </div>

            <div className="bg-background-tertiary rounded-lg p-4">
              <div className="text-sm font-body text-gray-400 mb-1">
                Remaining
              </div>
              <div className="text-3xl font-heading text-retro-purple">
                {(totalEstimatedHours - completedHours).toFixed(1)}h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-background-secondary border-2 border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-heading text-white mb-6">
          RECENT ACTIVITY
        </h2>
        {!recentModules || recentModules.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 font-body">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentModules.map((module) => (
              <div
                key={module.id}
                className="flex items-center justify-between bg-background-tertiary rounded-lg p-4 hover:bg-background-primary transition-colors"
              >
                <div className="flex-1">
                  <div className="text-white font-body mb-1">
                    {module.title}
                  </div>
                  <div className="text-sm text-gray-400 font-body">
                    {module.course?.title || 'Unknown Course'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs font-body rounded ${
                      module.status === 'COMPLETED'
                        ? 'bg-accent-green/20 text-accent-green'
                        : module.status === 'IN_PROGRESS'
                          ? 'bg-status-inProgress/20 text-status-inProgress'
                          : 'bg-status-planned/20 text-status-planned'
                    }`}
                  >
                    {module.status.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-500 font-body">
                    {module.estimatedHours}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

