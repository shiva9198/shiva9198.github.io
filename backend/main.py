from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests
from bs4 import BeautifulSoup
import openai
import os
from datetime import datetime
import json

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
class VoiceAssistantRequest(BaseModel):
    query: str
    url: Optional[str] = None

class VoiceAssistantResponse(BaseModel):
    response: str
    source_url: Optional[str] = None
    timestamp: str

class SudokuRequest(BaseModel):
    puzzle: List[List[int]]

class SudokuResponse(BaseModel):
    solution: List[List[int]]
    is_valid: bool
    steps: int

class DiaryEntry(BaseModel):
    content: str
    mood: Optional[str] = None
    tags: Optional[List[str]] = None

class DiaryResponse(BaseModel):
    entry_id: str
    content: str
    mood: Optional[str]
    tags: Optional[List[str]]
    timestamp: str
    analysis: str

# Voice Assistant Endpoints
@app.post("/api/voice-assistant", response_model=VoiceAssistantResponse)
async def voice_assistant(request: VoiceAssistantRequest):
    """
    AI Voice Assistant that can scrape web content and provide intelligent responses
    """
    try:
        if request.url:
            # Web scraping functionality
            response = requests.get(request.url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract main content
            text_content = soup.get_text()[:2000]  # Limit to first 2000 chars
            
            # Simulate AI response (replace with actual OpenAI/Hugging Face API)
            ai_response = f"Based on the content from {request.url}, here's a summary: {text_content[:200]}..."
            
            return VoiceAssistantResponse(
                response=ai_response,
                source_url=request.url,
                timestamp=datetime.now().isoformat()
            )
        else:
            # General AI assistant response
            # This would integrate with OpenAI/Hugging Face
            mock_responses = {
                "artificial intelligence": "AI is transforming industries through machine learning, natural language processing, and computer vision. Key areas include deep learning, neural networks, and automated decision-making systems.",
                "machine learning": "Machine Learning enables computers to learn and improve from experience without explicit programming. Key techniques include supervised, unsupervised, and reinforcement learning.",
                "python programming": "Python is a versatile programming language excellent for AI/ML, web development, and data science. Key libraries include NumPy, Pandas, TensorFlow, and PyTorch.",
                "tech news": "Latest in tech: AI breakthroughs in LLMs, quantum computing advances, sustainable tech innovations, and the rise of edge computing for IoT applications.",
                "web development": "Modern web development uses frameworks like React, Next.js, and Vue.js with backend technologies like Node.js, FastAPI, and cloud deployment platforms."
            }
            
            # Simple keyword matching for demo
            response_text = "I'm Shiva's AI assistant! I can help with AI/ML topics, programming questions, and web development. Try asking about specific technologies or providing a URL to analyze."
            
            for keyword, response in mock_responses.items():
                if keyword.lower() in request.query.lower():
                    response_text = response
                    break
            
            return VoiceAssistantResponse(
                response=response_text,
                source_url=None,
                timestamp=datetime.now().isoformat()
            )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assistant error: {str(e)}")

# Sudoku Solver Endpoints
@app.post("/api/sudoku-solver", response_model=SudokuResponse)
async def solve_sudoku(request: SudokuRequest):
    """
    Advanced Sudoku Solver using recursive backtracking algorithm
    """
    try:
        puzzle = [row[:] for row in request.puzzle]  # Deep copy
        steps = [0]  # Use list to allow modification in nested function
        
        def is_valid(board, row, col, num):
            # Check row
            for j in range(9):
                if board[row][j] == num:
                    return False
            
            # Check column
            for i in range(9):
                if board[i][col] == num:
                    return False
            
            # Check 3x3 box
            start_row, start_col = 3 * (row // 3), 3 * (col // 3)
            for i in range(start_row, start_row + 3):
                for j in range(start_col, start_col + 3):
                    if board[i][j] == num:
                        return False
            
            return True
        
        def solve(board):
            steps[0] += 1
            for i in range(9):
                for j in range(9):
                    if board[i][j] == 0:
                        for num in range(1, 10):
                            if is_valid(board, i, j, num):
                                board[i][j] = num
                                if solve(board):
                                    return True
                                board[i][j] = 0
                        return False
            return True
        
        is_solved = solve(puzzle)
        
        return SudokuResponse(
            solution=puzzle,
            is_valid=is_solved,
            steps=steps[0]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sudoku solver error: {str(e)}")

# Virtual Diary Endpoints
@app.post("/api/diary/entry", response_model=DiaryResponse)
async def create_diary_entry(entry: DiaryEntry):
    """
    Virtual Diary with AI analysis and mood detection
    """
    try:
        # Generate unique entry ID
        entry_id = f"entry_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Simple mood analysis (would use actual NLP in production)
        mood_keywords = {
            "happy": ["happy", "joy", "excited", "great", "awesome", "wonderful"],
            "sad": ["sad", "down", "depressed", "unhappy", "terrible", "awful"],
            "neutral": ["okay", "fine", "normal", "regular", "average"],
            "excited": ["excited", "thrilled", "pumped", "energetic", "motivated"],
            "stressed": ["stressed", "overwhelmed", "busy", "pressure", "anxiety"]
        }
        
        detected_mood = entry.mood or "neutral"
        if not entry.mood:
            content_lower = entry.content.lower()
            for mood, keywords in mood_keywords.items():
                if any(keyword in content_lower for keyword in keywords):
                    detected_mood = mood
                    break
        
        # AI analysis of the entry
        analysis = f"This entry reflects a {detected_mood} mood. The content suggests themes of personal growth and reflection. Key insights: engaging with technology and learning."
        
        # In a real app, this would save to a database
        return DiaryResponse(
            entry_id=entry_id,
            content=entry.content,
            mood=detected_mood,
            tags=entry.tags or ["personal", "reflection"],
            timestamp=datetime.now().isoformat(),
            analysis=analysis
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Diary error: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "Shiva's AI Portfolio Backend",
        "version": "1.0.0",
        "endpoints": {
            "voice_assistant": "/api/voice-assistant",
            "sudoku_solver": "/api/sudoku-solver", 
            "diary": "/api/diary/entry"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)