import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  const [lang, setLang] = useState('en');
  const [auth, setAuth] = useState(false);
  console.log(lang);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setLang('ru');
    } else {
      setLang('en');
    }
  };

  const handleAuth = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  const handleSignout = () => {
    console.log('User logout');
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
              <Switch
                onChange={handleSwitch}
                color="default"
                data-testid="langSwitcher"
              />
              <Typography>Ru</Typography>
            </Stack>
            {!auth && (
              <ButtonGroup size="small">
                <Button component={Link} color="inherit" to="/login">
                  Log in
                </Button>
                <Button component={Link} color="inherit" to="/signup">
                  Sign up
                </Button>
              </ButtonGroup>
            )}
            {auth && (
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleSignout}
                size="small"
              >
                Log out
              </Button>
            )}
            <Checkbox color="default" onChange={handleAuth} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
