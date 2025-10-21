'use client';

import { useState, useEffect } from 'react';
import { useUpdateCourse } from '@/lib/hooks/useCourses';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

interface EditCourseDialogProps {
  course: {
    id: string;
    title: string;
    description?: string;
    totalEstimatedHours: number;
    color?: string;
  };
}

const colorOptions = [
  { name: 'Green', value: '#10b981' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Indigo', value: '#6366f1' },
];

export function EditCourseDialog({ course }: EditCourseDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description || '',
    totalEstimatedHours: course.totalEstimatedHours,
    color: course.color || '#10b981',
  });

  const updateCourse = useUpdateCourse(course.id);

  useEffect(() => {
    if (open) {
      setFormData({
        title: course.title,
        description: course.description || '',
        totalEstimatedHours: course.totalEstimatedHours,
        color: course.color || '#10b981',
      });
    }
  }, [open, course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCourse.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        totalEstimatedHours: formData.totalEstimatedHours,
        color: formData.color,
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          EDIT COURSE
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>EDIT COURSE</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Full Stack Web Development"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of what you'll learn..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="hours">Total Estimated Hours</Label>
            <Input
              id="hours"
              type="number"
              min="0"
              step="0.5"
              value={formData.totalEstimatedHours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalEstimatedHours: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="40"
              required
            />
          </div>

          <div>
            <Label htmlFor="color">Course Color</Label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, color: colorOption.value })
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                    formData.color === colorOption.value
                      ? 'border-white bg-background-tertiary'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: colorOption.value }}
                  />
                  <span className="text-sm font-body text-white">
                    {colorOption.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button type="submit" disabled={updateCourse.isPending}>
              {updateCourse.isPending ? 'UPDATING...' : 'UPDATE COURSE'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

