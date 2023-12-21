import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { useLocalizer } from '../../../localization/language';

const DocsField = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const localizer = useLocalizer();

  const handleClick = () => {
    setIsDocsOpen((isOpen) => !isOpen);
  };

  return (
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
        {localizer('docsButton')}
      </Button>
      {isDocsOpen && <Box className="editor__docs-content" data-testid="docs-panel"></Box>}
    </Box>
  );
};

export default DocsField;
