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
  ]
};

export type PortfolioData = typeof portfolioData;