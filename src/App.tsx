import { Box, CssBaseline } from '@mui/material';
import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Notification from './components/notification/Notification';
import './index.scss';
import { SupportedLocales } from './shared/types';

interface LangContext {
  lang: SupportedLocales;
  setLang: React.Dispatch<React.SetStateAction<SupportedLocales>>;
}

export const LangContext = createContext<LangContext>({} as LangContext);

function App() {
  const [lang, setLang] = useState<SupportedLocales>('en');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <ErrorBoundary>
        <CssBaseline>
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              minHeight: '100vh',
              paddingTop: '4rem',
            }}
          >
            <Header />
            <Notification />
            <Outlet />
            <Footer />
          </Box>
        </CssBaseline>
      </ErrorBoundary>
    </LangContext.Provider>
  );
}

export default App;
