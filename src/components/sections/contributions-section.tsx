'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const statusClass: Record<string, string> = {
  Merged: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  Open: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
  Collaborator: 'bg-purple-500/15 text-purple-500 border-purple-500/30',
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Public Contributions</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-3xl mx-auto">
            Authored commits and pull requests with explicit status labels, so open work is never presented as merged.
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
                      <p className="text-sm text-primary font-mono">{contribution.repository}</p>
                      <h3 className="text-xl font-bold text-gradient-alt mt-1">{contribution.title}</h3>
                    </div>
                    <Badge variant="outline" className={statusClass[contribution.status]}>
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
                        Evidence
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
