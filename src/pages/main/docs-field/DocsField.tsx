import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import classNames from 'classnames';
import { useState } from 'react';

const DocsField = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

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
        DOCS
      </Button>
      <Box className={classNames('editor__docs-content', isDocsOpen && 'editor__docs-content--open')}></Box>
    </Box>
  );
};

export default DocsField;
