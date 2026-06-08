import { ChevronDown, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import type { IconPosition } from '@/libs/types';
import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'select'> {
  icon?: LucideIcon;
  invalid?: boolean;
  position?: IconPosition;
}

const paddings = {
  icon: { start: 'left-4', end: 'right-4' },
  input: { start: 'pl-11', end: 'pr-11' },
} as const;

/**
 * Base select component with optional icon.
 */
export const Select = ({
  invalid = false,
  position = 'end',
  icon: Icon = ChevronDown,
  className,
  children,
  ...rest
}: Props) => {
  return (
    <div className='relative w-full'>
      <span
        className={cn(
          'text-foreground',
          'absolute top-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          'pointer-events-none select-none',
          paddings.icon[position],
        )}>
        <Icon size={16} aria-hidden />
      </span>
      <select
        className={cn(
          'text-sm cursor-pointer',
          'input-appearance-none',
          'bg-ghost text-foreground',
          'w-full h-10 px-4 rounded-lg',
          'disabled:cursor-not-allowed disabled:text-text',
          'focus-visible:ring-2 focus-visible:ring-accent outline-none',
          { 'ring-2 ring-destructive': invalid },
          paddings.input[position],
          className,
        )}
        {...rest}>
        {children}
      </select>
    </div>
  );
};
