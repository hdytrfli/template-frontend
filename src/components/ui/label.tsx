import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'label'> {
  children: React.ReactNode;
  required?: boolean;
}

/**
 * Label for form inputs with optional required indicator.
 */
export const Label = ({ children, required, className, ...rest }: Props) => {
  return (
    <label
      className={cn('block text-sm font-medium', 'text-foreground', 'select-none', className)}
      {...rest}>
      {children}
      {required && <span className='text-destructive ml-1'>*</span>}
    </label>
  );
};
