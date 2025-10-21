'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-retro-blue focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-retro-blue text-white hover:bg-retro-blue/80',
        secondary:
          'border-transparent bg-retro-purple text-white hover:bg-retro-purple/80',
        success:
          'border-transparent bg-accent-green text-white hover:bg-accent-green/80',
        warning:
          'border-transparent bg-status-inProgress text-white hover:bg-status-inProgress/80',
        error:
          'border-transparent bg-status-error text-white hover:bg-status-error/80',
        outline: 'text-gray-300 border-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

