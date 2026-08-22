'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Send, Github, Linkedin, ExternalLink } from 'lucide-react';

export function ContactSection() {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(formData.subject || `Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'text-blue-500',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/shiva9198',
      href: personal.github,
      color: 'text-purple-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Professional Profile',
      href: personal.linkedin,
      color: 'text-blue-600',
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            I work full-time at BuildWithRV and remain available for selected freelance and public collaboration opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gradient-alt">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Reach out for a scoped freelance engagement, an open-source collaboration, or a conversation about production web, mobile, and AI systems.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className="flex items-center p-4 glass border-0 backdrop-blur-lg rounded-lg group hover:animate-glow transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:animate-bounce ${
                    method.color.includes('green') ? 'bg-green-500/20' :
                    method.color.includes('blue') && method.color.includes('600') ? 'bg-blue-600/20' :
                    method.color.includes('blue') ? 'bg-blue-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    <method.icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gradient-alt mb-1">
                      {method.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {method.value}
                    </div>
                  </div>
                  {method.href.startsWith('http') && (
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-0 backdrop-blur-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <span className="font-semibold text-gradient-alt">Location</span>
                  </div>
                  <p className="text-muted-foreground">
                    Hyderabad, Telangana, India
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Available for select remote freelance work
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-0 backdrop-blur-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gradient-alt">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gradient-alt">
                          Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="glass border-0 backdrop-blur-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gradient-alt">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="glass border-0 backdrop-blur-lg"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gradient-alt">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="glass border-0 backdrop-blur-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gradient-alt">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, opportunity, or just say hello..."
                        className="glass border-0 backdrop-blur-lg min-h-[120px] resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!formData.name || !formData.email || !formData.message}
                      className="w-full glass hover:animate-glow transition-all duration-300"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Open Email Draft
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      This opens your email client with the message prefilled; nothing is sent automatically.
                    </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="glass border-0 backdrop-blur-lg max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4 text-gradient-alt">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-muted-foreground mb-6">
                Whether it&apos;s AI/ML innovation, full-stack development, or startup collaboration, 
                let&apos;s create something extraordinary together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="glass">
                  <span className="mr-1">🤖</span>
                  AI/ML Development
                </Badge>
                <Badge variant="outline" className="glass">
                  <span className="mr-1">🌐</span>
                  Full-Stack Projects
                </Badge>
                <Badge variant="outline" className="glass">
                  <span className="mr-1">🚀</span>
                  Startup Collaboration
                </Badge>
                <Badge variant="outline" className="glass">
                  <span className="mr-1">💡</span>
                  Innovation & Research
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
