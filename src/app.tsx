import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import './styles/global.css';

export const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);