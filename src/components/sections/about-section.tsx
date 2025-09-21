'use client';

import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <Card className="glass border-0 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gradient-alt">
                      Professional Journey
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {personal.profile}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">4+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">3+</div>
                      <div className="text-sm text-muted-foreground">Major Projects</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">4</div>
                      <div className="text-sm text-muted-foreground">Certificates</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-2xl font-bold text-primary mb-1">1</div>
                      <div className="text-sm text-muted-foreground">Internship</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">
                      Current Focus
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        AI/ML Research & Development
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        Full-Stack Web Development
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        Graph RAG & LLM Integration
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        Startup Innovation
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2 text-center">
            <div className="relative inline-block w-80 h-80">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/80 dark:border-white/60" />
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full">
                <Avatar className="w-48 h-48 border-4 border-white shadow-2xl">
                  <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white">
                    AS
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-2">Shiva Santosh Reddy Aenugu</h3>
              <p className="text-muted-foreground">{personal.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}