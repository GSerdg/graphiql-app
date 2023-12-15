import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useState } from 'react';

const JSONViewer = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => {
    setIsDocsOpen(isOpen);
  };

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
          onClick={() => {
            toggleDrawer(true);
          }}
        >
          DOCS
        </Button>
      </Box>
      <Drawer
        anchor="right"
        open={isDocsOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#507DAC',
            padding: '2rem',
            height: '100%',
            color: '#fffffc',
          }}
        >
          <Typography>Side Docs Panel</Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export { JSONViewer };
