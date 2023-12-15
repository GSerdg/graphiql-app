import { Box } from '@mui/material';

interface TabPanelProps {
  index: number;
  value: number;
}

const TabPanel = ({ index, value }: TabPanelProps) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      sx={{ flexGrow: 1, display: 'flex', minHeight: '10rem', backgroundColor: '#555' }}
    >
      {value === index && <textarea className="editor__tab-panel" />}
    </Box>
  );
};

export { TabPanel };
