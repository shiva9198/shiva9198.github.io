'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const statusClass: Record<string, { badge: string; dot: string }> = {
  Merged: { badge: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Open: { badge: 'border-amber-500/40 text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  Collaborator: { badge: 'border-border text-muted-foreground', dot: 'bg-muted-foreground' },
};

export function ContributionsSection() {
  const { contributions } = portfolioData;

  return (
    <section id="contributions" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">Public Contributions</h2>
          <p className="text-muted-foreground mt-6 max-w-3xl mx-auto">
            Selected public work with direct evidence. Status labels distinguish merged changes, open work, and collaborator commits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {contributions.map((contribution, index) => (
            <motion.div
              key={`${contribution.repository}-${contribution.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-border/50 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="code-sm text-sky-700 dark:text-secondary">{contribution.repository}</p>
                      <h3 className="text-xl font-bold text-gradient-alt mt-1">{contribution.title}</h3>
                    </div>
                    <Badge variant="outline" className={statusClass[contribution.status].badge}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusClass[contribution.status].dot}`} />
                      {contribution.status}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {contribution.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 my-5">
                    {contribution.technologies.map((technology) => (
                      <Badge key={technology} variant="secondary">{technology}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted-foreground">{contribution.date}</span>
                    <Button asChild size="sm" variant="outline">
                      <a href={contribution.url} target="_blank" rel="noopener noreferrer">
                        <GitPullRequest className="w-4 h-4 mr-2" />
                        View Evidence
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
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
