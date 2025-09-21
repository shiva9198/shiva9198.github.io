'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDark, mounted]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}