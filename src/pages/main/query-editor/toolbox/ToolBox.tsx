import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton, Tooltip } from '@mui/material';
import classNames from 'classnames';

const ToolBox = () => {
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
  );
};

export { ToolBox };
