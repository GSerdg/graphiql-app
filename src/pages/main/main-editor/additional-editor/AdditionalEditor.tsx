import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useLocalizer } from '../../../../contexts/localization';
import InputField from '../input-field/InputField';

type ValueType = number | boolean;

const AdditionalEditor = () => {
  const [value, setValue] = useState<ValueType>(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const localizer = useLocalizer();

  const setFlexGrow = (isOpen: boolean) => {
    return isOpen ? 1 : 0;
  };

  const handlePanelState = () => {
    setIsPanelOpen((prevState) => {
      if (prevState) {
        setValue(false);
      } else {
        setValue(0);
      }
      return !prevState;
    });
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = () => {
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
        borderRight: 'none',
        maxHeight: '25vh',
      }}
    >
      <Box className={classNames('editor__tab-group', isPanelOpen && 'editor__tab-group--open')}>
        <Tabs value={value} onChange={handleChange} onClick={handleClick} sx={{ minHeight: '10px' }}>
          <Tab label={localizer('tabHeaders')} id="variables" className="editor__tab" />
          <Tab label={localizer('tabVariables')} id="headers" className="editor__tab" />
        </Tabs>
        <IconButton
          sx={{ padding: '0', color: '#fffffc' }}
          onClick={handlePanelState}
          data-testid="expand-button"
        >
          <ExpandMoreIcon className={isPanelOpen ? '' : 'editor__expand-icon--close'} />
        </IconButton>
      </Box>
      {isPanelOpen && (
        <Box sx={{ height: '100%', display: 'flex', overflowY: 'auto' }} data-testid="additional-editor">
          <InputField slice="variables" value={value} index={0} />
          <InputField slice="headers" value={value} index={1} />
        </Box>
      )}
    </Box>
  );
};

export default AdditionalEditor;
