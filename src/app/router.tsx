import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from '../App';
import ErrorComponent from '../components/error-component/ErrorComponent';
import Welcome from '../pages/welcome/Welcome';
import Authorisation from '../pages/authorization/Authorization';
import Editor from '../pages/main/Editor';
import NotFound from '../pages/not-found/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorComponent />}>
      <Route index element={<Welcome />} />
      <Route path="login" element={<Authorisation />} />
      <Route path="signup" element={<Authorisation />} />
      <Route path="editor" element={<Editor />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
