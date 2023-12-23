import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { useLocalizer } from '../../localization/language';
import ErrorAlert from './ErrorAlert';

interface FallbackProps {
  error: Error;
}

export default function FallbackComponent(props: FallbackProps) {
  const localize = useLocalizer();

  return (
    <CssBaseline>
      <Box className="error-wrapper">
        <Container>
          <Box className="error-header">
            <Box sx={{ color: 'white' }}>
              <Typography component={'h1'} sx={{ fontSize: '2rem' }}>
                {localize('FallbackComponentHeader')}
              </Typography>
              <Typography>{localize('FallbackComponentDescription')}</Typography>
            </Box>
            <img className="error-image" src="svg/error-905.svg" alt="Error image" />
          </Box>
          <ErrorAlert {...props}></ErrorAlert>
        </Container>
      </Box>
    </CssBaseline>
  );
}
