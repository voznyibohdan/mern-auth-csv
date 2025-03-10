import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

import './index.css';
import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
