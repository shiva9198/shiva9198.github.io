'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Star } from 'lucide-react';

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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Innovative projects showcasing AI/ML expertise and full-stack development skills
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
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
              className="h-full"
            >
              <Card className="glass border-0 backdrop-blur-lg h-full group hover:animate-glow transition-all duration-300">
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
                      Technologies Used
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
                      <Github className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Code
                    </Button>
                    
                    {project.liveUrl ? (
                      <Button
                        size="sm"
                        className="glass hover:animate-glow transition-all duration-300 flex-1 group"
                        onClick={() => window.open(project.liveUrl!, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Live Demo
                      </Button>
                    ) : project.playgroundDemo && (
                      <Button
                        size="sm"
                        className="glass hover:animate-glow transition-all duration-300 flex-1 group"
                        onClick={() => scrollToPlayground(project.playgroundDemo!)}
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Try It
                      </Button>
                    )}
                  </div>

                  {/* Project indicator line */}
                  <div className="mt-4 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Working projects section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="glass border-0 backdrop-blur-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient-alt">
                  Working Projects
                </h3>
                <p className="text-muted-foreground">
                  Ongoing projects and future developments
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-primary">AI Portfolio Assistant</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Personal AI assistant for portfolio interaction
                  </p>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
                    In Development
                  </div>
                </div>

                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-primary">Advanced RAG System</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Multi-modal retrieval augmented generation
                  </p>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                    Planning
                  </div>
                </div>

                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-primary">Enterprise Mobile Solutions</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Production-ready React Native applications
                  </p>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Active Development
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}