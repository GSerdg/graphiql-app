import { Box, Container, Stack } from '@mui/material';
import { ReactNode } from 'react';

interface EditorInnerType {
  children: ReactNode;
}

const EditorInner = ({ children }: EditorInnerType) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '0' } }} maxWidth={false}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            height: 'calc(100vh - 12rem)',
            flexGrow: 1,
          }}
        >
          {children}
        </Stack>
      </Container>
    </Box>
  );
};

export default EditorInner;
