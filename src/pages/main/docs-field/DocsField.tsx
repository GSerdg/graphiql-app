import { Box } from '@mui/material';

interface DocsFieldType {
  isDocsOpen: boolean;
}

const DocsField = ({ isDocsOpen }: DocsFieldType) => {
  return (
    <Box
      sx={{
        flexGrow: isDocsOpen ? 1 : 0,
        backgroundColor: '#292D30',
        border: '1px solid #48515B',
        borderTop: { xs: 'none', md: '1px solid #48515B' },
        borderLeft: isDocsOpen ? '1px solid #48515B' : 'none',
        transition: '0.5s',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {isDocsOpen && (
        <Box
          sx={{ padding: '0.5rem', position: 'absolute', minWidth: { xs: '47vw', md: '25vw' } }}
          data-testid="docs-panel"
        ></Box>
      )}
    </Box>
  );
};

export default DocsField;
