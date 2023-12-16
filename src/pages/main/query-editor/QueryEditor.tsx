import { Box } from '@mui/material';
import AdditionalEditor from './additional-editor/AdditionalEditor';
import EndpointField from './endpoint-field/EndpointField';
import InputField from './input-field/InputField';
import ToolBox from './toolbox/ToolBox';

const QueryEditor = () => {
  return (
    <Box
      sx={{
        flexGrow: 2,
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <EndpointField />
      <InputField slice="query">
        <ToolBox />
      </InputField>
      <AdditionalEditor />
    </Box>
  );
};

export default QueryEditor;
