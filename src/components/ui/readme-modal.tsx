'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
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
  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (language === 'mermaid') {
      return (
        <div className="mermaid bg-white p-4 rounded border my-4">
          {String(children).replace(/\n$/, '')}
        </div>
      );
    }
    
    return !inline ? (
      <pre className="bg-muted p-4 rounded overflow-x-auto my-4">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    ) : (
      <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
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
              prose-headings:text-gradient-alt
              prose-p:text-muted-foreground
              prose-strong:text-foreground
              prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border
              prose-blockquote:border-l-primary prose-blockquote:border-l-4
              prose-table:text-sm
              prose-th:bg-muted
              prose-td:border prose-th:border
              prose-img:rounded-lg prose-img:shadow-md
              prose-a:text-primary hover:prose-a:text-primary/80
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock
                }}
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