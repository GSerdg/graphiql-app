import { Box } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { javascript } from '@codemirror/lang-javascript';
import { useDispatch } from 'react-redux';
import { setQuery } from '../../../../app/querySlice';
import { setHeaders } from '../../../../app/headersSlice';
import { setVariables } from '../../../../app/variablesSlice';
import { useState, useEffect } from 'react';
import { useSelector } from '../../../../shared/useSelector';

interface InputFieldProps {
  slice: 'query' | 'variables' | 'headers';
  children?: React.ReactNode;
  index?: number;
  value?: number;
}

const InputField = ({ slice, children, index = 0, value = 0 }: InputFieldProps) => {
  const dispatch = useDispatch();
  const initialValue = useSelector((store) => store[slice].value);
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (slice === 'query') {
      dispatch(setQuery(inputValue));
    }
    if (slice === 'variables') {
      dispatch(setVariables(inputValue));
    }
    if (slice === 'headers') {
      dispatch(setHeaders(inputValue));
    }
  }, [dispatch, slice, inputValue]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
      }}
      display={value === index ? 'flex' : 'none'}
    >
      {value === index && (
        <CodeMirror
          className="editor__query"
          theme={basicDark}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          basicSetup={{ highlightActiveLine: false }}
          onChange={handleChange}
          value={inputValue}
        />
      )}
      {children}
    </Box>
  );
};

export default InputField;
