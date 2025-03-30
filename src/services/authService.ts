import axios from 'axios';

interface AuthTokens {
  token: string;
  refreshToken: string;
}

// Save tokens to localStorage
export const saveTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('token', tokens.token);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Clear tokens when logging out
export const clearTokens = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

// Function to refresh token when current token expires
export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
     
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      { refreshToken }
    );
    
    if (response.data?.token) {
      const newTokens = {
        token: response.data.token,
        refreshToken: response.data.refreshToken || refreshToken
      };
      
      saveTokens(newTokens);
      return newTokens.token;
    }
    
    return null;
  } catch (error) {
    clearTokens();
    return null;
  }
};

// Function to login
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password }
    );
    
    if (response.data?.token) {
      saveTokens({
        token: response.data.token,
        refreshToken: response.data.refreshToken
      });
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
};

// Function to logout
export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      // Notify server that user has logged out
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearTokens();
    window.location.href = '/login';
  }
};