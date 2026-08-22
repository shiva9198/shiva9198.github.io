'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SkillsSection() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Technology Stack
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-3xl mx-auto">
            Technologies evidenced by recent work, public projects, and authored contributions—not self-scored proficiency percentages.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-0 backdrop-blur-lg h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`w-4 h-4 rounded-full ${category.color} mr-3`} />
                    <h3 className="text-xl font-bold text-gradient-alt">{category.title}</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {category.items.map((skill) => (
                      <div key={skill.name} className="rounded-xl border border-border/50 bg-primary/5 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl" aria-hidden="true">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{skill.evidence}</Badge>
                      </div>
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
