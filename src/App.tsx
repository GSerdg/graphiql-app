import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './index.scss';

function App() {
  return (
    <ErrorBoundary>
      <CssBaseline>
        <Box sx={{ flexDirection: 'column', display: 'flex', minHeight: '100vh' }}>
          <Header />
          <Outlet />
          <Footer />
        </Box>
      </CssBaseline>
    </ErrorBoundary>
  );
}

export default App;
