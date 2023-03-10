import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { Main } from './components/Pages/Main/Main'
// import { ProductsList } from './components/Pages/ProductsList/ProductsList'
import { SigninPage } from './components/Pages/SigninPage/SigninPage'
import { SignupPage } from './components/Pages/SignupPage/SignupPage'
import { store } from './redux/store'
import { Cart } from './components/Pages/Cart/Cart'
import { Catalog } from './components/Pages/Catalog/Catalog'
import { Account } from './components/Pages/Account/Account'
import { ProductDetail } from './components/ProductDetail/ProductDetail'
import { FavouriteList } from './components/Pages/FavouritesList/FavouritesList'

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
        element: <Catalog />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetail />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/favourite',
        element: <FavouriteList />,
      },
      {
        path: '/account',
        element: <Account />,
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
