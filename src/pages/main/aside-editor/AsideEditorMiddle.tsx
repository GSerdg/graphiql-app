import { Box } from '@mui/material';
import DocsField from '../docs-field/DocsField';
import CodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { javascript } from '@codemirror/lang-javascript';

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
      ></Box>
      <DocsField />
    </>
  );
};

export default AsideEditorMiddle;
