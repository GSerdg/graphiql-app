import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import AdditionalEditor from '../additional-editor/AdditionalEditor';

interface MainEditorType {
  children: ReactNode;
}

const MainEditor = ({ children }: MainEditorType) => {
  return (
    <Stack
      sx={{
        flexGrow: { xs: 1, md: 2 },
        height: { xs: '20%', md: '100%' },
        width: { xs: '100%', md: '20%' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
      <AdditionalEditor />
    </Stack>
  );
};

export default MainEditor;
