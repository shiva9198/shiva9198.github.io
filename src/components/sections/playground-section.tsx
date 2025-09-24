'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Clock, Sparkles } from 'lucide-react';

const demos = [
  {
    id: 'voice-assistant',
    title: 'Voice-Activated AI Assistant',
    description: 'Interactive chatbox where users type commands, system fetches and summarizes web content using AI.',
    technologies: ['Python', 'Speech Recognition', 'BeautifulSoup', 'NLTK', 'OpenAI API'],
    icon: '🧩',
    status: 'coming_soon',
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver with OCR',
    description: 'Interactive 9x9 grid with image upload OCR support for extracting puzzles from photos.',
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'Recursive Backtracking'],
    icon: '🧩',
    status: 'coming_soon',
  },
  {
    id: 'virtual-diary',
    title: 'AI-Powered Virtual Diary',
    description: 'Smart diary with AI mood analysis and personalized insights for your entries.',
    technologies: ['Python', 'FastAPI', 'NLP', 'Sentiment Analysis'],
    icon: '📝',
    status: 'coming_soon',
  },
];

const activeFeatures = [
  {
    id: 'portfolio-assistant',
    title: 'AI-Powered Portfolio Assistant',
    description: 'Interactive AI assistant that helps navigate and understand my portfolio, projects, and expertise.',
    technologies: ['Python', 'FastAPI', 'Natural Language Processing', 'AI/ML'],
    icon: '🤖',
    status: 'active',
  },
  {
    id: 'llm-tuning',
    title: 'Fine Tuning of LLM for Agentic AI',
    description: 'Advanced LLM fine-tuning service for creating intelligent agentic AI solutions tailored to specific tasks.',
    technologies: ['Large Language Models', 'Fine-tuning', 'Agentic AI', 'Machine Learning'],
    icon: '🧠',
    status: 'active',
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            AI Playground
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Experience my AI projects - active features available now, with more exciting demos coming soon!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Feature selector */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Active Features */}
            {activeFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={`feature-${feature.id}`}
              >
                <Card className={`glass border-0 backdrop-blur-lg cursor-pointer transition-all duration-300 ${
                  activeDemo === feature.id ? 'ring-2 ring-primary animate-glow' : 'hover:animate-glow'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                        <span className="text-3xl">{feature.icon}</span>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gradient-alt mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <Badge variant="secondary" className="glass bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant={activeDemo === feature.id ? 'default' : 'outline'}
                      className="glass hover:animate-glow transition-all duration-300 group w-full"
                      onClick={() => handleDemoSelect(feature.id)}
                    >
                      <Info className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Learn More
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
                <Card className={`glass border-0 backdrop-blur-lg cursor-pointer transition-all duration-300 opacity-80 ${
                  activeDemo === demo.id ? 'ring-2 ring-primary/50 animate-glow' : 'hover:animate-glow'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                        <span className="text-3xl opacity-60">{demo.icon}</span>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse">
                          <Clock className="w-2 h-2 text-white absolute top-1 left-1" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gradient-alt mb-2 opacity-80">
                        {demo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 opacity-70">
                        {demo.description}
                      </p>
                      <Badge variant="secondary" className="glass bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
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
                      <Info className="w-4 h-4 mr-2 group-hover:animate-bounce" />
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
              <Card className="glass border-0 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">
                        {currentFeature?.icon}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-gradient-alt">
                          {currentFeature?.title}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          {currentFeature?.status === 'active' ? (
                            <Badge variant="secondary" className="glass bg-green-500/20 text-green-400 border-green-500/30">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Active Now
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="glass bg-orange-500/20 text-orange-400 border-orange-500/30">
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

                    {currentFeature?.status === 'active' ? (
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <p className="text-sm text-green-300">
                          ✅ <strong>Live & Ready:</strong> This feature is currently active and available! 
                          The backend API is running and ready to serve requests.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                        <p className="text-sm text-orange-300">
                          ⏳ <strong>Coming Soon:</strong> This exciting feature is under development and will be available soon. 
                          I&apos;m working hard to bring you amazing AI-powered experiences!
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
            <Card className="glass border-0 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gradient-alt">
                    Playground Features
                  </h3>
                  <p className="text-muted-foreground">
                    Explore my AI projects and capabilities
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🟢</span>
                    </div>
                    <div className="font-semibold text-green-400 mb-1">Live Features</div>
                    <div className="text-sm text-muted-foreground">Currently active and available</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <div className="font-semibold text-orange-400 mb-1">In Development</div>
                    <div className="text-sm text-muted-foreground">Coming soon with full functionality</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div className="font-semibold text-primary mb-1">Production Ready</div>
                    <div className="text-sm text-muted-foreground">Real backend APIs with AI/ML capabilities</div>
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
