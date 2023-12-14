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
import { LangContext } from '../../App';
import { auth, logout } from '../../shared/firebase';
import './Header.scss';

export default function Header() {
  const { setLang } = useContext(LangContext);
  const [user] = useAuthState(auth);
  const [isSticky, setIsSticky] = useState(false);

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
      setLang('ru');
    } else {
      setLang('en');
    }
  };

  const handleSignout = () => {
    logout();
  };

  return (
    <>
      <AppBar position="fixed" className={isSticky ? 'app-bar--sticky' : 'app-bar'}>
        <Container className="header" maxWidth="xl">
          <Toolbar className="header__toolbar">
            <Box sx={{ flexGrow: 1 }}>
              <Button
                component={Link}
                color="inherit"
                to="/"
                className="header__button--home"
                sx={{ padding: 0 }}
              >
                Home
              </Button>
            </Box>
            <Stack direction="row" sx={{ mr: '2rem', alignItems: 'center' }}>
              <Typography>En</Typography>
              <Switch onChange={handleSwitch} color="default" data-testid="langSwitcher" />
              <Typography>Ru</Typography>
            </Stack>
            {!user && (
              <ButtonGroup>
                <Button component={Link} color="inherit" to="/login" className="header__button">
                  Log in
                </Button>
                <Button component={Link} color="inherit" to="/signup" className="header__button">
                  Sign up
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
                  Main page
                </Button>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleSignout}
                  className="header__button"
                  endIcon={<LogoutIcon />}
                >
                  Log out
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
