'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export function EducationSection() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Education
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            My academic journey and educational background
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Enhanced Timeline */}
          <div className="relative">
            {/* Main Timeline line with gradient and glow */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary/20 rounded-full shadow-lg" />
            
            {/* Timeline background glow for dark theme */}
            <div className="absolute left-7 top-0 bottom-0 w-3 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent rounded-full blur-sm dark:block hidden" />

            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative ml-20 mb-16 last:mb-8"
              >
                {/* Enhanced Timeline checkpoint */}
                <div className="absolute -left-24 top-8 flex items-center justify-center">
                  {/* Outer glow ring */}
                  <div className={`absolute w-8 h-8 rounded-full animate-pulse ${
                    item.type === 'current' 
                      ? 'bg-green-500/30 dark:bg-green-400/20' 
                      : 'bg-primary/30 dark:bg-primary/20'
                  }`} />
                  
                  {/* Main checkpoint circle */}
                  <div className={`relative w-6 h-6 rounded-full border-4 border-background shadow-xl z-10 ${
                    item.type === 'current' 
                      ? 'bg-gradient-to-br from-green-400 to-green-600' 
                      : 'bg-gradient-to-br from-primary to-primary/80'
                  }`}>
                    {/* Inner glow dot */}
                    <div className={`absolute inset-1 rounded-full ${
                      item.type === 'current'
                        ? 'bg-green-200 dark:bg-green-300'
                        : 'bg-primary-foreground dark:bg-white'
                    } opacity-80`} />
                  </div>
                  
                  {/* Progress indicator for current education */}
                  {item.type === 'current' && (
                    <div className="absolute -inset-2 rounded-full border-2 border-green-400/50 animate-spin-slow">
                      <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1" />
                    </div>
                  )}
                </div>

                {/* Enhanced Connection line to card */}
                <div className="absolute -left-16 top-9 w-12 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20" />
                
                <Card className="glass border-glow backdrop-blur-lg group hover:card-hover transition-all duration-500 relative overflow-hidden">
                  {/* Card background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-2xl font-bold text-gradient-alt mr-3">
                            {item.degree}
                          </h3>
                          {item.type === 'current' && (
                            <div className="px-2 py-1 rounded-full bg-green-500/20 dark:bg-green-400/20 border border-green-500/30">
                              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                            </div>
                          )}
                        </div>
                        
                        {item.major && (
                          <div className="mb-4 p-3 rounded-lg bg-primary/10 dark:bg-primary/5 border-l-4 border-primary">
                            <p className="text-primary font-semibold text-lg">
                              📚 Major: {item.major}
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium">{item.institution}</span>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <Calendar className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium">{item.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center group-hover:animate-floating-orb mb-3 shadow-lg">
                          <GraduationCap className="w-8 h-8 text-primary group-hover:text-enhanced-glow transition-all duration-300" />
                        </div>
                        
                        {/* Achievement indicator */}
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Achievement</div>
                          <div className="flex space-x-1">
                            {[...Array(item.type === 'current' ? 3 : 5)].map((_, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full ${
                                item.type === 'current'
                                  ? 'bg-green-400/60'
                                  : 'bg-primary/60'
                              }`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Status indicator */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 ${
                        item.type === 'current' 
                          ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-600 dark:text-green-400 border border-green-500/30' 
                          : 'bg-gradient-to-r from-blue-500/20 to-primary/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          item.type === 'current' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                        }`} />
                        <span>{item.type === 'current' ? 'In Progress' : 'Completed'}</span>
                      </div>
                      
                      {item.type === 'current' && (
                        <div className="flex items-center text-sm text-muted-foreground space-x-2">
                          <span>Currently Pursuing</span>
                          <div className="flex space-x-1">
                            <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Academic focus section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="glass border-glow backdrop-blur-lg max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
            
            <CardContent className="p-8 relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 text-gradient-alt flex items-center justify-center space-x-3">
                  <span>🎓</span>
                  <span>Academic Excellence</span>
                  <span>✨</span>
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full mb-6" />
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                  Currently pursuing B.Tech in Computer Science with specialization in 
                  <span className="text-primary font-semibold"> Artificial Intelligence and Machine Learning</span>. 
                  My academic journey reflects a strong foundation in computer science fundamentals while diving deep 
                  into cutting-edge AI/ML technologies and practical applications.
                </p>
              </div>
              
              {/* Enhanced stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div 
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl font-bold text-gradient mb-2 group-hover:text-enhanced-glow transition-all duration-300">3.8+</div>
                  <div className="text-sm text-muted-foreground mb-1">Expected CGPA</div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "76%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-enhanced-glow transition-all duration-300">2022</div>
                  <div className="text-sm text-muted-foreground mb-1">Journey Started</div>
                  <div className="flex justify-center space-x-1 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.7 }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:text-enhanced-glow transition-all duration-300">2026</div>
                  <div className="text-sm text-muted-foreground mb-1">Expected Graduation</div>
                  <div className="flex justify-center">
                    <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium border border-purple-500/30">
                      🎯 Future Ready
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Academic highlights */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="text-xl font-semibold text-center mb-6 text-gradient-alt">Key Academic Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "🤖", title: "AI/ML Specialization", desc: "Deep Learning, Neural Networks, Computer Vision" },
                    { icon: "💻", title: "Programming Excellence", desc: "Python, Java, JavaScript, React, Node.js" },
                    { icon: "📊", title: "Data Science", desc: "Data Analysis, Statistics, Machine Learning Algorithms" },
                    { icon: "🔬", title: "Research Focus", desc: "Academic projects, Innovation, Problem-solving" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}