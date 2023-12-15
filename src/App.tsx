import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Notification from './components/notification/Notification';
import Provider from './contexts/Provider';
import './index.scss';

function App() {
  return (
    <Provider>
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
    </Provider>
  );
}

export default App;
