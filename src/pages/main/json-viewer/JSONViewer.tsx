import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const JSONViewer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#507DAC',
        width: '46%',
        borderRadius: '0 5px 5px 0',
        borderLeft: '2px solid #38516B',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#507DAC',
          display: 'flex',
          flexDirection: 'row-reverse',
          borderBottom: '2px solid #507DAC',
          justifyContent: 'space-between',
          borderRadius: '0 8px 8px 0',
          height: '2rem',
        }}
      >
        <Button
          variant="contained"
          disableElevation
          className="editor__button"
          sx={{
            boxShadow: 'none',
            backgroundColor: '#38516B',
            borderRadius: '0 5px 0 0',
            float: 'left',
          }}
          startIcon={<ArrowBackIosIcon />}
        >
          DOCS
        </Button>
      </Box>
    </Box>
  );
};

export { JSONViewer };
