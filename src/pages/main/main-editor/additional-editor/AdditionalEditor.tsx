import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import InputField from '../input-field/InputField';

const AdditionalEditor = () => {
  const [value, setValue] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const setFlexGrow = (isOpen: boolean) => {
    return isOpen ? 1 : 0;
  };

  const handlePanelState = () => {
    setIsPanelOpen((prevState) => !prevState);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIsPanelOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        transition: '0.5s',
        flexGrow: setFlexGrow(isPanelOpen),
        flexDirection: 'column',
        backgroundColor: '#2E3235',
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
        <Box sx={{ height: '100%', display: 'flex' }}>
          <InputField slice="variables" value={value} index={0} height={20} />
          <InputField slice="headers" value={value} index={1} height={20} />
        </Box>
      )}
    </Box>
  );
};

export default AdditionalEditor;
