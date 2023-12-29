import { useState, useEffect } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { javascript } from '@codemirror/lang-javascript';

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
    <>
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
    </>
  );
};

export default EntryField;
