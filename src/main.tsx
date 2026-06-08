import * as React from 'react';
import { createRoot } from 'react-dom/client';

import '@/index.css';
import App from '@/app';

import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/stack-sans-notch/wght.css';

const root = document.getElementById('root');
if (!root) throw Error('Root element not found in index.html');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
