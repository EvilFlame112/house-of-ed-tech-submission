'use client';

import { useState } from 'react';
import { useDeleteCourse } from '@/lib/hooks/useCourses';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteCourseButtonProps {
  courseId: string;
  courseName: string;
}

export function DeleteCourseButton({
  courseId,
  courseName,
}: DeleteCourseButtonProps) {
  const [open, setOpen] = useState(false);
  const deleteCourse = useDeleteCourse();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteCourse.mutateAsync(courseId);
      setOpen(false);
      router.push('/dashboard/courses');
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-status-error text-status-error hover:bg-status-error/10">
          <Trash2 className="w-4 h-4 mr-2" />
          DELETE COURSE
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-status-error">
            <AlertTriangle className="w-6 h-6" />
            DELETE COURSE
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-status-error/10 border border-status-error rounded-lg p-4">
            <p className="text-sm font-body text-white mb-2">
              Are you sure you want to delete this course?
            </p>
            <p className="text-lg font-heading text-white mb-3">
              "{courseName}"
            </p>
            <div className="text-xs font-body text-gray-400 space-y-1">
              <p>⚠️ This action cannot be undone</p>
              <p>⚠️ All modules in this course will be deleted</p>
              <p>⚠️ All flashcards will be permanently removed</p>
              <p>⚠️ All study sessions will be lost</p>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteCourse.isPending}
              className="bg-status-error hover:bg-status-error/80 text-white border-status-error"
            >
              {deleteCourse.isPending ? 'DELETING...' : 'DELETE PERMANENTLY'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

