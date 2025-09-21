import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: true, // Default to dark mode
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);