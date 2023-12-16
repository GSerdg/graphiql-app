import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import InputField from '../input-field/InputField';

const AdditionalEditor = () => {
  const [value, setValue] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelState = () => {
    setIsPanelOpen((prevState) => !prevState);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #48515B',
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
        <IconButton sx={{ padding: '0', color: '#fffffc' }} onClick={handlePanelState}>
          <ExpandMoreIcon className={isPanelOpen ? '' : 'editor__expand-icon--close'} />
        </IconButton>
      </Box>
      {isPanelOpen && (
        <>
          <InputField slice="variables" value={value} index={0} height={20} />
          <InputField slice="headers" value={value} index={1} height={20} />
        </>
      )}
    </Box>
  );
};

export default AdditionalEditor;
