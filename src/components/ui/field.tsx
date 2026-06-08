import * as React from 'react';
import type { FieldError } from 'react-hook-form';

import { cn } from '@/libs/utils';

interface FieldProps extends React.ComponentProps<'fieldset'> {
  error?: FieldError;
  description?: string;
  children: React.ReactNode;
}

/**
 * Field container for form inputs with error and description support.
 * Shows error if present, otherwise shows description.
 * @param error - Error message to display
 * @param description - Description or hint text to display below the input
 */
export const Field = ({ error, description, children, className, ...rest }: FieldProps) => {
  const message = (error && error.message) || description;

  return (
    <fieldset className={cn('w-full', 'flex flex-col gap-2', className)} {...rest}>
      {children}
      {message && (
        <span
          role={error ? 'alert' : undefined}
          className={cn('text-xs block', {
            'text-destructive': error,
            'text-text': !error,
          })}>
          {message}
        </span>
      )}
    </fieldset>
  );
};
