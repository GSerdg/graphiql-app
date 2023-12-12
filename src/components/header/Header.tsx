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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../shared/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../shared/firebase';
import './Header.scss';

export default function Header() {
  const [lang, setLang] = useState('en');
  const [user] = useAuthState(auth);
  console.log(lang);

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
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ padding: '0 !important' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button component={Link} color="inherit" size="large" to="/">
                Home
              </Button>
            </Box>
            <Stack direction="row" sx={{ mr: '2rem', alignItems: 'center' }}>
              <Typography>En</Typography>
              <Switch onChange={handleSwitch} color="default" data-testid="langSwitcher" />
              <Typography>Ru</Typography>
            </Stack>
            {!user && (
              <ButtonGroup size="small">
                <Button component={Link} color="inherit" to="/login">
                  Log in
                </Button>
                <Button component={Link} color="inherit" to="/signup">
                  Sign up
                </Button>
              </ButtonGroup>
            )}
            {user && (
              <Button color="inherit" variant="outlined" onClick={handleSignout} size="small">
                Log out
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
