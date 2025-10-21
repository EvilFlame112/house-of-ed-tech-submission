import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'font-heading inline-flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed pixelated';

    const variants = {
      primary:
        'bg-gradient-to-r from-retro-blue to-retro-purple text-white border-4 border-retro-blue shadow-[4px_4px_0px_0px_rgba(66,135,245,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(66,135,245,0.7)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(66,135,245,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
      secondary:
        'bg-gradient-to-r from-retro-purple to-retro-pink text-white border-4 border-retro-purple shadow-[4px_4px_0px_0px_rgba(124,58,237,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(124,58,237,0.7)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(124,58,237,0.3)] active:translate-x-[2px] active:translate-y-[2px]',
      outline:
        'bg-transparent text-retro-purple border-2 border-retro-purple hover:bg-retro-purple/10',
      danger:
        'bg-transparent text-status-error border-2 border-status-error hover:bg-status-error/10',
      success:
        'bg-accent-green text-white border-2 border-accent-green hover:bg-accent-green/80',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

