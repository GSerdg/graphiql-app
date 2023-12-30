import { useState, useEffect } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { javascript } from '@codemirror/lang-javascript';
import { Box } from '@mui/material';

interface InputFieldProps {
  response: string;
  children?: React.ReactNode;
  readonly: boolean;
}

const EntryField = ({ children, response, readonly }: InputFieldProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (readonly) {
      setInputValue(response);
    }
  }, [readonly, response]);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '2rem',
        height: 'calc(100% - 2rem)',
        width: '100%',
        display: 'flex',
        overflowX: 'auto',
      }}
    >
      <ReactCodeMirror
        className="editor__query"
        theme={basicDark}
        height="100%"
        extensions={[javascript({ jsx: true })]}
        basicSetup={{ highlightActiveLine: false }}
        onChange={handleChange}
        value={inputValue}
      />
      {children}
    </Box>
  );
};

export default EntryField;
