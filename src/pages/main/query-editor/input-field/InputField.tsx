import { Box } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { javascript } from '@codemirror/lang-javascript';
interface InputFieldProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
  height: number;
}

const InputField = ({ children, index = 0, value = 0, height }: InputFieldProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch',
        maxHeight: `${height}vh`,
        overflow: 'auto',
      }}
      hidden={value !== index}
    >
      {value === index && (
        <CodeMirror
          className="editor__query"
          theme={basicDark}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          basicSetup={{ highlightActiveLine: false }}
        />
      )}
      {children}
    </Box>
  );
};

export { InputField };
