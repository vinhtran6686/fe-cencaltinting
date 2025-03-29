import React from 'react'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '../store'
import themeConfig from '../theme/themeConfig'
import '../styles/globals.css'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfig}>
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
