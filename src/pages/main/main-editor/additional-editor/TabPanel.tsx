import { javascript } from '@codemirror/lang-javascript';
import { Box } from '@mui/material';
import { basicDark } from '@uiw/codemirror-theme-basic';
import CodeMirror from '@uiw/react-codemirror';

interface TabPanelProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
  tabIndex?: number | boolean;
  tabPanelIndex?: number;
}

const TabPanel = ({ value, children, setValue, tabIndex, tabPanelIndex }: TabPanelProps) => {
  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
      }}
      display={tabPanelIndex === tabIndex ? 'flex' : 'none'}
    >
      {tabPanelIndex === tabIndex && (
        <CodeMirror
          className="editor__query"
          theme={basicDark}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          basicSetup={{ highlightActiveLine: false }}
          onChange={handleChange}
          value={value}
        />
      )}
      {children}
    </Box>
  );
};

export default TabPanel;
