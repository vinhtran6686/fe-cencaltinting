import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ConfigProvider, App as AntdApp } from 'antd'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '../store'
import themeConfig from '../theme/themeConfig'
import '../styles/globals.css'
import AppLayout from '../components/layout/AppLayout'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import NotificationProvider from '../components/providers/NotificationProvider'

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
          <AntdApp>
            <NotificationProvider>
              <ProtectedRoute>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </ProtectedRoute>
            </NotificationProvider>
          </AntdApp>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
