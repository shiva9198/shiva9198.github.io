'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import type { Components } from 'react-markdown';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';

interface ReadmeModalProps {
  readmeUrl: string;
  projectTitle: string;
  trigger?: React.ReactNode;
}

export function ReadmeModal({ readmeUrl, projectTitle, trigger }: ReadmeModalProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchReadme = async () => {
    if (content) return; // Already loaded
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(readmeUrl);
      if (!response.ok) {
        throw new Error(`Failed to load README: ${response.status}`);
      }
      const text = await response.text();
      setContent(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load README');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchReadme();
    }
  };

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  // Render mermaid diagrams after content loads
  useEffect(() => {
    if (content && isOpen) {
      setTimeout(() => {
        mermaid.contentLoaded();
      }, 100);
    }
  }, [content, isOpen]);

  // Custom component for code blocks to handle mermaid
  const components: Components = {
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const isInline = !className; // inline code typically doesn't have className
      
      if (language === 'mermaid') {
        return (
          <div className="mermaid bg-white p-4 rounded border my-4">
            {String(children).replace(/\n$/, '')}
          </div>
        );
      }
      
      return isInline ? (
        <code className="bg-muted px-1 py-0.5 rounded text-sm">
          {children}
        </code>
      ) : (
        <pre className="bg-muted p-4 rounded overflow-x-auto my-4">
          <code className={className}>
            {children}
          </code>
        </pre>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            size="sm"
            variant="outline"
            className="glass hover:animate-glow transition-all duration-300 flex-1 group"
          >
            <FileText className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            README
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col glass backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-gradient-alt">
            {projectTitle} - README
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-muted-foreground">Loading README...</span>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center h-32 text-destructive">
              <p>Error: {error}</p>
            </div>
          )}
          
          {content && (
            <div className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6 prose-h1:text-gradient-alt
              prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:text-gradient-alt prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-primary
              prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-3 prose-h4:text-foreground
              prose-p:text-muted-foreground prose-p:leading-7 prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-foreground prose-em:italic
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:my-1 prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-code:bg-muted prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-4 prose-pre:overflow-x-auto
              prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-4
              prose-hr:border-border prose-hr:my-8
              prose-table:w-full prose-table:my-4 prose-table:border-collapse
              prose-thead:border-b prose-thead:border-border
              prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-th:border prose-th:border-border
              prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-border prose-td:text-muted-foreground
              prose-tr:border-b prose-tr:border-border
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-4 prose-img:mx-auto
              prose-a:text-primary prose-a:underline prose-a:decoration-primary/30 hover:prose-a:text-primary/80 hover:prose-a:decoration-primary/60 prose-a:transition-colors
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}