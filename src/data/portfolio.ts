export const portfolioData = {
  personal: {
    name: "Shiva Santosh Reddy Aenugu",
    tagline: "Aspiring Computer Science Engineer | AI & ML Specialist",
    phone: "+91 6304652466",
    email: "shiva24.santosh@gmail.com",
    linkedin: "https://www.linkedin.com/in/shiva-santosh-reddy-aenugu/",
    github: "https://github.com/shiva9198",
    profile: "Aspiring Computer Science Engineer specializing in Artificial Intelligence and Machine Learning with a strong passion for technology and programming. Dedicated to leveraging cutting-edge AI/ML techniques to develop innovative software solutions. Eager to contribute to dynamic startup environments, bringing a blend of technical expertise, problem-solving skills, and a growth-driven mindset."
  },
  
  skills: {
    programming: [
      { name: "C", level: 85, icon: "🔧" },
      { name: "Python", level: 90, icon: "🐍" },
      { name: "Java", level: 80, icon: "☕" }
    ],
    web: [
      { name: "HTML", level: 95, icon: "🌐" },
      { name: "CSS", level: 90, icon: "🎨" },
      { name: "JavaScript", level: 85, icon: "⚡" },
      { name: "TypeScript", level: 85, icon: "📘" },
      { name: "ReactJs", level: 90, icon: "⚛️" },
      { name: "NodeJs", level: 85, icon: "🟢" },
      { name: "Express", level: 80, icon: "🚀" },
      { name: "MySQL", level: 85, icon: "🗄️" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "Docker", level: 75, icon: "🐳" }
    ],
    ml: [
      { name: "Machine Learning", level: 85, icon: "🤖" },
      { name: "SQL", level: 90, icon: "📊" },
      { name: "LangChain", level: 80, icon: "🔗" },
      { name: "OpenAI API", level: 75, icon: "🧠" }
    ],
    soft: [
      { name: "Problem Solving", level: 95, icon: "🧩" },
      { name: "Team Collaboration", level: 90, icon: "🤝" },
      { name: "Analytical Skills", level: 90, icon: "📈" },
      { name: "Attention to Detail", level: 85, icon: "🔍" }
    ]
  },

  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      major: "Artificial Intelligence and Machine Learning",
      institution: "Sreyas Institute of Engineering and Technology",
      period: "2022 - 2026",
      type: "current"
    },
    {
      degree: "Intermediate",
      institution: "Candor Shrine i Senior Secondary School (CBSE)",
      period: "2020 - 2022",
      type: "completed"
    },
    {
      degree: "High School",
      institution: "St Gabriel High School",
      period: "2019 - 2020",
      type: "completed"
    }
  ],

  certificates: [
    {
      name: "Python",
      issuer: "Kaggle",
      date: "2024",
      icon: "🐍"
    },
    {
      name: "SQL",
      issuer: "HackerRank",
      date: "2024", 
      icon: "📊"
    },
    {
      name: "Machine Learning",
      issuer: "Kaggle",
      date: "2024",
      icon: "🤖"
    },
    {
      name: "Agile Scrum",
      issuer: "Scrum Learning Society",
      date: "2024",
      icon: "🔄"
    }
  ],

  internships: [
    {
      company: "Regality AI",
      position: "AI/ML Intern",
      period: "May 2025 - July 2025",
      description: [
        "Contributed to the development of Graph RAG (Retrieval-Augmented Generation) architecture for an LLM-powered QA system.",
        "Built a prototype of Cognee, an intelligent assistant leveraging LangChain, OpenAI LLMs, Neo4j (for entity graph reasoning), and Dockerized microservices for scalable deployment.",
        "Integrated agentic behavior through LangChain's tools and memory components, enabling context-aware multi-hop question answering.",
        "Designed and optimized retrieval workflows using vector embeddings and graph-based context expansion, enhancing relevance and factual consistency.",
        "Gained hands-on experience with LLM fine-tuning, prompt engineering, and hybrid retrieval methods combining semantic and symbolic reasoning."
      ],
      technologies: ["LangChain", "OpenAI LLMs", "Neo4j", "Docker", "Python", "Graph RAG"]
    }
  ],

  projects: [
    {
      title: "Voice-Activated AI Assistant",
      subtitle: "Web Scraping & Summarization",
      description: "Built an AI voice assistant that uses speech recognition, Google CSE API, and BeautifulSoup to fetch and summarize web content based on user commands. Integrated text-to-speech and NLTK-based summarization for clear, concise responses, with robust handling of recognition and scraping errors.",
      technologies: ["Python", "Speech Recognition", "Google CSE API", "BeautifulSoup", "NLTK", "Text-to-Speech"],
      githubUrl: "https://github.com/shiva9198",
      liveUrl: null,
      featured: true,
      playgroundDemo: "voice-assistant"
    },
    {
      title: "Virtual Diary",
      subtitle: "Google Sheets Integration",
      description: "Built a virtual diary web app with Streamlit, integrating Google Sheets API and OAuth2 for secure storage, automatic sheet creation, and structured time-stamped entries. Enabled seamless daily logging with dynamic updates and error handling for missing sheets, ensuring reliable performance and easy entry tracking over time.",
      technologies: ["Python", "Streamlit", "Google Sheets API", "OAuth2", "Web Development"],
      githubUrl: "https://github.com/shiva9198",
      liveUrl: null,
      featured: true,
      playgroundDemo: "virtual-diary"
    },
    {
      title: "Sudoku Solver",
      subtitle: "Recursive Backtracking",
      description: "Developed a Sudoku solver using a recursive backtracking algorithm to efficiently fill empty cells while enforcing all game constraints. Enhanced output readability by formatting the solution grid with clear visual separation of 3x3 subgrids.",
      technologies: ["Python", "Algorithms", "Recursive Backtracking", "Data Structures"],
      githubUrl: "https://github.com/shiva9198",
      liveUrl: null,
      featured: true,
      playgroundDemo: "sudoku-solver"
    }
  ],

  currentWork: {
    status: "actively-building",
    lastUpdated: "2025-01-21",
    projects: [
      {
        title: "AI-Powered Portfolio Assistant",
        description: "Building an intelligent chatbot that can answer questions about my skills, projects, and experience using OpenAI API and LangChain.",
        progress: 75,
        tech: ["Next.js", "OpenAI API", "LangChain", "TypeScript"],
        startDate: "2025-01-01",
        estimatedCompletion: "2025-02-15",
        category: "AI/ML",
        status: "in-progress",
        highlights: [
          "Implemented RAG (Retrieval Augmented Generation)",
          "Custom knowledge base from portfolio data",
          "Real-time chat interface with streaming responses"
        ]
      },
      {
        title: "Full-Stack E-commerce Platform",
        description: "Developing a modern e-commerce solution with React, Node.js, and MongoDB featuring advanced search, payment integration, and admin dashboard.",
        progress: 60,
        tech: ["React", "Node.js", "MongoDB", "Stripe API", "Docker"],
        startDate: "2024-12-10",
        estimatedCompletion: "2025-03-01",
        category: "Full-Stack",
        status: "in-progress",
        highlights: [
          "Microservices architecture with Docker",
          "Real-time inventory management",
          "Advanced search with Elasticsearch"
        ]
      },
      {
        title: "Machine Learning Model Deployment",
        description: "Creating a scalable ML pipeline for image classification using TensorFlow and deploying with FastAPI and AWS.",
        progress: 40,
        tech: ["Python", "TensorFlow", "FastAPI", "AWS", "Docker"],
        startDate: "2025-01-15",
        estimatedCompletion: "2025-04-01",
        category: "AI/ML",
        status: "planning",
        highlights: [
          "Custom CNN architecture",
          "Automated model retraining pipeline",
          "Cloud deployment with auto-scaling"
        ]
      }
    ],
    learning: [
      {
        topic: "Advanced React Patterns",
        platform: "Online Courses & Documentation",
        progress: 85,
        focus: "Custom hooks, Context optimization, Performance patterns"
      },
      {
        topic: "System Design",
        platform: "Books & Practice",
        progress: 60,
        focus: "Scalable architectures, Database design, Microservices"
      },
      {
        topic: "AWS Cloud Services",
        platform: "AWS Documentation & Labs",
        progress: 45,
        focus: "Lambda, EC2, RDS, S3, CloudFormation"
      }
    ],
    goals: [
      "Complete AI Portfolio Assistant by February 2025",
      "Deploy e-commerce platform with 99.9% uptime",
      "Obtain AWS Solutions Architect certification",
      "Contribute to 3 open-source ML projects",
      "Build and deploy 5 production-ready applications"
    ]
  }
};

export type PortfolioData = typeof portfolioData;