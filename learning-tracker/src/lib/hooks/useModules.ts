'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Module {
  id: string;
  courseId: string;
  title: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
  estimatedHours: number;
  actualHours?: number;
  notes?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export function useModules(courseId?: string) {
  return useQuery({
    queryKey: courseId ? ['modules', courseId] : ['modules'],
    queryFn: async () => {
      const url = courseId
        ? `/api/modules?courseId=${courseId}`
        : '/api/modules';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch modules');
      const data = await response.json();
      return data.modules as Module[];
    },
  });
}

export function useModule(id: string) {
  return useQuery({
    queryKey: ['modules', id],
    queryFn: async () => {
      const response = await fetch(`/api/modules/${id}`);
      if (!response.ok) throw new Error('Failed to fetch module');
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      courseId: string;
      title: string;
      status?: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
      estimatedHours: number;
      notes?: string;
      priority?: 'LOW' | 'MEDIUM' | 'HIGH';
      dueDate?: string;
    }) => {
      const response = await fetch('/api/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create module');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['modules', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses', variables.courseId] });
    },
  });
}

export function useUpdateModule(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Module>) => {
      const response = await fetch(`/api/modules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update module');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['modules', id] });
      queryClient.invalidateQueries({ queryKey: ['modules', data.courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses', data.courseId] });
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/modules/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete module');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

