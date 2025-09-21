'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Calendar, Save, Trash2 } from 'lucide-react';

interface DiaryEntry {
  id: string;
  content: string;
  timestamp: Date;
  mood?: string;
}

export function VirtualDiaryDemo() {
  const entryIdRef = useRef(3); // Start from 3 since we have 2 initial entries
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      content: 'Started working on my portfolio website today. Excited to showcase my AI/ML projects and create an interactive experience for visitors. The glassmorphism design is looking great!',
      timestamp: new Date('2025-01-01T12:00:00Z'),
      mood: '😊',
    },
    {
      id: '2',
      content: 'Had a productive session implementing the Graph RAG architecture at Regality AI. The combination of LangChain, Neo4j, and OpenAI is proving to be very powerful for building intelligent QA systems.',
      timestamp: new Date('2024-12-31T12:00:00Z'),
      mood: '🚀',
    },
  ]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('😊');

  const moods = ['😊', '😎', '🚀', '💭', '📚', '🎯', '⚡', '🌟'];

  const generateId = useCallback(() => {
    return (entryIdRef.current++).toString();
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: DiaryEntry = {
      id: generateId(),
      content: currentEntry.trim(),
      timestamp: new Date(),
      mood: selectedMood,
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry('');
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 text-primary mr-2" />
          <span className="text-lg font-semibold text-gradient-alt">My Virtual Diary</span>
        </div>
        <Badge variant="secondary" className="glass">
          {entries.length} Entries
        </Badge>
      </div>

      {/* New Entry Form */}
      <Card className="glass border-0 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gradient-alt">
                New Entry
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Mood:</span>
                <div className="flex gap-1">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`text-lg p-1 rounded hover:bg-primary/20 transition-colors ${
                        selectedMood === mood ? 'bg-primary/20 ring-1 ring-primary' : ''
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Textarea
              value={currentEntry}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentEntry(e.target.value)}
              placeholder="What's on your mind today? Share your thoughts, experiences, or reflections..."
              className="glass border-0 backdrop-blur-lg min-h-[120px] resize-none"
            />

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {currentEntry.length}/1000 characters
              </div>
              <Button
                onClick={saveEntry}
                disabled={!currentEntry.trim()}
                className="glass hover:animate-glow transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gradient-alt mb-4">
          Recent Entries
        </h3>

        {entries.length === 0 ? (
          <Card className="glass border-0 backdrop-blur-lg">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No entries yet. Start writing your first diary entry!
              </p>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass border-0 backdrop-blur-lg group hover:animate-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.mood}</span>
                      <div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(entry.timestamp)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(entry.timestamp)}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {entry.content}
                  </p>

                  {/* Entry metadata */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{entry.content.length} characters</span>
                      <span>Entry #{entries.length - index}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Features Info */}
      <Card className="glass border-0 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gradient-alt">
              Diary Features
            </h3>
            <p className="text-sm text-muted-foreground">
              Experience the core functionality of my Virtual Diary project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-primary/10">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">📝</span>
              </div>
              <div className="text-sm font-medium text-primary mb-1">Auto-Save</div>
              <div className="text-xs text-muted-foreground">
                Entries are saved with timestamps
              </div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-primary/10">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">😊</span>
              </div>
              <div className="text-sm font-medium text-primary mb-1">Mood Tracking</div>
              <div className="text-xs text-muted-foreground">
                Express your feelings with emojis
              </div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-primary/10">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🔒</span>
              </div>
              <div className="text-sm font-medium text-primary mb-1">Session Storage</div>
              <div className="text-xs text-muted-foreground">
                Data stored temporarily for demo
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            💡 <strong>Real Implementation:</strong> Uses Google Sheets API with OAuth2 for secure cloud storage, 
            automatic sheet creation, and persistent data across sessions.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}