import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './modules/layouts/RootLayout'
import CardsOnePage from './modules/cards/CardsOnePage'
import CardsTwoPage from './modules/cards/CardsTwoPage'
import ChartsPage from './modules/charts/ChartsPage'
import TablePage from './modules/table/TablePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <CardsOnePage /> },
      { path: 'cards-2', element: <CardsTwoPage /> },
      { path: 'charts', element: <ChartsPage /> },
      { path: 'table', element: <TablePage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


