import {
  Box,
  Button,
  Checkbox,
  Container,
  Typography,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { ourTeam } from './team-data';
import { CustomCard } from './card';

export default function Home() {
  const [auth, setAuth] = useState(false);

  const handleAuth = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAuth(true);
    } else {
      setAuth(false);
    }
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
            component={Link}
            to="/graphiql"
            variant="contained"
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
      <Stack
        className="card-list"
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        margin="5rem 0"
        justifyContent="space-evenly"
      >
        {ourTeam.map((member, index) => {
          return (
            <CustomCard
              key={index}
              name={member.name}
              gitLink={member.gitLink}
              gitName={member.gitName}
              image={member.image}
              description={member.description}
            />
          );
        })}
      </Stack>
    </Container>
  );
}
