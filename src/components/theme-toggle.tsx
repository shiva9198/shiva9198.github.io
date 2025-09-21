'use client';

import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="glass rounded-full hover:animate-glow transition-all duration-150 relative overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-blue-500" />
      </motion.div>
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}