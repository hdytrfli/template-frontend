import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'h1'> {
  children: React.ReactNode;
}

/**
 * Section or page heading.
 */
export const Header = ({ children, className, ...rest }: Props) => {
  return (
    <h1 className={cn('text-2xl font-medium', className)} {...rest}>
      {children}
    </h1>
  );
};
