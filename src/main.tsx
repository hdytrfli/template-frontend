import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import '@/index.css';
import App from '@/app';

import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/stack-sans-notch/wght.css';
import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const root = document.getElementById('root');
if (!root) throw Error('Root element not found in index.html');

const queryClient = new QueryClient();
createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
