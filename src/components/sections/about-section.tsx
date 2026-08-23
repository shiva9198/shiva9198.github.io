'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { value: 'FDE', label: 'BuildWithRV', title: 'Forward Deployed Engineer' },
  { value: '4', label: 'Featured Public Projects' },
  { value: '8', label: 'Merged External PRs' },
  { value: 'Apr 2026', label: 'B.Tech Completed' },
];

export function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">About</h2>
          <div className="mt-4 h-px w-16 bg-primary" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="glass h-full border-0">
              <CardContent className="flex h-full flex-col gap-8 p-8">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">How I Work</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {personal.profile}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                    Current Focus
                  </h4>
                  <ul className="space-y-2.5 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Production web, mobile, and backend engineering
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Applied AI, retrieval, and voice systems
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Building PlaceMe at placeme.study
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Selected freelance engagements
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-rows-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="glass h-full border-0">
                  <CardContent className="flex h-full flex-col justify-center p-6">
                    <div className="text-2xl font-semibold text-primary">{stat.value}</div>
                    {stat.title && (
                      <div className="mt-1 text-sm font-medium text-foreground">{stat.title}</div>
                    )}
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
