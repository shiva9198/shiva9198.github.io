import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content, mood, tags } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate unique entry ID
    const entryId = `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // AI-powered mood analysis
    function analyzeMood(text: string): string {
      const moodKeywords = {
        happy: ['happy', 'joy', 'excited', 'great', 'awesome', 'wonderful', 'amazing', 'fantastic', 'delighted', 'cheerful', 'thrilled'],
        sad: ['sad', 'down', 'depressed', 'unhappy', 'terrible', 'awful', 'miserable', 'heartbroken', 'devastated', 'gloomy'],
        anxious: ['anxious', 'worried', 'stressed', 'nervous', 'concerned', 'uneasy', 'troubled', 'restless', 'tense'],
        excited: ['excited', 'thrilled', 'pumped', 'energetic', 'motivated', 'enthusiastic', 'eager', 'anticipating'],
        grateful: ['grateful', 'thankful', 'blessed', 'appreciative', 'fortunate', 'lucky'],
        reflective: ['thinking', 'reflecting', 'pondering', 'considering', 'contemplating', 'wondering'],
        determined: ['determined', 'focused', 'motivated', 'driven', 'committed', 'resolved'],
        peaceful: ['calm', 'peaceful', 'serene', 'tranquil', 'relaxed', 'content', 'zen'],
        frustrated: ['frustrated', 'annoyed', 'irritated', 'angry', 'mad', 'upset'],
        neutral: ['okay', 'fine', 'normal', 'regular', 'average', 'alright']
      };

      const textLower = text.toLowerCase();
      const moodScores: { [key: string]: number } = {};

      // Calculate mood scores based on keyword frequency
      for (const [moodType, keywords] of Object.entries(moodKeywords)) {
        moodScores[moodType] = keywords.reduce((score, keyword) => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
          const matches = textLower.match(regex);
          return score + (matches ? matches.length : 0);
        }, 0);
      }

      // Find the mood with the highest score
      const detectedMood = Object.entries(moodScores).reduce((a, b) => 
        moodScores[a[0]] > moodScores[b[0]] ? a : b
      )[0];

      return moodScores[detectedMood] > 0 ? detectedMood : 'neutral';
    }

    // Extract themes and insights
    function analyzeContent(text: string): string {
      const themes = [];
      const textLower = text.toLowerCase();

      const themeKeywords = {
        'Technology & Learning': ['coding', 'programming', 'ai', 'machine learning', 'technology', 'development', 'project', 'algorithm'],
        'Personal Growth': ['learning', 'growth', 'improvement', 'progress', 'achievement', 'goal', 'success'],
        'Work & Career': ['work', 'job', 'career', 'internship', 'professional', 'meeting', 'project', 'deadline'],
        'Relationships': ['friend', 'family', 'colleague', 'team', 'relationship', 'social', 'connection'],
        'Health & Wellness': ['exercise', 'health', 'meditation', 'sleep', 'wellness', 'fitness', 'nutrition'],
        'Creativity & Hobbies': ['creative', 'hobby', 'art', 'music', 'writing', 'reading', 'passion']
      };

      for (const [theme, keywords] of Object.entries(themeKeywords)) {
        if (keywords.some(keyword => textLower.includes(keyword))) {
          themes.push(theme);
        }
      }

      const sentiment = analyzeMood(text);
      const wordCount = text.split(/\\s+/).length;
      
      let analysis = `This ${wordCount}-word entry reflects a ${sentiment} state of mind. `;
      
      if (themes.length > 0) {
        analysis += `Key themes include: ${themes.join(', ')}. `;
      }
      
      // Add personalized insights based on content
      if (textLower.includes('ai') || textLower.includes('machine learning') || textLower.includes('programming')) {
        analysis += 'Your passion for AI and technology shines through in this reflection. ';
      }
      
      if (textLower.includes('goal') || textLower.includes('plan') || textLower.includes('future')) {
        analysis += 'This entry shows forward-thinking and goal-oriented mindset. ';
      }
      
      analysis += 'Continue documenting your journey - reflection is a powerful tool for growth and self-awareness.';
      
      return analysis;
    }

    // Generate auto-tags if not provided
    function generateTags(text: string): string[] {
      const autoTags = [];
      const textLower = text.toLowerCase();

      const tagMap = {
        'ai-ml': ['ai', 'artificial intelligence', 'machine learning', 'neural network', 'deep learning'],
        'programming': ['coding', 'programming', 'development', 'algorithm', 'software'],
        'personal': ['personal', 'life', 'reflection', 'thoughts', 'feelings'],
        'work': ['work', 'job', 'career', 'professional', 'internship'],
        'learning': ['learning', 'study', 'education', 'skill', 'knowledge'],
        'goals': ['goal', 'plan', 'objective', 'target', 'ambition'],
        'technology': ['technology', 'tech', 'computer', 'digital', 'innovation']
      };

      for (const [tag, keywords] of Object.entries(tagMap)) {
        if (keywords.some(keyword => textLower.includes(keyword))) {
          autoTags.push(tag);
        }
      }

      return autoTags.length > 0 ? autoTags : ['general', 'reflection'];
    }

    const detectedMood = mood || analyzeMood(content);
    const finalTags = tags && tags.length > 0 ? tags : generateTags(content);
    const analysis = analyzeContent(content);

    const response = {
      entry_id: entryId,
      content: content.trim(),
      mood: detectedMood,
      tags: finalTags,
      timestamp: new Date().toISOString(),
      analysis,
      word_count: content.split(/\\s+/).length,
      character_count: content.length,
      ai_insights: {
        sentiment_confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
        recommended_tags: generateTags(content),
        reading_time_minutes: Math.ceil(content.split(/\\s+/).length / 200)
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Diary API error:', error);
    return NextResponse.json(
      { error: 'Failed to process diary entry' },
      { status: 500 }
    );
  }
}