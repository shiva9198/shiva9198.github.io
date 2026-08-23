'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, Briefcase } from 'lucide-react';

export function ExperienceSection() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">Experience</h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Full-time product engineering, selected freelance work, and applied-AI experience.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.position}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-0">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                        <Building className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gradient-alt">{item.position}</h3>
                        <p className="text-lg text-primary font-semibold">{item.company}</p>
                        <div className="flex items-center text-muted-foreground mt-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.period}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="glass w-fit">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {item.type}
                    </Badge>
                  </div>

                  <ul className="space-y-3 mt-6">
                    {item.description.map((description) => (
                      <li key={description} className="flex items-start text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 shrink-0" />
                        <span>{description}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.technologies.map((technology) => (
                      <Badge key={technology} variant="secondary">{technology}</Badge>
                    ))}
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
