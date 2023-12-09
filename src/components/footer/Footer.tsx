import { Box, Container, Typography, List } from '@mui/material';
import './Footer.scss';
import logo from '/svg/rs_school_js.svg';
import { GitLink } from './GitLink';
import { ourTeam } from '../../pages/home/team-data';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
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
        <Typography component="span" color="inherit" sx={{ color: '#fffffc' }}>
          2023
        </Typography>
        <List sx={{ padding: '0.2rem 0' }}>
          {ourTeam.map((member, index) => {
            return (
              <GitLink
                key={index}
                gitName={member.gitName}
                gitLink={member.gitLink}
              />
            );
          })}
        </List>
      </Container>
    </Box>
  );
}
