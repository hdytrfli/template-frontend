import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'form'> {
  children: React.ReactNode;
}

/**
 * Form wrapper with grid layout and consistent spacing.
 */
export const Form = ({ children, className, ...rest }: Props) => {
  return (
    <form className={cn('grid gap-4', className)} {...rest}>
      {children}
    </form>
  );
};
