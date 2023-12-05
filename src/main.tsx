import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './index.css';
import ErrorComponent from './components/error-component/ErrorComponent';
import { Provider } from 'react-redux';
import App from './App';
import { setupStore } from './app/store';
import Home from './pages/home/Home';
import Authorisation from './pages/authorisation/Authorysation';
import Graphyql from './pages/graphyql/Graphyql';

export const PATHS = {
  HOME: '/',
  AUTH: 'auth',
  GRAPHYQL: 'graphyql',
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={PATHS.HOME}
      element={<App />}
      errorElement={<ErrorComponent />}
    >
      <Route index element={<Home />} />
      <Route path={PATHS.AUTH} element={<Authorisation />} />
      <Route path={PATHS.GRAPHYQL} element={<Graphyql />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
