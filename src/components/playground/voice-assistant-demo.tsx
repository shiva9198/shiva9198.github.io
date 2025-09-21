'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function VoiceAssistantDemo() {
  const messageIdRef = useRef(2); // Start from 2 since we have initial message with id '1'
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. You can ask me to search and summarize web content. Try asking something like "Tell me about artificial intelligence" or "Search for latest tech news".',
      timestamp: new Date('2025-01-01T00:00:00Z'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateId = useCallback(() => {
    return (messageIdRef.current++).toString();
  }, []);

  const simulateResponse = (query: string): string => {
    const responses = {
      'artificial intelligence': 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines. Current AI systems excel at specific tasks like image recognition, natural language processing, and game playing. Recent advances include large language models like GPT and breakthrough applications in healthcare, autonomous vehicles, and scientific research.',
      'machine learning': 'Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. Key types include supervised learning (with labeled data), unsupervised learning (finding patterns), and reinforcement learning (learning through rewards).',
      'tech news': 'Latest tech developments include advances in quantum computing, breakthrough AI models, sustainable technology solutions, and increased focus on cybersecurity. Major companies are investing heavily in AI research, green technology, and next-generation computing infrastructure.',
      'python programming': 'Python is a versatile, high-level programming language known for its simplicity and readability. It\'s widely used in web development, data science, AI/ML, automation, and scientific computing. Popular frameworks include Django, Flask, TensorFlow, and PyTorch.',
      'web development': 'Modern web development involves frontend technologies (React, Vue, Angular), backend frameworks (Node.js, Django, FastAPI), and databases (PostgreSQL, MongoDB). Current trends include serverless architecture, JAMstack, and progressive web applications.',
    };

    const lowerQuery = query.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }

    return `I found some information about "${query}". This is a simulated response for demo purposes. In the actual implementation, I would scrape relevant web content using BeautifulSoup, process it with NLTK for summarization, and provide you with the most relevant and concise information.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botMessage: Message = {
        id: generateId(),
        type: 'bot',
        content: simulateResponse(input),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
          <span className="text-sm text-muted-foreground">AI Assistant Online</span>
        </div>
        <Badge variant="secondary" className="glass">
          Demo Mode
        </Badge>
      </div>

      {/* Chat messages */}
      <Card className="glass border-0 backdrop-blur-lg">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary ml-3' 
                      : 'bg-muted mr-3'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted mr-3">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Searching and analyzing...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Input area */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me to search and summarize any topic..."
          className="glass border-0 backdrop-blur-lg resize-none"
          rows={2}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="glass hover:animate-glow transition-all duration-300 self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        💡 Try asking about: &quot;artificial intelligence&quot;, &quot;machine learning&quot;, &quot;tech news&quot;, &quot;python programming&quot;, &quot;web development&quot;
      </div>
    </div>
  );
}