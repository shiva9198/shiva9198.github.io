export const portfolioData = {
  personal: {
    name: "Shiva Santosh Reddy Aenugu",
    shortName: "Shiva",
    tagline: "FDE at BuildWithRV · Building PlaceMe · AI & Full-Stack Engineer",
    employment: "Full-time since July 2026",
    availability: "Available for select freelance work",
    email: "shiva24.santosh@gmail.com",
    linkedin: "https://www.linkedin.com/in/shiva-santosh-reddy-aenugu/",
    github: "https://github.com/shiva9198",
    profile: "I work full-time as an FDE at BuildWithRV and am currently building PlaceMe, an AI-powered group discussion preparation platform. I focus on reliable web, mobile, backend, and applied-AI systems—from product interfaces and APIs to retrieval and realtime workflows."
  },

  skills: [
    {
      title: "AI Systems",
      color: "bg-purple-500",
      items: [
        { name: "RAG & GraphRAG", icon: "🧠", evidence: "Production experience" },
        { name: "LangChain & LangGraph", icon: "🔗", evidence: "Production experience" },
        { name: "FAISS & Neo4j", icon: "🕸️", evidence: "Production experience" },
        { name: "Whisper & Voice AI", icon: "🎙️", evidence: "Public projects" },
        { name: "LLM Integrations", icon: "🤖", evidence: "Current work" }
      ]
    },
    {
      title: "Frontend & Mobile",
      color: "bg-blue-500",
      items: [
        { name: "React & Next.js", icon: "⚛️", evidence: "Current work" },
        { name: "React Native & Expo", icon: "📱", evidence: "Current work" },
        { name: "TypeScript & JavaScript", icon: "📘", evidence: "Current work" },
        { name: "Vite & Tailwind CSS", icon: "⚡", evidence: "Public contributions" }
      ]
    },
    {
      title: "Backend & APIs",
      color: "bg-green-500",
      items: [
        { name: "Python & FastAPI", icon: "🐍", evidence: "Current work" },
        { name: "Node.js & Express", icon: "🟢", evidence: "Public projects" },
        { name: "REST APIs & Pydantic", icon: "🔌", evidence: "Current work" },
        { name: "JWT & Realtime Systems", icon: "🔐", evidence: "Current work" }
      ]
    },
    {
      title: "Data, Delivery & Quality",
      color: "bg-orange-500",
      items: [
        { name: "PostgreSQL & Supabase", icon: "🐘", evidence: "Current work" },
        { name: "Redis & SQLAlchemy", icon: "🗄️", evidence: "Current work" },
        { name: "Appwrite & Firebase", icon: "☁️", evidence: "Public contributions" },
        { name: "Docker & GitHub Workflows", icon: "🐳", evidence: "Production experience" },
        { name: "Vitest, Playwright & OpenAPI", icon: "✅", evidence: "Public contributions" }
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      major: "Artificial Intelligence and Machine Learning",
      institution: "Sreyas Institute of Engineering and Technology",
      period: "2022 - April 2026",
      type: "completed"
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
    { name: "Python", issuer: "Kaggle", date: "2024", icon: "🐍" },
    { name: "SQL", issuer: "HackerRank", date: "2024", icon: "📊" },
    { name: "Machine Learning", issuer: "Kaggle", date: "2024", icon: "🤖" },
    { name: "Agile Scrum", issuer: "Scrum Learning Society", date: "2024", icon: "🔄" }
  ],

  experience: [
    {
      company: "BuildWithRV",
      position: "FDE",
      period: "July 2026 - Present",
      type: "Full-time",
      description: [
        "Build and ship production software in a full-time FDE role.",
        "Work across web, mobile, backend, and applied-AI product development."
      ],
      technologies: ["Product Engineering", "Full-Stack Development", "Applied AI"]
    },
    {
      company: "Independent",
      position: "Freelance Software Developer",
      period: "Present",
      type: "Freelance",
      description: [
        "Take on selected web, mobile, backend, and applied-AI engagements.",
        "Keep client identities and private project details confidential."
      ],
      technologies: ["Web", "Mobile", "Backend", "AI Systems"]
    },
    {
      company: "Regality AI",
      position: "AI/ML Intern",
      period: "May 2025 - July 2025",
      type: "Internship",
      description: [
        "Contributed to a GraphRAG architecture for an LLM question-answering system.",
        "Built retrieval workflows with LangChain, Neo4j, vector embeddings, and graph-based context expansion.",
        "Worked on prompt design, hybrid retrieval, and Dockerized AI services."
      ],
      technologies: ["LangChain", "Neo4j", "Python", "Docker", "GraphRAG"]
    }
  ],

  projects: [
    {
      title: "Voice Business Onboarding System",
      subtitle: "Voice-to-Structured Business Data",
      description: "Turns spoken business and product details into structured, reviewable data through transcription, field extraction, and a responsive interface.",
      technologies: ["Whisper", "Groq", "Llama", "Flask", "React", "TypeScript"],
      githubUrl: "https://github.com/shiva9198/voce-to-description-v1",
      liveUrl: null,
      featured: true,
      playgroundDemo: "voice-assistant"
    },
    {
      title: "Campus Eats",
      subtitle: "Realtime Campus Ordering Platform",
      description: "Full-stack campus ordering system with student and admin workflows, realtime order tracking, authentication, QR-based pickup, and menu management.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Convex", "JWT"],
      githubUrl: "https://github.com/shiva9198/campus-eats",
      liveUrl: null,
      featured: true,
      playgroundDemo: null
    },
    {
      title: "SHL Assessment Recommendation System",
      subtitle: "Evaluated Vector-Search Recommender",
      description: "Matches natural-language hiring requirements to assessment products using embeddings and vector similarity, with a reproducible Recall@10 evaluation workflow.",
      technologies: ["FastAPI", "ChromaDB", "LangChain", "OpenRouter", "Python"],
      githubUrl: "https://github.com/shiva9198/shl-assessment-recommendation",
      liveUrl: null,
      featured: false,
      playgroundDemo: null
    },
    {
      title: "Multilingual Speech-to-Text Engine",
      subtitle: "Offline Multilingual Transcription",
      description: "Runs multilingual transcription locally, detects more than 100 languages, and can translate detected speech into English.",
      technologies: ["Python", "Faster-Whisper", "Whisper large-v3", "VAD"],
      githubUrl: "https://github.com/shiva9198/multilingual-speech-to-text-engine",
      liveUrl: null,
      featured: false,
      playgroundDemo: null
    }
  ],

  contributions: [
    {
      repository: "aden-hive/hive",
      title: "Frontend routing fallback",
      summary: "Added a safe 404 fallback for unknown frontend routes.",
      status: "Merged",
      date: "March 2026",
      url: "https://github.com/aden-hive/hive/pull/6373",
      technologies: ["Frontend", "Routing"]
    },
    {
      repository: "sidhartha522/ehes-26",
      title: "Five merged product contributions",
      summary: "Delivered responsive layout, deployment configuration, interface redesign, navigation fixes, and a stall-booking flow.",
      status: "Merged",
      date: "March - April 2026",
      url: "https://github.com/sidhartha522/ehes-26/pulls?q=is%3Apr+author%3Ashiva9198",
      technologies: ["HTML", "Tailwind CSS", "Responsive UI", "Render"]
    },
    {
      repository: "placemestudy1/placeme-UI",
      title: "Live session and feedback workflows",
      summary: "Contributing raise-hand signalling, live feedback polling, session help, routing, configuration, and related UI integration.",
      status: "Open",
      date: "August 2026",
      url: "https://github.com/placemestudy1/placeme-UI/pull/3",
      technologies: ["React", "TypeScript", "TanStack", "Vitest", "Playwright"]
    },
    {
      repository: "MadhavDGS/ebc-app-backend",
      title: "Backend API collaboration",
      summary: "Authored public commits covering API routes, Appwrite schema compatibility, and Pydantic updates.",
      status: "Collaborator",
      date: "June 2026",
      url: "https://github.com/MadhavDGS/ebc-app-backend",
      technologies: ["FastAPI", "Appwrite", "Pydantic", "Python"]
    },
    {
      repository: "sanjanahh-1901/perenti",
      title: "Cloud data and authentication migration",
      summary: "Authored the migration to Firebase/Firestore storage and integrated authentication and environment-based secrets.",
      status: "Collaborator",
      date: "June 2026",
      url: "https://github.com/sanjanahh-1901/perenti/commit/9f493d67bee7154e67b1886a8fb222a5320d01f0",
      technologies: ["Firebase", "Firestore", "Authentication"]
    }
  ],

  currentWork: {
    lastUpdated: "2026-08-22",
    focus: [
      {
        title: "Full-time product engineering",
        description: "Building and shipping production software as an FDE at BuildWithRV.",
        status: "Current",
        tech: ["Web", "Mobile", "Backend", "Applied AI"],
        url: null
      },
      {
        title: "Building PlaceMe",
        description: "Developing an AI-powered group discussion preparation platform with live-session and feedback workflows.",
        status: "Building",
        tech: ["React", "TypeScript", "Realtime", "Testing"],
        url: "https://placeme.study"
      },
      {
        title: "Selected freelance work",
        description: "Available for clearly scoped web, mobile, backend, and applied-AI engagements.",
        status: "Available",
        tech: ["React", "React Native", "FastAPI", "TypeScript"],
        url: null
      }
    ],
    learning: [
      { topic: "Production AI systems", focus: "Retrieval quality, model routing, evaluation, and observability" },
      { topic: "Reliable mobile systems", focus: "Offline behavior, realtime state, performance, and release quality" },
      { topic: "Full-stack quality", focus: "Typed contracts, browser testing, API correctness, and maintainable delivery" }
    ],
    goals: [
      "Build PlaceMe into a reliable group discussion preparation platform",
      "Ship dependable production software in the full-time FDE role",
      "Deliver a small number of high-quality freelance engagements",
      "Continue making verifiable public contributions"
    ]
  }
};

export type PortfolioData = typeof portfolioData;
