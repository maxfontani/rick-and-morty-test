import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorScreen } from '../components';
import { Character, Root } from '.';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    ErrorBoundary: ErrorScreen,
  },
  {
    path: '/character/:characterId',
    element: <Character />,
    ErrorBoundary: ErrorScreen,
  },
]);

export default router;
