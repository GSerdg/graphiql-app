import { Box, Stack } from '@mui/material';
import DocsField from '../docs-field/DocsField';
import { ReactNode } from 'react';

export interface AsideEditorType {
  isDocsOpen: boolean;
  children: ReactNode;
}

const AsideEditor = ({ isDocsOpen, children }: AsideEditorType) => {
  return (
    <Stack
      sx={{
        transition: '0.5s',
        flexGrow: isDocsOpen ? 2 : 1,
        height: { xs: '50%', md: '100%' },
        width: { xs: '100%', md: '20%' },
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          transition: '0.5s',
          backgroundColor: '#292D30',
          flexGrow: 1,
          position: 'relative',
          border: '1px solid #48515B',
          borderTop: { xs: 'none' },
          borderRight: 'none',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
      <DocsField isDocsOpen={isDocsOpen} />
    </Stack>
  );
};

export default AsideEditor;
