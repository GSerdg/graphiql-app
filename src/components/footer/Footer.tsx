import { Box, Container, List, Typography } from '@mui/material';
import { useContext } from 'react';
import { LangContext } from '../../contexts/localization';
import { ourTeam } from '../../pages/welcome/team-data';
import './Footer.scss';
import { GitLink } from './GitLink/GitLink';
import logo from '/svg/rs_school_js.svg';

export default function Footer() {
  const { lang } = useContext(LangContext);

  return (
    <Box sx={{ backgroundColor: '#2E3235' }}>
      <Container
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
        }}
        maxWidth="xl"
      >
        <a href="https://rs.school/react/" className="footer__logo">
          <img src={logo} alt="rss_logo" className="logo" />
        </a>
        <Typography component="span" color="inherit" sx={{ color: '#fffffc' }}>
          2023
        </Typography>
        <List sx={{ padding: '0.2rem 0' }}>
          {ourTeam[lang].map((member, index) => {
            return <GitLink key={index} gitName={member.gitName} gitLink={member.gitLink} />;
          })}
        </List>
      </Container>
    </Box>
  );
}
