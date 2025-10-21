import { z } from 'zod';

export const createModuleSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']).optional(),
  estimatedHours: z.number().min(0, 'Hours must be positive'),
  actualHours: z.number().min(0).optional(),
  notes: z.string().max(5000, 'Notes too long').optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueDate: z.string().datetime().optional(),
});

export const updateModuleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']).optional(),
  estimatedHours: z.number().min(0).optional(),
  actualHours: z.number().min(0).optional(),
  notes: z.string().max(5000).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  completedAt: z.string().datetime().optional().nullable(),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;

