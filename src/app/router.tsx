import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import ErrorComponent from '../components/error-component/ErrorComponent';
import Welcome from '../pages/welcome/Welcome';
import Editor from '../pages/main/Editor';
import NotFound from '../pages/not-found/NotFound';
import { PrivateRoute } from '../components/private-route/PrivateRoute';
import { RedirectAuthorizedUserRoute } from '../components/requare-auth/RequareAuth';
import SignupPage from '../pages/signup/SignupPage';
import LoginPage from '../pages/login/LoginPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorComponent />}>
      <Route index element={<Welcome />} />
      <Route
        path="login"
        element={
          <RedirectAuthorizedUserRoute>
            <LoginPage />
          </RedirectAuthorizedUserRoute>
        }
      />
      <Route
        path="signup"
        element={
          <RedirectAuthorizedUserRoute>
            <SignupPage />
          </RedirectAuthorizedUserRoute>
        }
      />
      <Route
        path="editor"
        element={
          <PrivateRoute>
            <Editor />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
