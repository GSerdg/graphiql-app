import { Box, Button, Checkbox, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

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
        {!auth && (
          <Box>
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
          <Button variant="contained" onClick={handleSignout} size="large">
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
        <Checkbox color="default" onChange={handleAuth} />
      </Box>
    </Container>
  );
}
