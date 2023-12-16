import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import DocsField from '../docs-field/DocsField';
import classNames from 'classnames';

const EditorAside = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleClick = () => {
    setIsDocsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#292D30',
          flexGrow: 1,
          width: '20%',
          border: '1px solid #48515B',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            height: '2rem',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            className="editor__button"
            sx={{
              boxShadow: 'none',
              backgroundColor: '#AD7630',
              borderRadius: '0',
              float: 'left',
            }}
            onClick={handleClick}
          >
            <ArrowBackIosIcon
              className={classNames('editor__docs-icon', isDocsOpen && 'editor__docs-icon--open')}
            />{' '}
            DOCS
          </Button>
        </Box>
      </Box>
      {isDocsOpen && <DocsField />}
    </>
  );
};

export default EditorAside;
