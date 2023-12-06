import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import './Header.scss';
import { Link } from 'react-router-dom';
import LinkMUI from '@mui/material/Link';

export default function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <LinkMUI
            sx={{ flexGrow: 1 }}
            component={Link}
            underline="none"
            color="inherit"
            to="/"
          >
            GraphiQL
          </LinkMUI>
          <Button
            component={Link}
            color="inherit"
            sx={{ mr: '0.5rem' }}
            to="/login"
          >
            Log in
          </Button>
          <Button component={Link} color="inherit" to="/signup">
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
