import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from './component/layout/footer/Footer'
import Navbar from './component/layout/navbar/Navbar'
import Router from './component/routers/Router'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppProvider from './context/AppContext'
const MINUTE = 1000 * 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE,
    },
  },
});
function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Router />
            <ReactQueryDevtools initialIsOpen={false} />
            <Footer />
          </QueryClientProvider>
        </AppProvider>
      </BrowserRouter>

    </>
  )
}

export default App
