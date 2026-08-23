'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Star } from 'lucide-react';

interface PublicProject {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
  playgroundDemo: string | null;
}

export function ProjectsSection() {
  const { projects } = portfolioData;

  const scrollToPlayground = (demo: string) => {
    const element = document.getElementById('playground');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Set active demo in playground (this would be handled by playground component)
      setTimeout(() => {
        const demoElement = document.getElementById(`demo-${demo}`);
        if (demoElement) {
          demoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Public projects selected for engineering depth, clear documentation, and relevance to my current work.
          </p>
        </motion.div>

        <div className="bento-grid max-w-7xl mx-auto">
          {projects.map((project: PublicProject, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`h-full ${project.featured ? 'bento-item-large' : ''}`}
            >
              <Card className="glass border-0 h-full group hover:animate-glow transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Project header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {project.featured && (
                        <div className="flex items-center mb-2">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gradient-alt mb-2">
                        {project.title}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-3">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Project description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-gradient-alt">
                      Core Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1 + techIndex * 0.05,
                            type: "spring",
                            stiffness: 200
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge 
                            variant="outline" 
                            className="text-xs glass hover:animate-glow transition-all duration-300"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs glass">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass hover:animate-glow transition-all duration-300 flex-1 group"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    
                    {project.liveUrl ? (
                      <Button
                        size="sm"
                        className="glass hover:animate-glow transition-all duration-300 flex-1 group"
                        onClick={() => window.open(project.liveUrl!, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    ) : project.playgroundDemo && (
                      <Button
                        size="sm"
                        className="glass hover:animate-glow transition-all duration-300 flex-1 group"
                        onClick={() => scrollToPlayground(project.playgroundDemo!)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Prototype
                      </Button>
                    )}
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
