'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Play, Loader2 } from 'lucide-react';
import { VoiceAssistantDemo } from '../playground/voice-assistant-demo';
import { SudokuSolverDemo } from '../playground/sudoku-solver-demo';
import { VirtualDiaryDemo } from '../playground/virtual-diary-demo';

const demos = [
  {
    id: 'voice-assistant',
    title: 'Voice-Activated AI Assistant',
    description: 'Interactive chatbox where users type commands, system fetches and summarizes web content using AI.',
    technologies: ['Python', 'Speech Recognition', 'BeautifulSoup', 'NLTK', 'OpenAI API'],
    icon: '🎤',
    component: VoiceAssistantDemo,
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver',
    description: 'Interactive 9x9 grid where users enter puzzles and the solver displays the solution instantly.',
    technologies: ['Python', 'Recursive Backtracking', 'Algorithm Optimization'],
    icon: '🧩',
    component: SudokuSolverDemo,
  },
  {
    id: 'virtual-diary',
    title: 'Virtual Diary',
    description: 'Text entry interface for diary logging with temporary session storage and dynamic updates.',
    technologies: ['Python', 'Streamlit', 'Google Sheets API', 'OAuth2'],
    icon: '📝',
    component: VirtualDiaryDemo,
  },
];

export function PlaygroundSection() {
  const [activeDemo, setActiveDemo] = useState<string>('voice-assistant');
  const [mode, setMode] = useState<'info' | 'try'>('info');

  const handleDemoSelect = (demoId: string) => {
    setActiveDemo(demoId);
    setMode('info'); // Reset to info when switching demos
  };

  const handleModeToggle = (newMode: 'info' | 'try') => {
    setMode(newMode);
  };

  const currentDemo = demos.find(demo => demo.id === activeDemo);
  const ActiveComponent = currentDemo?.component;

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
            Interactive demos where you can test and experience my projects live
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Demo selector */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={`demo-${demo.id}`}
              >
                <Card className={`glass border-0 backdrop-blur-lg cursor-pointer transition-all duration-300 ${
                  activeDemo === demo.id ? 'ring-2 ring-primary animate-glow' : 'hover:animate-glow'
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">{demo.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gradient-alt mb-2">
                        {demo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {demo.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant={mode === 'info' && activeDemo === demo.id ? 'default' : 'outline'}
                        className="glass hover:animate-glow transition-all duration-300 group"
                        onClick={() => {
                          handleDemoSelect(demo.id);
                          handleModeToggle('info');
                        }}
                      >
                        <Info className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Info
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={mode === 'try' && activeDemo === demo.id ? 'default' : 'outline'}
                        className="glass hover:animate-glow transition-all duration-300 group"
                        onClick={() => {
                          handleDemoSelect(demo.id);
                          handleModeToggle('try');
                        }}
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Try It
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Active demo display */}
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
                        {demos.find(d => d.id === activeDemo)?.icon}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-gradient-alt">
                          {demos.find(d => d.id === activeDemo)?.title}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant={mode === 'info' ? 'default' : 'outline'}
                            onClick={() => setMode('info')}
                            className="glass"
                          >
                            <Info className="w-4 h-4 mr-2" />
                            Info
                          </Button>
                          <Button
                            size="sm"
                            variant={mode === 'try' ? 'default' : 'outline'}
                            onClick={() => setMode('try')}
                            className="glass"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Try It
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveDemo('voice-assistant')}
                      className="glass"
                    >
                      ✕
                    </Button>
                  </div>

                  {mode === 'info' ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gradient-alt">
                          Description
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {demos.find(d => d.id === activeDemo)?.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gradient-alt">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {demos.find(d => d.id === activeDemo)?.technologies.map((tech) => (
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

                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          💡 <strong>Note:</strong> This is a simulated demo for portfolio purposes. 
                          The actual implementation would connect to backend APIs for full functionality.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[400px]">
                      {ActiveComponent ? (
                        <ActiveComponent />
                      ) : (
                        <div className="flex items-center justify-center h-64">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                      )}
                    </div>
                  )}
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
                    Interactive experiences showcasing real project capabilities
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="font-semibold text-primary mb-1">Real-time Processing</div>
                    <div className="text-sm text-muted-foreground">Instant results and feedback</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div className="font-semibold text-primary mb-1">Secure & Private</div>
                    <div className="text-sm text-muted-foreground">No data stored permanently</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <div className="font-semibold text-primary mb-1">Interactive</div>
                    <div className="text-sm text-muted-foreground">Try all features hands-on</div>
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