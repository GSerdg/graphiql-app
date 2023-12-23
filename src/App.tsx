import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import useNotification from './components/notification/Notification';
import { LangProvider } from './contexts/localization';
import './index.scss';

function App() {
  const { Notification } = useNotification();

  return (
    <LangProvider>
      <ErrorBoundary>
        <CssBaseline>
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              minHeight: '100vh',
              paddingTop: '64px',
            }}
          >
            <Header />
            <Notification />
            <Outlet />
            <Footer />
          </Box>
        </CssBaseline>
      </ErrorBoundary>
    </LangProvider>
  );
}

export default App;
