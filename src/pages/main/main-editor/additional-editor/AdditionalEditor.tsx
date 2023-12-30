import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useLocalizer } from '../../../../contexts/localization';
import { ValueType } from '../../Editor';

interface AdditionalEditorType {
  value: ValueType;
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
  children: ReactNode;
}

const AdditionalEditor = ({ setValue, value, children }: AdditionalEditorType) => {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#292D30',
          padding: '0.2rem',
          borderBottom: isPanelOpen ? '1px solid #48515B' : 'none',
        }}
      >
        <Tabs value={value} onChange={handleChange} onClick={handleClick} sx={{ minHeight: '10px' }}>
          <Tab label={localizer('tabVariables')} id="variables" className="editor__tab" />
          <Tab label={localizer('tabHeaders')} id="headers" className="editor__tab" />
        </Tabs>
        <IconButton
          sx={{ padding: '0', color: '#fffffc' }}
          onClick={handlePanelState}
          data-testid="expand-button"
        >
          <ExpandMoreIcon
            sx={{ transition: '0.3s', transform: isPanelOpen ? 'rotate(0)' : 'rotate(180deg)' }}
          />
        </IconButton>
      </Box>
      {isPanelOpen && (
        <Box sx={{ height: '100%', display: 'flex', overflowY: 'auto' }} data-testid="additional-editor">
          {children}
        </Box>
      )}
    </Box>
  );
};

export default AdditionalEditor;
