'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  BrainCircuit,
  ExternalLink,
  GitPullRequest,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  Send,
  ServerCog,
} from 'lucide-react';

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
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/shiva9198',
      href: personal.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Professional Profile',
      href: personal.linkedin,
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
          <h2 className="text-2xl md:text-headline-lg mb-4 text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            I&apos;m available for a small number of focused freelance engagements and public collaborations alongside my full-time role.
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
                Start a Conversation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Have a well-scoped product challenge or open-source idea? Send the context, desired outcome, and timeline, and I&apos;ll respond by email.
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
                  className="flex items-center p-4 glass border-0 rounded-lg group hover:animate-glow transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-secondary/15">
                    <method.icon className="w-6 h-6 text-sky-700 dark:text-secondary" />
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
              <Card className="glass border-0">
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
            <Card className="glass border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gradient-alt">
                  Draft an Email
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
                          className="glass border-0"
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
                          className="glass border-0"
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
                        placeholder="Project, role, or collaboration"
                        className="glass border-0"
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
                        placeholder="Share the problem, expected outcome, and timeline..."
                        className="glass border-0 min-h-[120px] resize-none"
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
          <Card className="glass border-0 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4 text-gradient-alt">
                Have a Project in Mind?
              </h3>
              <p className="text-muted-foreground mb-6">
                I can help scope and build applied-AI systems, web and mobile products, backend services, and focused integrations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="glass">
                  <BrainCircuit className="w-3 h-3 mr-2" aria-hidden="true" />
                  Applied AI Systems
                </Badge>
                <Badge variant="outline" className="glass">
                  <MonitorSmartphone className="w-3 h-3 mr-2" aria-hidden="true" />
                  Web &amp; Mobile Products
                </Badge>
                <Badge variant="outline" className="glass">
                  <ServerCog className="w-3 h-3 mr-2" aria-hidden="true" />
                  Backend &amp; Integrations
                </Badge>
                <Badge variant="outline" className="glass">
                  <GitPullRequest className="w-3 h-3 mr-2" aria-hidden="true" />
                  Open-Source Collaboration
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
