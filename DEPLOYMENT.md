# Deployment Configuration Guide

## 🚀 Production Deployment Checklist

### Prerequisites
- [ ] Domain purchased and configured
- [ ] Hosting platform selected (Vercel, Netlify, etc.)
- [ ] Backend hosting configured (Railway, Render, etc.)
- [ ] Environment variables configured

### Frontend Deployment (Next.js)

#### Recommended: Vercel
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   NEXT_PUBLIC_GA_ID=your_analytics_id
   ```
3. Deploy: `vercel --prod`

#### Alternative: Netlify
1. Build command: `npm run build`
2. Publish directory: `out`
3. Add environment variables in Netlify dashboard

### Backend Deployment (FastAPI)

#### Recommended: Railway
1. Connect GitHub repository
2. Configure environment variables:
   ```
   GOOGLE_API_KEY=your_google_api_key
   GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
   OPENAI_API_KEY=your_openai_api_key
   CORS_ORIGINS=https://your-domain.com
   ```
3. Deploy automatically on git push

#### Alternative: Render
1. Create new Web Service
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Domain Configuration
1. Configure DNS records
2. Set up SSL certificates (usually automatic)
3. Update CORS origins in backend
4. Update API URLs in frontend

### Third-Party Services Setup

#### EmailJS (Contact Form)
1. Create account at https://emailjs.com
2. Create email service
3. Create email template
4. Get service ID, template ID, and public key
5. Update environment variables

#### Google Custom Search (AI Assistant)
1. Create project in Google Cloud Console
2. Enable Custom Search API
3. Create Custom Search Engine
4. Get API key and Search Engine ID
5. Update environment variables

#### OpenAI (AI Features)
1. Create account at https://openai.com
2. Get API key from dashboard
3. Update environment variable
4. Monitor usage and billing

### Performance Optimization
- [ ] Enable gzip compression
- [ ] Configure CDN
- [ ] Optimize images
- [ ] Enable caching headers
- [ ] Monitor Core Web Vitals

### Security Configuration
- [ ] Configure HTTPS
- [ ] Set up security headers
- [ ] Configure CORS properly
- [ ] Validate all environment variables
- [ ] Enable rate limiting (backend)

### Monitoring & Analytics
- [ ] Set up Google Analytics
- [ ] Configure error tracking (Sentry)
- [ ] Monitor API usage
- [ ] Set up uptime monitoring

## 🛠️ Local Development

### Setup
```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables
Copy `.env.local` and update with your keys:
- EmailJS credentials
- Google API credentials
- OpenAI API key

## 📋 Production URLs Structure

### Frontend Routes
- `/` - Home page with portfolio
- `/api/diary` - Diary API route
- `/api/sudoku-solver` - Sudoku solver API route
- `/api/voice-assistant` - Voice assistant API route

### Backend Routes
- `/health` - Health check
- `/api/voice-assistant` - AI assistant endpoint
- `/api/sudoku-solver` - Sudoku solving endpoint
- `/api/sudoku/upload` - OCR image upload
- `/api/diary/entry` - Diary entry creation

## 🔧 Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS_ORIGINS in backend environment
2. **API Not Found**: Check API URL in frontend environment
3. **Build Failures**: Check TypeScript errors and dependencies
4. **OCR Not Working**: Ensure OpenCV dependencies installed on server

### Logs Location
- Frontend: Vercel/Netlify dashboard
- Backend: Railway/Render logs panel
- API Errors: Browser developer console