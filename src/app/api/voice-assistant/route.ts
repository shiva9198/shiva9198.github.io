import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, url } = await request.json();

    // Enhanced demo responses with Shiva's actual expertise
    const demoResponses = {
      'artificial intelligence': `Artificial Intelligence is transforming industries through advanced machine learning, neural networks, and deep learning systems. In my internship at Regality AI, I worked extensively with Graph RAG for LLM QA systems, implementing cutting-edge AI solutions using LangChain and Neo4j. AI applications span from autonomous systems to intelligent data analysis and natural language processing.`,
      
      'machine learning': `Machine Learning enables computers to learn patterns from data without explicit programming. I've implemented ML algorithms in various projects, including recommendation systems and data analysis tools. Key areas include supervised learning (classification, regression), unsupervised learning (clustering, dimensionality reduction), and reinforcement learning. Popular frameworks include TensorFlow, PyTorch, and Scikit-learn.`,
      
      'graph rag': `Graph RAG (Retrieval Augmented Generation) combines knowledge graphs with large language models for enhanced information retrieval and generation. During my internship at Regality AI, I built a Cognee prototype using LangChain, Neo4j, and Docker. This technology improves LLM accuracy by providing structured context through graph relationships, enabling more precise and factual responses.`,
      
      'langchain': `LangChain is a powerful framework for building LLM applications with chains, agents, and memory systems. I've used it extensively for creating conversational AI systems and implementing RAG architectures. It provides tools for document loading, text splitting, embedding generation, vector stores, and retrieval chains. Perfect for building production-ready AI applications.`,
      
      'python programming': `Python is one of my primary languages for AI systems and backend APIs. My recent work includes FastAPI services, Pydantic contracts, retrieval pipelines, speech processing, and automation.`,
      
      'regality ai': `At Regality AI (May-July 2025), I worked on Graph RAG for LLM QA systems, building a Cognee prototype with LangChain, Neo4j, and Docker. I optimized retrieval workflows and gained hands-on experience with LLM fine-tuning and hybrid retrieval systems. This internship deepened my expertise in enterprise AI solutions and graph-based knowledge systems.`,
      
      'web development': `My recent web work spans React, Next.js, Vite, TypeScript, Tailwind CSS, Node.js, Express, FastAPI, PostgreSQL, Supabase, Appwrite, and Firebase. I focus on typed contracts, responsive interfaces, API correctness, testing, and maintainable delivery.`,
      
      'projects': `My featured public projects are a Voice Business Onboarding System, Campus Eats, an SHL Assessment Recommendation System, and a Multilingual Speech-to-Text Engine. Each project links directly to public code and documentation.`,
      
      'portfolio': `This portfolio is built with Next.js 15.5, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, and Zustand 5. Its content is derived from a GitHub truth document and separates merged contributions, open work, public projects, and confidential private work.`,
      
      'skills': `My current stack includes React, React Native, Expo, Next.js, TypeScript, Python, FastAPI, Node.js, PostgreSQL, Supabase, Redis, Appwrite, Firebase, Docker, RAG, GraphRAG, LangChain, LangGraph, FAISS, Neo4j, and Whisper.`,

      'employment': `I work full-time as an FDE at BuildWithRV, starting in July 2026. I am also available for selected freelance work. I completed my B.Tech in Computer Science with an AI and ML specialization in April 2026.`
    };

    // Simulate URL analysis if provided
    if (url) {
      const response = `I've analyzed the content from ${url}. In a production environment, I would scrape this webpage using BeautifulSoup, extract key information, and provide a comprehensive summary. This would include main topics, key insights, and relevant technical details. The analysis would be powered by advanced NLP techniques and web scraping algorithms.`;
      
      return NextResponse.json({
        response,
        source_url: url,
        timestamp: new Date().toISOString()
      });
    }

    // Find matching response
    let response = `I'm Shiva's portfolio assistant. I can explain his current role at BuildWithRV, freelance availability, technology stack, public projects, verified contributions, education, and Regality AI internship. What would you like to know?`;
    
    const lowerQuery = query.toLowerCase();
    for (const [keyword, resp] of Object.entries(demoResponses)) {
      if (lowerQuery.includes(keyword)) {
        response = resp;
        break;
      }
    }

    return NextResponse.json({
      response,
      source_url: null,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Voice assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
