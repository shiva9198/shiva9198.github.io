'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, Home, User, Code, Award, Briefcase, FolderOpen, Gamepad2, Mail } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'education', label: 'Education', icon: Award },
  { id: 'internship', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'playground', label: 'Playground', icon: Gamepad2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Navigation = memo(function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (isScrolling) return; // Prevent multiple rapid clicks
    
    const element = document.getElementById(sectionId === 'hero' ? 'hero' : sectionId);
    if (element) {
      setIsScrolling(true);
      
      // Calculate the offset position accounting for the fixed navigation
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navHeight);

      // Enhanced smooth scrolling with easing
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) / 4, 600); // Faster: max 600ms instead of 1000ms
      let startTime: number | null = null;

      function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }

      function animateScroll(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // Animation complete
          setTimeout(() => {
            setIsScrolling(false);
            setIsOpen(false);
          }, 100);
        }
      }

      requestAnimationFrame(animateScroll);
    } else {
      setIsOpen(false);
    }
  }, [isScrolling]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass backdrop-blur-lg' : ''
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-bold text-xl text-gradient cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              AS
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  disabled={isScrolling}
                  className={`hover:text-primary transition-colors relative ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  } ${isScrolling ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden glass rounded-full"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-lg" onClick={() => setIsOpen(false)} />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-sm glass backdrop-blur-lg p-6"
          >
            <div className="flex items-center justify-between mb-8 mt-16">
              <span className="font-bold text-lg text-gradient">Navigation</span>
            </div>

            <div className="space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => scrollToSection(item.id)}
                    disabled={isScrolling}
                    className={`w-full justify-start text-left hover:text-primary transition-colors ${
                      activeSection === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                    } ${isScrolling ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
});