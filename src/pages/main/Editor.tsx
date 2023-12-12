import { Container, Box, Typography, Stack, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Editor.scss';

export default function Editor() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        padding: '1rem 1rem',
      }}
    >
      <Container
        sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}
        maxWidth="xl"
        className="editor"
      >
        <Stack flexDirection="row" sx={{ height: '100%', border: '2px solid #507DAC', borderRadius: '8px' }}>
          <Box
            sx={{
              backgroundColor: '#fffffc',
              width: '55%',
              borderRadius: '8px 0 0 8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#507DAC',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '2px solid #507DAC',
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
                  backgroundColor: '#38516B',
                  borderRadius: 0,
                  alignSelf: 'stretch',
                }}
              >
                Change endpoint
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'stretch' }}>
              <Box sx={{ borderRadius: '0 0 0 8px', display: 'flex', flexDirection: 'column' }}>
                {Array(20)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <Typography
                        sx={{
                          padding: '0 1rem 0 0.5rem',
                          fontSize: '0.9rem',
                          lineHeight: '1.4rem',
                          textAlign: 'right',
                          color: '#727980',
                        }}
                        key="index"
                      >
                        {index + 1}
                      </Typography>
                    );
                  })}
              </Box>
              <textarea className="editor__request">Qwery</textarea>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#507DAC',
              width: '46%',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#507DAC',
                display: 'flex',
                flexDirection: 'row-reverse',
                borderBottom: '2px solid #507DAC',
                justifyContent: 'space-between',
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
                  borderRadius: '0 7px 0 0',
                  float: 'left',
                }}
                startIcon={<ArrowBackIosIcon />}
              >
                DOCS
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
