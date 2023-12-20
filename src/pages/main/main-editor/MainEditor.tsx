import { Stack } from '@mui/material';
import AdditionalEditor from './additional-editor/AdditionalEditor';
import EndpointField from './endpoint-field/EndpointField';
import InputField from './input-field/InputField';
import ToolBox from './toolbox/ToolBox';

const MainEditor = () => {
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
      <EndpointField />
      <InputField slice="query">
        <ToolBox />
      </InputField>
      <AdditionalEditor />
    </Stack>
  );
};

export default MainEditor;
