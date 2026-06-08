import { Loader } from 'lucide-react';

export const PageLoader = () => {
  return (
    <div className='flex h-svh w-full items-center justify-center'>
      <div className='flex items-center gap-2'>
        <Loader className='text-accent animate-spin' size={16} />
        <p className='text-foreground text-sm'>Loading...</p>
      </div>
    </div>
  );
};
