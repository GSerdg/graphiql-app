import { Box } from '@mui/material';
import DocsField from '../docs-field/DocsField';
import { ReactNode } from 'react';

export interface AsideEditorType {
  children: ReactNode;
}

const AsideEditorMiddle = ({ children }: AsideEditorType) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#292D30',
          flexGrow: 1,
          width: '20%',
          border: '1px solid #48515B',
          borderRight: 'none',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
      <DocsField />
    </>
  );
};

export default AsideEditorMiddle;
