import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { LangContext } from '../../contexts/localization';
import { auth, logout } from '../../shared/firebase';
import './Header.scss';
import { useLocalizer } from '../../localization/language';

export default function Header() {
  const { lang, setLang } = useContext(LangContext);
  const [user] = useAuthState(auth);
  const [isSticky, setIsSticky] = useState(false);
  const localize = useLocalizer();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 60) {
        setIsSticky(true);
      } else if (scrollTop < 10) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      localStorage.setItem('lang', 'ru');
      setLang('ru');
    } else {
      localStorage.setItem('lang', 'en');
      setLang('en');
    }
  };

  const handleSignout = () => {
    logout();
  };

  return (
    <AppBar position="fixed" className={isSticky ? 'app-bar--sticky' : 'app-bar'}>
      <Container className="header" maxWidth={false}>
        <Toolbar className="header__toolbar">
          <Box sx={{ flexGrow: 1 }}>
            <Button
              component={Link}
              color="inherit"
              to="/"
              className="header__button--home"
              sx={{ padding: 0 }}
            >
              {localize('headerHomeButton')}
            </Button>
          </Box>
          <Stack direction="row" sx={{ mr: '2rem', alignItems: 'center' }}>
            <Typography>{localize('languageSwitchEn')}</Typography>
            <Switch
              onChange={handleSwitch}
              color="default"
              data-testid="langSwitcher"
              checked={lang === 'ru'}
            />
            <Typography>{localize('languageSwitchRu')}</Typography>
          </Stack>
          {!user && (
            <ButtonGroup>
              <Button component={Link} color="inherit" to="/login" className="header__button">
                {localize('headerLoginButton')}
              </Button>
              <Button component={Link} color="inherit" to="/signup" className="header__button">
                {localize('headerSignupButton')}
              </Button>
            </ButtonGroup>
          )}
          {user && (
            <>
              <Button
                component={Link}
                color="inherit"
                variant="outlined"
                to="/editor"
                className="header__button"
                sx={{ marginRight: '1rem' }}
              >
                {localize('headerMainPageButton')}
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleSignout}
                className="header__button"
                endIcon={<LogoutIcon />}
              >
                {localize('headerLogoutButton')}
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
