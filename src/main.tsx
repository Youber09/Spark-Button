import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './Components/ErrorPage.tsx'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ImgPage from './Components/ImgPage.tsx'
import Add from './Components/Add.tsx'
import ButtonDialog from './Components/Test.js'

const queryClient = new QueryClient({defaultOptions:{
  queries:{
    staleTime: 1000 *60*5,
  },
},})


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/Image/:Id',
        element:<ImgPage />,
        errorElement: <ErrorPage />,
      },
      {
        path:'/Add',
        element:<Add />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path:'/Debug',
    errorElement: <ErrorPage />,
    element: <ButtonDialog />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} ></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
