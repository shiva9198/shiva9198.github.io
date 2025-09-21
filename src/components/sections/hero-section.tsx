'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { Download, Rocket, Zap } from 'lucide-react';

export function HeroSection() {
  const { personal } = portfolioData;

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Shiva_santosh_Resume.pdf';
    link.download = 'Shiva_Santosh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => {
          // Use deterministic positions based on index
          const left = (i * 7.3) % 100; // Pseudo-random distribution
          const top = (i * 13.7 + 23) % 100;
          const duration = 3 + (i % 3);
          const delay = (i * 0.1) % 2;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              {personal.name}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 font-light text-foreground">
              {personal.tagline}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto text-muted-foreground"
          >
            {personal.profile}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleDownloadResume}
              size="lg"
              className="glass hover:animate-glow transition-all duration-300 group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </Button>
            
            <Button
              onClick={() => scrollToSection('projects')}
              variant="outline"
              size="lg"
              className="glass hover:animate-glow transition-all duration-300 group"
            >
              <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Explore Projects
            </Button>
            
            <Button
              onClick={() => scrollToSection('playground')}
              variant="outline"
              size="lg"
              className="glass hover:animate-glow transition-all duration-300 group"
            >
              <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Try Playground
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-primary rounded-full mx-auto relative">
                <div className="w-1 h-3 bg-primary rounded-full mx-auto mt-2 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}