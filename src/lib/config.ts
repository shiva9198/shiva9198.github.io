// Environment configuration utility
interface Config {
  API_URL: string;
  APP_URL: string;
  EMAILJS: {
    SERVICE_ID: string;
    TEMPLATE_ID: string;
    PUBLIC_KEY: string;
  };
  ANALYTICS: {
    GA_ID?: string;
  };
  isDevelopment: boolean;
  isProduction: boolean;
}

const config: Config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  EMAILJS: {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  },
  ANALYTICS: {
    GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validation function to check if required environment variables are set
export const validateEnvironment = (): string[] => {
  const errors: string[] = [];

  if (!config.API_URL) {
    errors.push('NEXT_PUBLIC_API_URL is required');
  }

  if (!config.APP_URL) {
    errors.push('NEXT_PUBLIC_APP_URL is required');
  }

  // EmailJS validation (only for production)
  if (config.isProduction) {
    if (!config.EMAILJS.SERVICE_ID) {
      errors.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID is required for production');
    }
    if (!config.EMAILJS.TEMPLATE_ID) {
      errors.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID is required for production');
    }
    if (!config.EMAILJS.PUBLIC_KEY) {
      errors.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is required for production');
    }
  }

  return errors;
};

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: `${config.API_URL}/health`,
  VOICE_ASSISTANT: `${config.API_URL}/api/voice-assistant`,
  SUDOKU_SOLVER: `${config.API_URL}/api/sudoku-solver`,
  SUDOKU_UPLOAD: `${config.API_URL}/api/sudoku/upload`,
  SUDOKU_SOLVE_IMAGE: `${config.API_URL}/solve-image`,
  DIARY_ENTRY: `${config.API_URL}/api/diary/entry`,
} as const;

// Helper function to check if running in development mode
export const isDev = (): boolean => config.isDevelopment;

// Helper function to check if running in production mode
export const isProd = (): boolean => config.isProduction;

export default config;