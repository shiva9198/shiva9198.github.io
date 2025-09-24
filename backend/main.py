from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime

app = FastAPI(title="Shiva's AI Portfolio Backend", version="1.0.0")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://shiva-portfolio.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PortfolioAssistantRequest(BaseModel):
    query: str
    context: Optional[str] = None

class PortfolioAssistantResponse(BaseModel):
    response: str
    timestamp: str

class LLMTuningRequest(BaseModel):
    task_description: str
    data_type: str
    expected_output: str

class LLMTuningResponse(BaseModel):
    tuning_plan: str
    estimated_time: str
    resources_needed: List[str]
    timestamp: str

# AI-Powered Portfolio Assistant
@app.post("/api/portfolio-assistant", response_model=PortfolioAssistantResponse)
async def portfolio_assistant(request: PortfolioAssistantRequest):
    """
    AI-Powered Portfolio Assistant that helps users navigate and understand my portfolio
    """
    try:
        # Portfolio-specific responses
        portfolio_responses = {
            "projects": "I've worked on various AI/ML projects including computer vision, NLP, and web development. My key projects include Sudoku OCR solver, voice assistants, and virtual diary systems.",
            "skills": "My technical skills include Python, JavaScript/TypeScript, React, FastAPI, OpenCV, TensorFlow, PyTorch, and cloud technologies. I specialize in full-stack development with AI/ML integration.",
            "experience": "I have experience in building end-to-end AI applications, from data processing to model deployment. I've worked with computer vision, natural language processing, and web scraping.",
            "contact": "You can reach out to me through the contact form on this portfolio or connect with me on LinkedIn. I'm always open to discussing new opportunities and collaborations.",
            "education": "I have a strong background in computer science and artificial intelligence, with continuous learning in emerging technologies and frameworks.",
            "background": "I'm a passionate AI/ML engineer and full-stack developer who loves creating intelligent solutions that solve real-world problems.",
            "portfolio": "This portfolio showcases my AI/ML projects, full-stack development skills, and passion for creating intelligent applications that solve real-world problems.",
            "about": "I'm Shiva, an AI/ML engineer passionate about building intelligent systems. I specialize in computer vision, NLP, and full-stack development with modern frameworks."
        }
        
        # Simple keyword matching for demo
        response_text = "Hello! I'm Shiva's AI Portfolio Assistant. I can help you navigate my portfolio, learn about my projects, skills, and experience. What would you like to know?"
        
        query_lower = request.query.lower()
        for keyword, response in portfolio_responses.items():
            if keyword in query_lower:
                response_text = response
                break
        
        # Add context if provided
        if request.context:
            response_text += f"\n\nContext: {request.context}"
        
        return PortfolioAssistantResponse(
            response=response_text,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assistant error: {str(e)}")

# Fine Tuning of LLM for Agentic AI
@app.post("/api/llm-tuning", response_model=LLMTuningResponse)
async def llm_fine_tuning(request: LLMTuningRequest):
    """
    LLM Fine Tuning service for creating agentic AI solutions
    """
    try:
        # Generate a tuning plan based on the request
        tuning_plans = {
            "text_classification": {
                "plan": "1. Data preprocessing and tokenization\\n2. Model selection (BERT, RoBERTa, or GPT-based)\\n3. Fine-tuning with task-specific data\\n4. Evaluation and validation\\n5. Deployment optimization",
                "time": "2-5 days",
                "resources": ["GPU compute", "Labeled dataset", "Model checkpoints", "Evaluation metrics"]
            },
            "question_answering": {
                "plan": "1. Dataset preparation and context-question pairing\\n2. Model architecture selection\\n3. Fine-tuning with QA-specific loss functions\\n4. Context understanding optimization\\n5. Answer generation refinement",
                "time": "3-7 days", 
                "resources": ["High-memory GPU", "QA datasets", "Context embeddings", "Answer validation"]
            },
            "text_generation": {
                "plan": "1. Corpus preparation and cleaning\\n2. Tokenization and sequence modeling\\n3. Fine-tuning with generation objectives\\n4. Creativity vs accuracy balance\\n5. Output filtering and safety measures",
                "time": "4-10 days",
                "resources": ["Multi-GPU setup", "Large text corpus", "Generation metrics", "Safety filters"]
            },
            "conversational_ai": {
                "plan": "1. Dialog data collection and formatting\\n2. Context-aware architecture design\\n3. Multi-turn conversation fine-tuning\\n4. Personality and tone adjustment\\n5. Response coherence optimization",
                "time": "5-14 days",
                "resources": ["Conversation datasets", "Context management", "Personality modeling", "Response evaluation"]
            },
            "agentic_ai": {
                "plan": "1. Multi-agent architecture design\\n2. Tool integration and API connections\\n3. Decision-making framework implementation\\n4. Memory and context management\\n5. Safety and reliability measures",
                "time": "7-21 days",
                "resources": ["Multi-agent frameworks", "API integrations", "Context databases", "Safety protocols"]
            }
        }
        
        # Determine the best matching tuning approach
        task_lower = request.task_description.lower()
        selected_plan = tuning_plans.get("conversational_ai")  # default
        
        for task_type, plan_info in tuning_plans.items():
            if task_type.replace("_", " ") in task_lower or any(word in task_lower for word in task_type.split("_")):
                selected_plan = plan_info
                break
        
        return LLMTuningResponse(
            tuning_plan=selected_plan["plan"],
            estimated_time=selected_plan["time"],
            resources_needed=selected_plan["resources"],
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM tuning error: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "Shiva's AI Portfolio Backend",
        "version": "1.0.0",
        "status": "Active",
        "features": {
            "portfolio_assistant": "/api/portfolio-assistant",
            "llm_tuning": "/api/llm-tuning"
        },
        "description": "Backend service for AI-Powered Portfolio Assistant and Fine Tuning of LLM for Agentic AI"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
