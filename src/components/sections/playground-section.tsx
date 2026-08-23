'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BadgeCheck,
  Bot,
  BookOpenText,
  BrainCircuit,
  Clock,
  FlaskConical,
  Grid3X3,
  Info,
  MessageSquareText,
  Sparkles,
} from 'lucide-react';

const featureIcons = {
  assistant: Bot,
  diary: BookOpenText,
  grid: Grid3X3,
  model: BrainCircuit,
  summary: MessageSquareText,
};

type FeatureIconName = keyof typeof featureIcons;

function FeatureGlyph({ name, className }: { name: FeatureIconName; className?: string }) {
  const Icon = featureIcons[name];
  return <Icon className={className} aria-hidden="true" />;
}

const demos = [
  {
    id: 'voice-assistant',
    title: 'Voice-Activated AI Assistant',
    description: 'Concept for turning user prompts and public web content into concise summaries.',
    technologies: ['Python', 'Speech Recognition', 'BeautifulSoup', 'NLTK', 'OpenAI API'],
    icon: 'summary',
    status: 'coming_soon',
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver with OCR',
    description: 'Planned OCR workflow for extracting a Sudoku grid from an image and solving it with backtracking.',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Recursive Backtracking'],
    icon: 'grid',
    status: 'coming_soon',
  },
  {
    id: 'virtual-diary',
    title: 'AI-Powered Virtual Diary',
    description: 'Planned private diary experience with mood classification and entry-level reflections.',
    technologies: ['Python', 'FastAPI', 'NLP', 'Sentiment Analysis'],
    icon: 'diary',
    status: 'coming_soon',
  },
];

const activeFeatures = [
  {
    id: 'portfolio-assistant',
    title: 'AI-Powered Portfolio Assistant',
    description: 'Local prototype for answering questions about my public experience, projects, and technical work.',
    technologies: ['Python', 'FastAPI', 'Natural Language Processing', 'AI/ML'],
    icon: 'assistant',
    status: 'prototype',
  },
  {
    id: 'llm-tuning',
    title: 'LLM Fine-Tuning for Agent Workflows',
    description: 'Local prototype exploring task-specific model adaptation for tool-using and multi-step AI workflows.',
    technologies: ['Large Language Models', 'Fine-tuning', 'Agentic AI', 'Machine Learning'],
    icon: 'model',
    status: 'prototype',
  },
];

export function PlaygroundSection() {
  const [activeDemo, setActiveDemo] = useState<string>('portfolio-assistant');

  const handleDemoSelect = (demoId: string) => {
    setActiveDemo(demoId);
  };

  const allFeatures = [...activeFeatures, ...demos];
  const currentFeature = allFeatures.find(feature => feature.id === activeDemo);

  return (
    <section id="playground" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">
            AI Playground
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            A transparent view of local prototypes and planned concepts. A live link appears only when a hosted demo is available.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Feature selector */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Documented prototypes */}
            {activeFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={`feature-${feature.id}`}
              >
                <Card className={`glass border-0 cursor-pointer transition-all duration-300 ${
                  activeDemo === feature.id ? 'ring-2 ring-primary animate-glow' : 'hover:animate-glow'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                        <FeatureGlyph name={feature.icon as FeatureIconName} className="w-8 h-8 text-primary" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-400 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gradient-alt mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <Badge variant="secondary" className="glass bg-slate-400/20 text-slate-600 dark:text-slate-300 border-slate-400/30 mb-4">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Local Prototype
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant={activeDemo === feature.id ? 'default' : 'outline'}
                      className="glass hover:animate-glow transition-all duration-300 group w-full"
                      onClick={() => handleDemoSelect(feature.id)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Coming Soon Features */}
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (activeFeatures.length + index) * 0.1 }}
                viewport={{ once: true }}
                id={`demo-${demo.id}`}
              >
                <Card className={`glass border-0 cursor-pointer transition-all duration-300 opacity-80 ${
                  activeDemo === demo.id ? 'ring-2 ring-primary/50 animate-glow' : 'hover:animate-glow'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                        <FeatureGlyph name={demo.icon as FeatureIconName} className="w-8 h-8 text-primary/60" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full animate-pulse">
                          <Clock className="w-2 h-2 text-white absolute top-1 left-1" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gradient-alt mb-2 opacity-80">
                        {demo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 opacity-70">
                        {demo.description}
                      </p>
                      <Badge variant="secondary" className="glass bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 mb-4">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant={activeDemo === demo.id ? 'default' : 'outline'}
                      className="glass hover:animate-glow transition-all duration-300 group w-full opacity-70"
                      onClick={() => handleDemoSelect(demo.id)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Active feature/demo display */}
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Card className="glass border-0">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {currentFeature && (
                        <FeatureGlyph
                          name={currentFeature.icon as FeatureIconName}
                          className="w-8 h-8 mr-4 text-primary"
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold text-gradient-alt">
                          {currentFeature?.title}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          {currentFeature?.status === 'prototype' ? (
                            <Badge variant="secondary" className="glass bg-slate-400/20 text-slate-600 dark:text-slate-300 border-slate-400/30">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Local Prototype
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="glass bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                              <Clock className="w-3 h-3 mr-1" />
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gradient-alt">
                        Description
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentFeature?.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gradient-alt">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentFeature?.technologies.map((tech) => (
                          <Badge 
                            key={tech}
                            variant="secondary" 
                            className="glass hover:animate-glow transition-all duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {currentFeature?.status === 'prototype' ? (
                      <div className="bg-slate-400/10 p-4 rounded-lg border border-slate-400/20">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          <strong>Local prototype:</strong> The implementation direction is documented here; no continuously hosted backend is claimed.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          <strong>Planned concept:</strong> This is not yet a public demo. Its status will be updated when a usable version is available.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Playground features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-0">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gradient-alt">
                    Playground Features
                  </h3>
                  <p className="text-muted-foreground">
                    Status labels separate local implementations from planned work and evidence-linked public projects.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg bg-slate-400/10 border border-slate-400/20">
                    <div className="w-12 h-12 bg-slate-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FlaskConical className="w-6 h-6 text-slate-600 dark:text-slate-300" aria-hidden="true" />
                    </div>
                    <div className="font-semibold text-slate-600 dark:text-slate-300 mb-1">Local Prototypes</div>
                    <div className="text-sm text-muted-foreground">Implementation direction without uptime claims</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                    </div>
                    <div className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Planned Concepts</div>
                    <div className="text-sm text-muted-foreground">Ideas that are not presented as public demos</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BadgeCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    </div>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Evidence-Linked Work</div>
                    <div className="text-sm text-muted-foreground">Public project and contribution claims link to source evidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
