import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';
import { AdditionalEditor } from '../additional-editor/AdditionalEditor';
import { EditorTextarea } from './EditorTextarea/EditorTextarea';

const QueryEditor = () => {
  const handleQueryCopy = () => {
    // navigator.clipboard.writeText(query).then(
    //   function () {
    //     console.log('Текст успешно скопирован в буфер обмена', query);
    //     //TODO Add modal
    //   },
    //   function (err) {
    //     console.error('Произошла ошибка при копировании текста: ', err);
    //     //TODO Add modal
    //   }
    // );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fffffc',
        width: '55%',
        borderRadius: '8px 0 0 8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#507DAC',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '2px solid #38516B',
          justifyContent: 'space-between',
          borderRadius: '5px 0 0 0',
          height: '2rem',
        }}
      >
        <Typography sx={{ padding: '0 0 0 24px', color: '#fffffc' }}>Endpoint:</Typography>
        <input type="text" className="editor__endpoint-input" />
        <Button
          variant="contained"
          className="editor__button"
          disableElevation
          sx={{
            boxShadow: 'none',
            backgroundColor: '#38516B',
            borderRadius: 0,
            alignSelf: 'stretch',
          }}
        >
          Change endpoint
        </Button>
      </Box>
      <EditorTextarea height={100}>
        <Box
          sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'sticky',
            top: 0,
            right: 0,
          }}
        >
          <Tooltip title="Execute query">
            <IconButton className={classNames('editor__button', 'editor__button--play')}>
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Prettify query">
            <IconButton>
              <AutoFixHighIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy query">
            <IconButton onClick={handleQueryCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </EditorTextarea>
      <AdditionalEditor />
    </Box>
  );
};

export { QueryEditor };
