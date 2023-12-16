import { Box, Container, Stack } from '@mui/material';
import './Editor.scss';
import { JSONViewer } from './json-viewer/JSONViewer';
import { QueryEditor } from './query-editor/QueryEditor';

export default function Editor() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'stretch',
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
          }}
        >
          <QueryEditor />
          <JSONViewer />
        </Stack>
      </Container>
    </Box>
  );
}
