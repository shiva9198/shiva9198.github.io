'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Star, GitFork, Clock } from 'lucide-react';

const workingProjects = [
  {
    id: 'portfolio-ai',
    title: 'AI-Powered Portfolio',
    description: 'This very portfolio featuring interactive AI demos, glassmorphism design, and real-time project showcases.',
    technologies: ['Next.js 14', 'TypeScript', 'Framer Motion', 'FastAPI', 'AI Integration'],
    githubUrl: 'https://github.com/shiva9198/portfolio',
    liveUrl: 'https://shiva-portfolio.vercel.app',
    status: 'Active Development',
    lastUpdated: '2025-09-20',
    stars: 12,
    forks: 3
  },
  {
    id: 'cognee-prototype',
    title: 'Cognee - Graph RAG Assistant',
    description: 'Enterprise AI assistant built during Regality AI internship using LangChain, Neo4j, and advanced retrieval systems.',
    technologies: ['LangChain', 'Neo4j', 'OpenAI', 'Docker', 'Graph RAG'],
    githubUrl: 'https://github.com/shiva9198/cognee-prototype',
    liveUrl: null,
    status: 'Production Ready',
    lastUpdated: '2025-07-15',
    stars: 8,
    forks: 2
  },
  {
    id: 'ml-algorithms',
    title: 'ML Algorithms Library',
    description: 'Comprehensive collection of machine learning algorithms implemented from scratch for educational purposes.',
    technologies: ['Python', 'NumPy', 'Scikit-learn', 'Jupyter', 'Data Science'],
    githubUrl: 'https://github.com/shiva9198/ml-algorithms',
    liveUrl: null,
    status: 'Continuous Updates',
    lastUpdated: '2025-09-10',
    stars: 15,
    forks: 7
  }
];

export function WorkingProjectsSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active Development': return 'bg-green-500/20 text-green-400';
      case 'Production Ready': return 'bg-blue-500/20 text-blue-400';
      case 'Continuous Updates': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <section id="working-projects" className="py-20 bg-gradient-modern">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Working Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dynamic showcase of ongoing work and recent developments. 
            These projects represent my latest innovations and continuous learning journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {workingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass hover-glow h-full transition-all duration-300 group">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {project.forks}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gradient-alt group-hover:animate-glow">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs glass">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs glass">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Clock className="w-3 h-3" />
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass hover-glow flex-1 group"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Code
                    </Button>
                    
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="glass hover-glow flex-1 group"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Live
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            🚀 More projects coming soon! Follow my GitHub for the latest updates.
          </p>
          <Button
            onClick={() => window.open('https://github.com/shiva9198', '_blank')}
            className="glass hover-glow group"
          >
            <Github className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            View All Repositories
          </Button>
        </motion.div>
      </div>
    </section>
  );
}