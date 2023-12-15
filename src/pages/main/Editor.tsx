import { Container, Box, Stack } from '@mui/material';
import { QueryEditor } from './query-editor/QueryEditor';
import { JSONViewer } from './json-viewer/JSONViewer';
import './Editor.scss';

export default function Editor() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: '1rem 1rem',
      }}
    >
      <Container
        sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}
        maxWidth="xl"
        className="editor"
      >
        <Stack
          flexDirection="row"
          sx={{
            height: 'calc(100vh - 12rem)',
            flexGrow: 1,
            border: '2px solid #38516B',
            borderRadius: '8px',
          }}
        >
          <QueryEditor />
          <JSONViewer />
        </Stack>
      </Container>
    </Box>
  );
}
