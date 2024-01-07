import { Box, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { ReactNode } from 'react';
import DocsField from '../docs-field/DocsField';
import { DocumentationProvider } from '../../../contexts/docs';

export interface AsideEditorType {
  isDocsOpen: boolean;
  isLoading: boolean;
  children: ReactNode;
}

const AsideEditor = ({ isDocsOpen, children, isLoading }: AsideEditorType) => {
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
        }}
      >
        {children}
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '46%',
              right: '46%',
            }}
          />
        )}
      </Box>
      <DocumentationProvider>
        <DocsField isDocsOpen={isDocsOpen} />
      </DocumentationProvider>
    </Stack>
  );
};

export default AsideEditor;
