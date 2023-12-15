import { Box } from '@mui/material';
import { AdditionalEditor } from './additional-editor/AdditionalEditor';
import { EditorTextarea } from './editor-textarea/EditorTextarea';
import { EndpointField } from './endpoint-field/EndpointField';
import { ToolBox } from './toolbox/ToolBox';

const QueryEditor = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fffffc',
        width: '55%',
        borderRadius: '8px 0 0 8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <EndpointField />
      <EditorTextarea height={100}>
        <ToolBox />
      </EditorTextarea>
      <AdditionalEditor />
    </Box>
  );
};

export { QueryEditor };
