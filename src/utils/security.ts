import DOMPurify from 'dompurify';  

/**
 * Sanitize HTML content to prevent XSS
 */
export const sanitizeHtml = (content: string): string => {
  if (typeof window === 'undefined') {
    return content; // Run on server
  }
  return DOMPurify.sanitize(content);
};

/**
 * Sanitize request data before sending
 */
export const sanitizeRequestData = (data: any): any => {
  if (!data) return data;
  
  // If it's a string that might contain HTML, sanitize it
  if (typeof data === 'string') {
    return sanitizeHtml(data);
  }
  
  // If it's an array, sanitize each element
  if (Array.isArray(data)) {
    return data.map(item => sanitizeRequestData(item));
  }
  
  // If it's an object, sanitize each property
  if (typeof data === 'object' && data !== null) {
    const sanitizedObj: Record<string, any> = {};
    
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        sanitizedObj[key] = sanitizeRequestData(data[key]);
      }
    }
    
    return sanitizedObj;
  }
  
  // Keep other primitive types as is
  return data;
};

/**
 * Sanitize response data before using
 */
export const sanitizeResponseData = (data: any): any => {
  if (!data) return data;
  
  // If it's a string that might contain HTML, sanitize it
  if (typeof data === 'string' && (data.includes('<') || data.includes('>'))) {
    return sanitizeHtml(data);
  }
  
  // If it's an array, sanitize each element
  if (Array.isArray(data)) {
    return data.map(item => sanitizeResponseData(item));
  }
  
  // If it's an object, sanitize each property
  if (typeof data === 'object' && data !== null) {
    const sanitizedObj: Record<string, any> = {};
    
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        sanitizedObj[key] = sanitizeResponseData(data[key]);
      }
    }
    
    return sanitizedObj;
  }
  
  // Keep other primitive types as is
  return data;
};

/**
 * Check and sanitize URL to prevent open redirect
 */
export const sanitizeUrl = (url: string): string => {
  // Check if URL is relative or belongs to the same domain
  const isSafeUrl = /^(\/|https?:\/\/[^/]+\.yourdomain\.com)/i.test(url);
  
  if (!isSafeUrl) {
    return '/'; // Return home page if URL is not safe
  }
  
  return url;
};

/**
 * Encrypt sensitive data (e.g. PII) before saving
 */
export const encryptSensitiveData = (data: string): string => {
  // In practice, you will use stronger encryption libraries
  // This is a simple example
  return btoa(data);
};

/**
 * Decrypt sensitive data
 */
export const decryptSensitiveData = (encryptedData: string): string => {
  try {
    return atob(encryptedData);
  } catch (error) {
    return '';
  }
};