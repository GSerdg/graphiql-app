import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import AdditionalEditor from '../additional-editor/AdditionalEditor';

interface MainEditorType {
  isDocsOpen: boolean;
  children: ReactNode;
}

const MainEditor = ({ isDocsOpen, children }: MainEditorType) => {
  return (
    <Stack
      sx={{
        transition: '0.5s',
        flexGrow: isDocsOpen ? 1 : 2,
        height: { xs: '50%', md: '100%' },
        minHeight: '250px',
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
