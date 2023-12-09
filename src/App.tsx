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
import { createContext, useState } from 'react';

interface LangContext {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

export const LangContext = createContext<LangContext>({} as LangContext);

function App() {
  const [lang, setLang] = useState('en');
  console.log(lang);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
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
            <Outlet />
            <Footer />
          </Box>
        </CssBaseline>
      </ErrorBoundary>
    </LangContext.Provider>
  );
}

export default App;
