'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { ArrowDown, ExternalLink, GitPullRequest, Rocket } from 'lucide-react';

export function HeroSection() {
  const { personal } = portfolioData;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
      {/* Quiet radial field instead of 50 floating particles */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(147, 129, 255, 0.14), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container relative z-10 mx-auto px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {personal.employment} · {personal.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            {personal.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-2xl text-xl font-normal text-primary sm:text-2xl"
          >
            {personal.tagline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {personal.profile}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button onClick={() => scrollToSection('projects')} size="lg" className="group">
              <Rocket className="mr-2 h-4 w-4" />
              View Projects
            </Button>

            <Button
              onClick={() => scrollToSection('contributions')}
              variant="outline"
              size="lg"
            >
              <GitPullRequest className="mr-2 h-4 w-4" />
              Public Contributions
            </Button>

            <Button
              onClick={() => window.open('https://placeme.study', '_blank', 'noopener,noreferrer')}
              variant="ghost"
              size="lg"
              className="text-muted-foreground"
            >
              Visit PlaceMe
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to About section"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-muted-foreground/60 transition-colors hover:text-primary"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
