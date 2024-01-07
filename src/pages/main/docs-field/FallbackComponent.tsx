import { CssBaseline, Stack, Typography } from '@mui/material';
import { useLocalizer } from '../../../contexts/localization';

export default function FallbackComponent() {
  const localize = useLocalizer();

  return (
    <CssBaseline>
      <Stack
        sx={{
          color: 'white',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '2rem',
        }}
      >
        <Typography component={'h1'} sx={{ fontSize: '2rem', textAlign: 'center' }}>
          {localize('documentationFallbackHeader')}
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>{localize('documentationFallbackDescription')}</Typography>
      </Stack>
    </CssBaseline>
  );
}
