'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, BrainCircuit, Calendar, Code2, Database, ExternalLink, RefreshCw } from 'lucide-react';

const certificateIcons = {
  brain: BrainCircuit,
  code: Code2,
  database: Database,
  refresh: RefreshCw,
};

export function CertificatesSection() {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">
            Certifications
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certificates.map((cert, index) => {
            const CertificateIcon = certificateIcons[cert.icon as keyof typeof certificateIcons] ?? Award;

            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
              <Card className="glass border-0 h-full cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                          <CertificateIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gradient-alt mb-1">
                            {cert.name}
                          </h3>
                          <p className="text-primary font-medium">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        Issued in {cert.date}
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          Verified Certificate
                        </Badge>
                        
                        <div className="flex items-center text-xs text-primary hover:text-primary/80 transition-colors">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-1 rounded-full bg-primary/20">
                    <div className="h-full w-full rounded-full bg-primary/60" />
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass border-0 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient-alt">
                  Certification Highlights
                </h3>
                <p className="text-muted-foreground">
                  Continuous learning and skill validation through industry-recognized certifications
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{certificates.length}</div>
                  <div className="text-sm text-muted-foreground">Total Certificates</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Code2 className="w-7 h-7 text-secondary" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-bold text-secondary mb-1">2</div>
                  <div className="text-sm text-muted-foreground">Kaggle Certs</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Database className="w-7 h-7 text-emerald-500" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-500 mb-1">1</div>
                  <div className="text-sm text-muted-foreground">HackerRank</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="w-7 h-7 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">1</div>
                  <div className="text-sm text-muted-foreground">Agile/Scrum</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
