import ReactCodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { javascript } from '@codemirror/lang-javascript';
import { Box } from '@mui/material';

interface InputFieldProps {
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  response?: string;
  children?: React.ReactNode;
  readonly?: boolean;
}

const EntryField = ({ children, response, readonly, setQuery }: InputFieldProps) => {
  const handleChange = (value: string) => {
    if (setQuery) {
      setQuery(value);
    }
  };

  return (
    <Box
      sx={{
        position: readonly ? 'absolute' : 'static',
        height: readonly ? 'calc(100% - 2rem)' : 'auto',
        flexGrow: 1,
        top: '2rem',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <ReactCodeMirror
        className="editor__query"
        theme={basicDark}
        height="100%"
        extensions={[javascript({ jsx: true })]}
        basicSetup={{ highlightActiveLine: false }}
        onChange={handleChange}
        value={response}
        readOnly={readonly}
        editable={!readonly}
        width="100%"
      />
      {children}
    </Box>
  );
};

export default EntryField;
