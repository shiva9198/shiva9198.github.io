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
      
      'python programming': `Python is my primary programming language for AI/ML development and web applications. I've used it with libraries like TensorFlow, PyTorch, Pandas, NumPy, FastAPI, and Django. Python's versatility makes it excellent for data science, machine learning, web development, automation, and API development. It's the backbone of most AI/ML projects.`,
      
      'regality ai': `At Regality AI (May-July 2025), I worked on Graph RAG for LLM QA systems, building a Cognee prototype with LangChain, Neo4j, and Docker. I optimized retrieval workflows and gained hands-on experience with LLM fine-tuning and hybrid retrieval systems. This internship deepened my expertise in enterprise AI solutions and graph-based knowledge systems.`,
      
      'web development': `Modern web development involves frontend frameworks like React, Next.js, and Vue.js, paired with backend technologies like Node.js, FastAPI, and databases like PostgreSQL and MongoDB. I've built full-stack applications using TypeScript, implemented responsive designs with TailwindCSS, and deployed applications using Docker and cloud platforms like Vercel.`,
      
      'projects': `I've developed several innovative projects including a Voice-Activated AI Assistant for web scraping and summarization, a Virtual Diary with Google Sheets integration, and a Sudoku Solver using recursive backtracking. Each project demonstrates different aspects of AI/ML, data processing, and algorithm implementation. You can explore these interactively in the AI Playground section!`,
      
      'portfolio': `This portfolio showcases my expertise in AI/ML, full-stack development, and innovative problem-solving. Built with Next.js 14, TailwindCSS, and Framer Motion, it features interactive AI demos, glassmorphism design, and real-time project demonstrations. The AI Playground allows visitors to experience my projects firsthand, making it more than just a static showcase.`,
      
      'skills': `My technical skills span multiple domains: Programming (Python, Java, C, TypeScript, JavaScript), Web Development (React, Node.js, Next.js, Express, HTML, CSS), Databases (MySQL, MongoDB, PostgreSQL), AI/ML (Machine Learning, LangChain, TensorFlow, PyTorch), and Tools (Docker, Git, Linux). I also excel in problem-solving, team collaboration, and analytical thinking.`
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
    let response = `I'm Shiva's AI Assistant! I can help you learn about artificial intelligence, machine learning, Graph RAG, my internship experience at Regality AI, programming topics, and my projects. I can also analyze web content when you provide URLs. What would you like to know?`;
    
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