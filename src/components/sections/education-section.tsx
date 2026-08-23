'use client';

import { motion } from 'framer-motion';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function EducationSection() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">Education</h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            B.Tech in Computer Science (AI & ML), completed in April 2026.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={`${item.degree}-${item.institution}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-border/50">
                <CardContent className="p-7 flex flex-col md:flex-row md:items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gradient-alt">{item.degree}</h3>
                    {item.major && <p className="text-primary font-medium mt-1">{item.major}</p>}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-muted-foreground mt-3">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{item.institution}</span>
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{item.period}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-emerald-500 border-emerald-500/30">Completed</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
