import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Default options for React Query Client
 */
const defaultQueryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on window focus by default
      retry: 1, // Retry failed queries once by default
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
    },
    mutations: {
      retry: 0, // Don't retry failed mutations
    },
  },
};

/**
 * Create a new QueryClient with custom options
 */
const createQueryClient = () => new QueryClient(defaultQueryClientOptions);

/**
 * Provides React Query context to the application
 */
export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // Create a new QueryClient instance for each component tree
  // This ensures that data is not shared between different users/sessions
  const [queryClient] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools can be added here if needed.
          You'll need to install:
          npm install @tanstack/react-query-devtools
          and then uncomment:
          
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      */}
    </QueryClientProvider>
  );
};

export default QueryProvider; 