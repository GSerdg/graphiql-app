import { javascript } from '@codemirror/lang-javascript';
import { Box } from '@mui/material';
import { basicDark } from '@uiw/codemirror-theme-basic';
import CodeMirror from '@uiw/react-codemirror';
import { useDispatch } from 'react-redux';
import { setHeaders } from '../../../../app/headersSlice';
import { setQuery } from '../../../../app/querySlice';
import { setVariables } from '../../../../app/variablesSlice';
import { useSelector } from '../../../../shared/useSelector';

interface InputFieldProps {
  slice: string;
  children?: React.ReactNode;
  index?: number;
  value?: number;
  height?: number;
}

const InputField = ({ slice, children, index = 0, value = 0, height = 100 }: InputFieldProps) => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);

  const handleChange = (value: string) => {
    if (slice === 'query') {
      dispatch(setQuery(value));
    }
    if (slice === 'variables') {
      dispatch(setVariables(value));
    }
    if (slice === 'headers') {
      dispatch(setHeaders(value));
    }
  };

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
          value={query}
          className="editor__query"
          theme={basicDark}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          basicSetup={{ highlightActiveLine: false }}
          onChange={handleChange}
        />
      )}
      {children}
    </Box>
  );
};

export default InputField;
