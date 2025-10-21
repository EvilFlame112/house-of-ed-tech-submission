'use client';

import { useState, useEffect } from 'react';
import { useUpdateModule } from '@/lib/hooks/useModules';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit } from 'lucide-react';

interface EditModuleDialogProps {
  module: {
    id: string;
    title: string;
    status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
    estimatedHours: number;
    actualHours?: number;
    notes?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate?: string;
  };
}

export function EditModuleDialog({ module }: EditModuleDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: module.title,
    estimatedHours: module.estimatedHours,
    actualHours: module.actualHours || 0,
    notes: module.notes || '',
    status: module.status,
    priority: module.priority,
    dueDate: module.dueDate
      ? new Date(module.dueDate).toISOString().split('T')[0]
      : '',
  });

  const updateModule = useUpdateModule(module.id);

  useEffect(() => {
    if (open) {
      setFormData({
        title: module.title,
        estimatedHours: module.estimatedHours,
        actualHours: module.actualHours || 0,
        notes: module.notes || '',
        status: module.status,
        priority: module.priority,
        dueDate: module.dueDate
          ? new Date(module.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [open, module]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateModule.mutateAsync({
        title: formData.title,
        status: formData.status,
        estimatedHours: formData.estimatedHours,
        actualHours: formData.actualHours || undefined,
        notes: formData.notes || undefined,
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
        completedAt:
          formData.status === 'COMPLETED' && module.status !== 'COMPLETED'
            ? new Date().toISOString()
            : undefined,
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to update module:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          EDIT MODULE
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>EDIT MODULE</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Module Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Understanding TypeScript Generics"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedHours: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="actualHours">Actual Hours (Optional)</Label>
              <Input
                id="actualHours"
                type="number"
                min="0"
                step="0.5"
                value={formData.actualHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    actualHours: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date (Optional)</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add study notes, key concepts, resources, etc."
              rows={5}
            />
            <p className="text-xs text-gray-500 mt-1 font-body">
              {formData.notes.length} characters (50+ recommended for AI
              flashcards)
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button type="submit" disabled={updateModule.isPending}>
              {updateModule.isPending ? 'UPDATING...' : 'UPDATE MODULE'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

