import { Box } from '@mui/material';
import DocsField from '../docs-field/DocsField';

const AsideEditorMiddle = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#292D30',
          flexGrow: 1,
          width: '20%',
          border: '1px solid #48515B',
          borderRight: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            height: '100%',
            overflow: 'auto',
          }}
        ></Box>
      </Box>
      <DocsField />
    </>
  );
};

export default AsideEditorMiddle;
