import { BadgeCheck, Loader, TriangleAlert } from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

export const Toaster = () => {
  return (
    <Sonner
      visibleToasts={2}
      position='bottom-center'
      icons={{
        info: null,
        loading: <Loader className='text-accent' size={16} />,
        error: <TriangleAlert className='text-destructive' size={16} />,
        success: <BadgeCheck className='text-emerald-500' size={16} />,
        warning: <TriangleAlert className='text-amber-500' size={16} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          icon: 'size-4',
          title: 'text-foreground font-medium',
          actionButton: 'bg-foreground text-white',
          cancelButton: 'bg-foreground text-white',
          toast: 'font-sans bg-background p-4 text-xs flex gap-3 rounded-lg w-full border',
        },
      }}
    />
  );
};
