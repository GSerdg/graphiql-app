import { lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import { useDocumentationContext } from '../../../contexts/docs';

interface DocsFieldType {
  isDocsOpen: boolean;
}

const Documentation = lazy(() => import('./Documentation'));

const DocsField = ({ isDocsOpen }: DocsFieldType) => {
  const { documentation } = useDocumentationContext();

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
          sx={{
            padding: '0.5rem',
            position: 'absolute',
            minWidth: { xs: '47vw', md: '25vw' },
            width: '100%',
          }}
          data-testid="docs-panel"
        >
          {isDocsOpen && documentation.schema && (
            <Suspense>
              <Documentation />
            </Suspense>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DocsField;
