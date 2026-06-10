import type React from 'react';

interface TableProps extends React.ComponentProps<'table'> {
  children: React.ReactNode;
}

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div className='w-full overflow-auto'>
      <table className={'w-full text-left text-sm ' + (className ?? '')} {...props}>
        {children}
      </table>
    </div>
  );
};

export const Thead = ({ children, className, ...props }: React.ComponentProps<'thead'>) => {
  return (
    <thead className={'text-muted-foreground border-b ' + (className ?? '')} {...props}>
      {children}
    </thead>
  );
};

export const Tbody = ({ children, className, ...props }: React.ComponentProps<'tbody'>) => {
  return (
    <tbody className={className ?? ''} {...props}>
      {children}
    </tbody>
  );
};

export const Tr = ({ children, className, ...props }: React.ComponentProps<'tr'>) => {
  return (
    <tr className={'border-b last:border-0 ' + (className ?? '')} {...props}>
      {children}
    </tr>
  );
};

export const Th = ({ children, className, ...props }: React.ComponentProps<'th'>) => {
  return (
    <th className={'h-10 px-4 font-medium ' + (className ?? '')} {...props}>
      {children}
    </th>
  );
};

export const Td = ({ children, className, ...props }: React.ComponentProps<'td'>) => {
  return (
    <td className={'h-12 px-4 ' + (className ?? '')} {...props}>
      {children}
    </td>
  );
};
