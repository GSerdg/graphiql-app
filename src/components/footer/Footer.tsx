import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.scss';
import logo from '/svg/rs_school_js.svg';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.light' }}>
      <Container
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <a href="https://rs.school/react/">
          <img src={logo} alt="rss_logo" className="logo" />
        </a>
        <Typography component="span" color="inherit" sx={{ color: '#0a2e52' }}>
          2023
        </Typography>
        <List sx={{ padding: '1rem 0' }}>
          <ListItem sx={{ padding: '0 0 0.2rem' }}>
            <Link
              href="https://github.com/gserdg"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#0F4982',
                transition: '0.3s',
                ':hover': {
                  color: '#0a2e52',
                },
              }}
              underline="none"
            >
              <GitHubIcon fontSize="small" sx={{ mr: '0.5rem' }} />
              GSerdg
            </Link>
          </ListItem>
          <ListItem sx={{ padding: '0 0 0.2rem' }}>
            <Link
              href="https://github.com/DonStacky"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#0F4982',
                transition: '0.3s',
                ':hover': {
                  color: '#0a2e52',
                },
              }}
              underline="none"
            >
              <GitHubIcon fontSize="small" sx={{ mr: '0.5rem' }} />
              DonStacky
            </Link>
          </ListItem>
          <ListItem sx={{ padding: '0 0 0.2rem' }}>
            <Link
              href="https://github.com/user42022"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#0F4982',
                transition: '0.3s',
                ':hover': {
                  color: '#0a2e52',
                },
              }}
              underline="none"
            >
              <GitHubIcon fontSize="small" sx={{ mr: '0.5rem' }} />
              user42022
            </Link>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
}
