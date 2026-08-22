'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Target, Zap } from 'lucide-react';

export function CurrentWorkSection() {
  const { currentWork } = portfolioData;

  return (
    <section id="current-work" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Current Focus</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A public-safe view of current engineering work. Private project identities and client details remain confidential.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            Evidence refreshed: {new Date(`${currentWork.lastUpdated}T00:00:00`).toLocaleDateString()}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentWork.focus.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-border/50 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <CardTitle className="text-gradient-alt">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((technology) => (
                      <Badge key={technology} variant="secondary">{technology}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gradient-alt mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Areas I&apos;m Deepening
              </h3>
              <div className="space-y-5">
                {currentWork.learning.map((item) => (
                  <div key={item.topic}>
                    <h4 className="font-semibold">{item.topic}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.focus}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gradient-alt mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Current Goals
              </h3>
              <ul className="space-y-3">
                {currentWork.goals.map((goal) => (
                  <li key={goal} className="flex items-start text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-emerald-500/50 bg-emerald-500/10 max-w-4xl mx-auto mt-12">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 text-lg font-semibold">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              Full-time at BuildWithRV · Available for select freelance work
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
