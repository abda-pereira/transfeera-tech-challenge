import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Receivers from './pages/receivers/Receivers.jsx';
import NewReceiver from './pages/receivers/NewReceiver.jsx';
import ErrorPage from './pages/error/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/",
        element: <Receivers />
      },
      {
        path: '/receiver',
        element: <NewReceiver />
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
