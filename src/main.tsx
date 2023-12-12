import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import { setupStore } from './app/store';
import ErrorComponent from './components/error-component/ErrorComponent';
import Authorisation from './pages/authorization/Authorization';
import Welcome from './pages/welcome/Welcome';
import Editor from './pages/main/Editor';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorComponent />}>
      <Route index element={<Welcome />} />
      <Route path="login" element={<Authorisation />} />+
      <Route path="signup" element={<Authorisation />} />
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
