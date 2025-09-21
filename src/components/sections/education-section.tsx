'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export function EducationSection() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Education
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            My academic journey and educational background
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative ml-16 mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-20 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                
                <Card className="glass border-0 backdrop-blur-lg group hover:animate-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gradient-alt mb-2">
                          {item.degree}
                        </h3>
                        {item.major && (
                          <p className="text-primary font-medium mb-2">
                            Major: {item.major}
                          </p>
                        )}
                        <div className="flex items-center text-muted-foreground mb-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          {item.institution}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.period}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:animate-bounce">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'current' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.type === 'current' ? 'In Progress' : 'Completed'}
                      </div>
                      
                      {item.type === 'current' && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                          Currently Pursuing
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional education info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="glass border-0 backdrop-blur-lg max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gradient-alt">
                Academic Focus
              </h3>
              <p className="text-muted-foreground mb-4">
                Currently pursuing B.Tech in Computer Science with specialization in 
                Artificial Intelligence and Machine Learning. My academic journey reflects 
                a strong foundation in computer science fundamentals while diving deep 
                into cutting-edge AI/ML technologies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">3.8+</div>
                  <div className="text-xs text-muted-foreground">Expected GPA</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">2022</div>
                  <div className="text-xs text-muted-foreground">Started</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">2026</div>
                  <div className="text-xs text-muted-foreground">Expected Graduation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}