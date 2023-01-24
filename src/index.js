import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { Main } from './components/Pages/Main/Main'
import { ProductsList } from './components/Pages/ProductsList/ProductsList'
import { SigninPage } from './components/Pages/SigninPage/SigninPage'
import { SignupPage } from './components/Pages/SignupPage/SignupPage'
import { QueryContextProvider } from './context/QueryContextProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/products',
        element: <ProductsList />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QueryContextProvider>
        <RouterProvider router={router} />
      </QueryContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
