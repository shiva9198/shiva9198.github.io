'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { CurrentWorkSection } from '@/components/sections/current-work-section';
import { EducationSection } from '@/components/sections/education-section';
import { CertificatesSection } from '@/components/sections/certificates-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContributionsSection } from '@/components/sections/contributions-section';
import { PlaygroundSection } from '@/components/sections/playground-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen text-foreground">
      <Navigation />
      
      <main className="relative">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <AboutSection />
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <SkillsSection />
        </section>

        {/* Current Work Section */}
        <section id="current-work" className="py-20">
          <CurrentWorkSection />
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <EducationSection />
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-20">
          <CertificatesSection />
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <ExperienceSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <ProjectsSection />
        </section>

        {/* Public Contributions Section */}
        <section id="contributions" className="py-20">
          <ContributionsSection />
        </section>

        {/* AI Playground Section */}
        <section id="playground" className="py-20">
          <PlaygroundSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
