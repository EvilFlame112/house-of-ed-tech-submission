'use client';

import { Clock, Calendar, Flag, FileText, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
    estimatedHours: number;
    actualHours?: number;
    notes?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate?: string;
    completedAt?: string;
    _count?: {
      flashcards: number;
      studySessions: number;
    };
  };
}

const statusConfig = {
  PLANNED: {
    bg: 'bg-status-planned/20',
    border: 'border-status-planned',
    text: 'text-status-planned',
    label: 'PLANNED',
  },
  IN_PROGRESS: {
    bg: 'bg-status-inProgress/20',
    border: 'border-status-inProgress',
    text: 'text-status-inProgress',
    label: 'IN PROGRESS',
  },
  COMPLETED: {
    bg: 'bg-accent-green/20',
    border: 'border-accent-green',
    text: 'text-accent-green',
    label: 'COMPLETED',
  },
};

const priorityConfig = {
  LOW: { color: 'text-gray-500', icon: '○' },
  MEDIUM: { color: 'text-status-inProgress', icon: '◐' },
  HIGH: { color: 'text-status-error', icon: '●' },
};

export function ModuleCard({ module }: ModuleCardProps) {
  const status = statusConfig[module.status];
  const priority = priorityConfig[module.priority];

  return (
    <Link href={`/dashboard/modules/${module.id}`}>
      <div className="group bg-background-tertiary border-l-4 border-retro-purple rounded-xl p-5 hover:bg-background-secondary transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-heading text-white group-hover:text-retro-purple transition-colors flex-1 line-clamp-2">
            {module.title}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-heading text-xs ${status.bg} ${status.text} border ${status.border} rounded-full ml-2 flex-shrink-0`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {status.label}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-body">
              {module.estimatedHours}h
              {module.actualHours && ` / ${module.actualHours}h`}
            </span>
          </div>

          <div className={`flex items-center gap-1.5 ${priority.color}`}>
            <Flag className="w-3.5 h-3.5" />
            <span className="text-xs font-body">{module.priority}</span>
          </div>

          {module.dueDate && (
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-body">
                {format(new Date(module.dueDate), 'MMM d')}
              </span>
            </div>
          )}
        </div>

        {/* Notes Preview */}
        {module.notes && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span className="text-xs font-body">Notes</span>
            </div>
            <p className="text-sm text-gray-400 font-body line-clamp-2">
              {module.notes}
            </p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-retro-pink" />
            <span className="text-xs font-body text-gray-400">
              {module._count?.flashcards || 0} flashcards
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-retro-cyan" />
            <span className="text-xs font-body text-gray-400">
              {module._count?.studySessions || 0} sessions
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

