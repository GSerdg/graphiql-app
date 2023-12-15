import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { EditorTextarea } from '../editor-textarea/EditorTextarea';

const AdditionalEditor = () => {
  const [value, setValue] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelState = () => {
    setIsPanelOpen((prevState) => !prevState);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0 0 0 5px',
      }}
    >
      <Box
        className={classNames(
          'editor__tab-group',
          isPanelOpen ? 'editor__tab-group--open' : 'editor__tab-group--close'
        )}
      >
        <Tabs value={value} onChange={handleChange} sx={{ minHeight: '10px' }}>
          <Tab label="Variables" id="variables" className="editor__tab" />
          <Tab label="Headers" id="headers" className="editor__tab" />
        </Tabs>
        <IconButton sx={{ padding: '0' }} onClick={handlePanelState}>
          <ExpandMoreIcon className={isPanelOpen ? '' : 'editor__expand-icon--close'} />
        </IconButton>
      </Box>
      {isPanelOpen && (
        <>
          <EditorTextarea value={value} index={0} height={20} />
          <EditorTextarea value={value} index={1} height={20} />
        </>
      )}
    </Box>
  );
};

export { AdditionalEditor };
