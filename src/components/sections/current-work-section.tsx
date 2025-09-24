'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, BookOpen, Zap, Calendar, TrendingUp } from 'lucide-react';

export function CurrentWorkSection() {
  const { currentWork } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-emerald-600 hover:bg-emerald-700';
      case 'planning': return 'bg-amber-600 hover:bg-amber-700';
      case 'completed': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-slate-600 hover:bg-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Zap className="w-4 h-4" />;
      case 'planning': return <Clock className="w-4 h-4" />;
      case 'completed': return <Target className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            What I&apos;m Working On
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Currently building innovative projects and expanding my skillset. Here&apos;s what&apos;s keeping me busy and excited about the future.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {new Date(currentWork.lastUpdated).toLocaleDateString()}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Active Projects */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gradient-alt mb-8 flex items-center">
              <Zap className="w-6 h-6 mr-3" />
              Active Projects
            </h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentWork.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(project.status)} text-white border-0`}
                        >
                          <span className="flex items-center">
                            {getStatusIcon(project.status)}
                            <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                          </span>
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-gradient">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                        <span>ETA: {new Date(project.estimatedCompletion).toLocaleDateString()}</span>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gradient-alt">Key Highlights</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="text-xs text-muted-foreground flex items-start">
                              <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning & Goals */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Currently Learning */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gradient-alt mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Currently Learning
              </h3>
              <div className="space-y-4">
                {currentWork.learning.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gradient">{item.topic}</h4>
                          <span className="text-sm text-muted-foreground">{item.progress}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.platform}</p>
                        <Progress value={item.progress} className="h-2 mb-3" />
                        <p className="text-xs text-muted-foreground">
                          <strong>Focus:</strong> {item.focus}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Goals */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gradient-alt mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Current Goals
              </h3>
              <Card className="glass border-border/50">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {currentWork.goals.map((goal, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start text-sm"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{goal}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Status Banner */}
          <motion.div variants={itemVariants}>
            <Card className="glass border-emerald-500/50 bg-emerald-500/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center text-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-lg font-semibold text-gradient">
                      Currently Available for New Opportunities
                    </span>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-center text-muted-foreground mt-2">
                  Open to full-time positions, internships, and exciting project collaborations
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}