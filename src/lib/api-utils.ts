// API error handling utilities

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  backoffMultiplier?: number;
}

// Enhanced fetch with error handling, retries, and timeout
export async function apiCall<T = unknown>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    backoffMultiplier = 2
  } = retryOptions;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new APIError(
          errorMessage || `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as T;
      }

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on client errors (4xx) or aborted requests
      if (
        error instanceof APIError && 
        error.status && 
        (error.status >= 400 && error.status < 500)
      ) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying
      const delay = retryDelay * Math.pow(backoffMultiplier, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Helper for GET requests
export const apiGet = <T = unknown>(url: string, retryOptions?: RetryOptions): Promise<T> =>
  apiCall<T>(url, { method: 'GET' }, retryOptions);

// Helper for POST requests
export const apiPost = <T = unknown>(
  url: string, 
  data?: unknown, 
  retryOptions?: RetryOptions
): Promise<T> =>
  apiCall<T>(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  }, retryOptions);

// Helper for file uploads
export const apiUpload = <T = unknown>(
  url: string,
  file: File,
  retryOptions?: RetryOptions
): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiCall<T>(url, {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header for FormData - browser will set it with boundary
    headers: {},
  }, retryOptions);
};

// Health check function
export const checkAPIHealth = async (baseUrl: string): Promise<boolean> => {
  try {
    await apiGet(`${baseUrl}/health`, { maxRetries: 1 });
    return true;
  } catch {
    return false;
  }
};

// Error message helper
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Check if error is network-related
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof APIError) {
    return !error.status || error.status >= 500;
  }
  if (error instanceof Error) {
    return error.message.includes('fetch') || 
           error.message.includes('network') ||
           error.message.includes('timeout');
  }
  return false;
};