import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, url } = await request.json();

    // Public-safe demo responses based on verified portfolio content.
    const demoResponses = {
      'artificial intelligence': `My applied-AI work focuses on retrieval systems, voice workflows, LLM integrations, and the product infrastructure needed to use them reliably. During my Regality AI internship, I contributed to GraphRAG workflows using LangChain, Neo4j, Python, and Docker.`,
      
      'machine learning': `My public machine-learning work includes an assessment recommendation system with vector search and a reproducible Recall@10 evaluation workflow. I focus on connecting model behavior to clear product requirements and measurable evaluation.`,
      
      'graph rag': `GraphRAG combines graph relationships with retrieval-augmented generation to provide structured context to an LLM. During my Regality AI internship, I contributed to retrieval workflows using LangChain, Neo4j, vector embeddings, graph-based context expansion, Python, and Docker.`,
      
      'langchain': `I use LangChain for retrieval pipelines and LLM application workflows, including document processing, embeddings, vector retrieval, and graph-assisted context.`,
      
      'python programming': `Python is one of my primary languages for AI systems and backend APIs. My recent work includes FastAPI services, Pydantic contracts, retrieval pipelines, speech processing, and automation.`,
      
      'regality ai': `At Regality AI from May to July 2025, I contributed to a GraphRAG architecture for an LLM question-answering system. The work included LangChain, Neo4j, vector embeddings, hybrid retrieval, prompt design, Python, and Docker.`,
      
      'web development': `My recent web work spans React, Next.js, Vite, TypeScript, Tailwind CSS, Node.js, Express, FastAPI, PostgreSQL, Supabase, Appwrite, and Firebase. I focus on typed contracts, responsive interfaces, API correctness, testing, and maintainable delivery.`,
      
      'projects': `I am currently building PlaceMe, an AI-powered group discussion preparation platform at placeme.study. My featured public repositories include a Voice Business Onboarding System, Campus Eats, an SHL Assessment Recommendation System, and a Multilingual Speech-to-Text Engine.`,

      'placeme': `I am building PlaceMe, an AI-powered group discussion preparation platform. The public platform is available at https://placeme.study, and my public contribution evidence covers live-session, feedback, routing, configuration, testing, and interface work.`,
      
      'portfolio': `This portfolio is built with Next.js 15.5, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, and Zustand 5. Its content is derived from a GitHub truth document and separates merged contributions, open work, public projects, and confidential private work.`,
      
      'skills': `My current stack includes React, React Native, Expo, Next.js, TypeScript, Python, FastAPI, Node.js, PostgreSQL, Supabase, Redis, Appwrite, Firebase, Docker, RAG, GraphRAG, LangChain, LangGraph, FAISS, Neo4j, and Whisper.`,

      'employment': `I work full-time as an FDE at BuildWithRV, starting in July 2026, and I am currently building PlaceMe. I am also available for selected freelance work and completed my B.Tech in Computer Science with an AI and ML specialization in April 2026.`
    };

    // Keep the static demo honest about unavailable external fetching.
    if (url) {
      const response = `This portfolio prototype does not fetch or analyze external URLs. You provided ${url}; no request was made to that address.`;
      
      return NextResponse.json({
        response,
        source_url: url,
        timestamp: new Date().toISOString()
      });
    }

    // Find matching response
    let response = `I'm Shiva's portfolio assistant. I can explain his role at BuildWithRV, PlaceMe, freelance availability, technology stack, public projects, verified contributions, education, and Regality AI internship. What would you like to know?`;
    
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
