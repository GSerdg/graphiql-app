import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button } from '@mui/material';
import { useLocalizer } from '../../../contexts/localization';

interface DocsControlType {
  isDocsOpen: boolean;
  setIsDocsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocsControl = ({ isDocsOpen, setIsDocsOpen }: DocsControlType) => {
  const localizer = useLocalizer();

  const handleClick = () => {
    setIsDocsOpen((isOpen) => {
      return !isOpen;
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        border: '1px solid #48515B',
        borderTop: { xs: 'none', md: '1px solid #48515B' },
        borderLeft: 'none',
        borderRight: 'none',
        justifyContent: 'end',
        height: '2rem',
      }}
    >
      <Button
        variant="contained"
        disableElevation
        className="editor__button"
        sx={{
          position: 'absolute',
          boxShadow: 'none',
          backgroundColor: '#AD7630',
          borderRadius: '0',
          height: '2rem',
        }}
        onClick={handleClick}
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: '1rem',
            transition: '0.3s',
            transformOrigin: '25% center',
            transform: isDocsOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />{' '}
        {localizer('docsButton')}
      </Button>
    </Box>
  );
};

export default DocsControl;
