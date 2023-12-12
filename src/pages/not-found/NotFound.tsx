import { Box, Button, Container, Typography } from '@mui/material';
import rhino from '/svg/rhino.svg';
import './NotFound.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        background:
          'linear-gradient(239deg, #00ADE3 14.85%, rgba(0, 194, 255, 0.11) 97.1%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container
        sx={{
          flexGrow: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img className="not-found__image" src={rhino} alt="rhino"></img>
        <Box
          sx={{
            position: 'relative',
            m: '0 auto 25%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: 'fit-content',
            rowGap: '2rem',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            component={'h1'}
            sx={{ fontWeight: 700, textAlign: 'center' }}
          >
            404{' '}
            <Typography variant="h3" component={'span'}>
              page not Found
            </Typography>
          </Typography>
          <Typography
            sx={{ maxWidth: '40rem', padding: '1rem', textAlign: 'center' }}
          >
            Sorry but the page you are looking for does not exist, have been
            removed, name changed or is temporarily unavailable
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={'/'}
            sx={{
              width: 'fit-content',
              alignSelf: 'flex-end',
              color: 'white',
              backgroundColor: '#1976d2',
            }}
          >
            Go to Homepage
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
