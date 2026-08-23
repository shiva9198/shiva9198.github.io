'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { ArrowUp, BrainCircuit, BriefcaseBusiness, Github, Globe2, Heart, Linkedin, Mail, Rocket } from 'lucide-react';

export function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-light dark:gradient-bg-dark opacity-50" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
                        <h3 className="text-xl font-bold text-gradient mb-2">
              SS
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Forward Deployed Engineer at BuildWithRV, building PlaceMe and reliable web, mobile,
              backend, and applied-AI products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gradient-alt mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Contributions', 'Contact'].map((link) => (
                <div key={link}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors p-0 h-auto font-normal"
                  >
                    {link}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-gradient-alt mb-4">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <motion.a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:animate-glow transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:animate-glow transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href={`mailto:${personal.email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:animate-glow transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground mb-4 md:mb-0">
              <span>Built with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
              <span>using Next.js, TypeScript, TailwindCSS & Framer Motion</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                &copy; 2026 Shiva Santosh Reddy Aenugu. All rights reserved.
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="glass rounded-full hover:animate-glow transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="w-3 h-3" />Full-time at BuildWithRV</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><Globe2 className="w-3 h-3" />Select freelance availability</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><Rocket className="w-3 h-3" />Building PlaceMe</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5"><BrainCircuit className="w-3 h-3" />Applied AI &amp; full-stack engineer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
