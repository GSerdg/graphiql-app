import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import { setupStore } from './app/store';
import ErrorComponent from './components/error-component/ErrorComponent';
import { RequireAuth } from './components/requare-auth/RequareAuth';
import LoginPage from './pages/login/LoginPage';
import Editor from './pages/main/Editor';
import SignupPage from './pages/signup/SignupPage';
import Welcome from './pages/welcome/Welcome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorComponent />}>
      <Route index element={<Welcome />} />
      <Route
        path="login"
        element={
          <RequireAuth>
            <LoginPage />
          </RequireAuth>
        }
      />
      <Route
        path="signup"
        element={
          <RequireAuth>
            <SignupPage />
          </RequireAuth>
        }
      />
      <Route path="editor" element={<Editor />} />
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
