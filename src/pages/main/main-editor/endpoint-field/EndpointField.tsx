import { Box, Button, Typography } from '@mui/material';
import { useLocalizer } from '../../../../contexts/localization';

const EndpointField = () => {
  const localize = useLocalizer();

  return (
    <Box
      sx={{
        backgroundColor: '#292D30',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #48515B',
        borderRight: 'none',
        justifyContent: 'space-between',
        height: '2rem',
      }}
    >
      <Typography sx={{ padding: { xs: '0 0 0 12px', sm: '0 0 0 24px' }, color: '#fffffc' }}>
        {localize('endpoint')}
      </Typography>
      <input type="text" className="editor__endpoint-input" />
      <Button
        variant="contained"
        className="editor__button"
        disableElevation
        sx={{
          boxShadow: 'none',
          backgroundColor: '#AD7630',
          borderRadius: 0,
          alignSelf: 'stretch',
        }}
      >
        {localize('mainChangeButton')}
      </Button>
    </Box>
  );
};

export default EndpointField;
