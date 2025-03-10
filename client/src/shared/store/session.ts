import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;

    accessToken: string;
    setAccessToken: (accessToken: string) => void;
}

export const useSessionStore = create<SessionState>()(
    persist((set) => ({
        isAuthenticated: false,
        setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated: isAuthenticated })),

        accessToken: '',
        setAccessToken: (accessToken: string) => set(() => ({ accessToken: accessToken })),
    }), { name: 'session' })
);
