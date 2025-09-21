'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, Briefcase } from 'lucide-react';

export function InternshipSection() {
  const { internships } = portfolioData;

  return (
    <section id="internship" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Real-world experience building cutting-edge AI/ML solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {internships.map((internship, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-0 backdrop-blur-lg mb-8 group hover:animate-glow transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mr-4 group-hover:animate-bounce">
                          <Building className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gradient-alt mb-1">
                            {internship.position}
                          </h3>
                          <p className="text-xl text-primary font-semibold">
                            {internship.company}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        {internship.period}
                      </div>
                    </div>

                    <div className="lg:ml-8 mt-4 lg:mt-0">
                      <Badge variant="outline" className="glass">
                        <Briefcase className="w-3 h-3 mr-1" />
                        Internship
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-gradient-alt">
                      Key Responsibilities & Achievements
                    </h4>
                    <ul className="space-y-3">
                      {internship.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.1 + itemIndex * 0.1 
                          }}
                          viewport={{ once: true }}
                          className="flex items-start text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gradient-alt">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.technologies.map((tech, techIndex) => (
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
                            variant="secondary" 
                            className="glass hover:animate-glow transition-all duration-300"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Experience summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass border-0 backdrop-blur-lg max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient-alt">
                  Experience Summary
                </h3>
                <p className="text-muted-foreground">
                  Hands-on experience with cutting-edge AI/ML technologies in real-world applications
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="text-lg font-bold text-primary mb-1">Graph RAG</div>
                  <div className="text-sm text-muted-foreground">Advanced AI Architecture</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <div className="text-lg font-bold text-primary mb-1">LangChain</div>
                  <div className="text-sm text-muted-foreground">LLM Framework</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🐳</span>
                  </div>
                  <div className="text-lg font-bold text-primary mb-1">Docker</div>
                  <div className="text-sm text-muted-foreground">Containerization</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}