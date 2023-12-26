import { Box, Container, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Editor.scss';
import AsideEditorMiddle from './aside-editor/AsideEditorMiddle';
import AsideEditorSmall from './aside-editor/AsideEditorSmall';
import MainEditor from './main-editor/MainEditor';

const md = 900;

export default function Editor() {
  const matches = useMediaQuery(`(min-width:${md}px)`);

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
        maxWidth={false}
        className="editor"
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            height: 'calc(100vh - 12rem)',
            flexGrow: 1,
          }}
        >
          <MainEditor />
          {matches && <AsideEditorMiddle />}
          {!matches && <AsideEditorSmall />}
        </Stack>
      </Container>
    </Box>
  );
}
