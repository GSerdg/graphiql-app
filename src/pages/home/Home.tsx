import {
  Box,
  Button,
  Checkbox,
  Container,
  Typography,
  Divider,
  Chip,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import gserg from '/image/gserg.jpg';

export default function Home() {
  const [auth, setAuth] = useState(false);

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
    <Container sx={{ flexGrow: 1 }}>
      <Box
        mt="2rem"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            width: '35rem',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: '3.3rem',
          }}
        >
          Debugging your GraphQL server was never this easy!
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            width: '30rem',
            textAlign: 'center',
            fontWeight: 400,
            fontSize: '1.2rem',
            marginBottom: '1rem',
          }}
        >
          GraphiQL Client helps you debug GraphQL queries and implementations -
          taking care of the hard part so you can focus on actually getting
          things done.
        </Typography>
        <Checkbox color="default" onChange={handleAuth} />
        {!auth && (
          <Box sx={{ marginBottom: '5rem' }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{ marginRight: '1rem' }}
            >
              Log in
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
            >
              Sign up
            </Button>
          </Box>
        )}
        {auth && (
          <Button
            variant="contained"
            onClick={handleSignout}
            size="large"
            sx={{ marginBottom: '5rem' }}
          >
            Graph
            <Typography
              sx={{
                textTransform: 'lowercase',
                fontStyle: 'italic',
                marginRight: '0.2rem',
              }}
            >
              i
            </Typography>
            QL
          </Button>
        )}
      </Box>
      <Divider
        sx={{
          ':before': { borderTop: 'thin solid #42a5f5' },
          ':after': { borderTop: 'thin solid #42a5f5' },
        }}
      >
        <Chip label="OUR TEAM" color="primary" variant="outlined" />
      </Divider>
      <Box>
        <Avatar
          src={gserg}
          alt="gserg"
          variant="rounded"
          sx={{
            width: '10rem',
            height: '10rem',
            // border: '5px solid #1565c0',
            boxShadow: '0 0 10px 0px #424242',
          }}
        />
      </Box>
    </Container>
  );
}
