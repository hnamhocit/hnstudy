import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void;
  setTheme: (newTheme: Theme) => void;
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
