import { Box, Button, Typography } from '@mui/material';

const EndpointField = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#507DAC',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #38516B',
        justifyContent: 'space-between',
        borderRadius: '5px 0 0 0',
        height: '2rem',
      }}
    >
      <Typography sx={{ padding: '0 0 0 24px', color: '#fffffc' }}>Endpoint:</Typography>
      <input type="text" className="editor__endpoint-input" />
      <Button
        variant="contained"
        className="editor__button"
        disableElevation
        sx={{
          boxShadow: 'none',
          backgroundColor: '#38516B',
          borderRadius: 0,
          alignSelf: 'stretch',
        }}
      >
        Change endpoint
      </Button>
    </Box>
  );
};

export { EndpointField };
