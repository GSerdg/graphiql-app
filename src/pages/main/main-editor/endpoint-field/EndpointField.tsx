import { Box, Button, Typography } from '@mui/material';

const EndpointField = () => {
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
      <Typography sx={{ padding: '0 0 0 24px', color: '#fffffc' }}>Endpoint:</Typography>
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
        Change
      </Button>
    </Box>
  );
};

export default EndpointField;
