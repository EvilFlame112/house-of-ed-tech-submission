'use client';

import { useState } from 'react';
import { useCreateCourse } from '@/lib/hooks/useCourses';
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
import { Plus } from 'lucide-react';

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalEstimatedHours: 0,
    color: '#10b981',
  });

  const createCourse = useCreateCourse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createCourse.mutateAsync(formData);
      setFormData({
        title: '',
        description: '',
        totalEstimatedHours: 0,
        color: '#10b981',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          CREATE COURSE
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>CREATE NEW COURSE</DialogTitle>
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
              placeholder="e.g., Advanced TypeScript"
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
              placeholder="Brief description of the course..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="hours">Estimated Hours</Label>
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
            />
          </div>

          <div>
            <Label htmlFor="color">Color Theme</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-20 h-12 cursor-pointer"
              />
              <span className="text-sm text-gray-400 font-body">
                {formData.color}
              </span>
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
            <Button type="submit" disabled={createCourse.isPending}>
              {createCourse.isPending ? 'CREATING...' : 'CREATE COURSE'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

