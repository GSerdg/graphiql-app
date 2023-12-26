import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Stack } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useLocalizer } from '../../../contexts/localization';

const AsideEditorSmall = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const localize = useLocalizer();

  const handleClick = () => {
    setIsDocsOpen((isOpen) => !isOpen);
  };

  const getFlexGrow = () => {
    return isDocsOpen ? 0 : 1;
  };

  return (
    <Stack direction="row" sx={{ flexGrow: 1, maxHeight: { xs: '40vh' } }}>
      <Box
        sx={{
          transition: '0.5s',
          backgroundColor: '#292D30',
          flexGrow: { xs: getFlexGrow(), sm: '1' },
          width: { xs: 0, sm: '80px' },
          height: '100%',
          border: '1px solid #48515B',
          borderTop: { xs: 'none' },
          borderRight: 'none',
          overflowY: 'auto',
        }}
      ></Box>
      <Box className={classNames('editor__docs', isDocsOpen && 'editor__docs--open')}>
        <Button
          variant="contained"
          disableElevation
          className="editor__button"
          sx={{
            boxShadow: 'none',
            backgroundColor: '#AD7630',
            borderRadius: '0',
            height: '1.9rem',
          }}
          onClick={handleClick}
        >
          <ArrowBackIosIcon
            className={classNames('editor__docs-icon', isDocsOpen && 'editor__docs-icon--open')}
          />{' '}
          {localize('docsButton')}
        </Button>
        {isDocsOpen && <Box className="editor__docs-content" data-testid="docs-panel"></Box>}
      </Box>
    </Stack>
  );
};

export default AsideEditorSmall;
