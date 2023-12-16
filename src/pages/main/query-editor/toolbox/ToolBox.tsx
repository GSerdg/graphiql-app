import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setIsOpenMessage, setMessageType, setStatusMessage } from '../../../../app/modulSlice';
import { useSelector } from '../../../../shared/useSelector';

const ToolBox = () => {
  const query = useSelector((state) => state.query.query);
  const variables = useSelector((state) => state.variables.variables);
  const headers = useSelector((state) => state.headers.headers);
  const dispatch = useDispatch();

  const handleExecuteQuery = () => {
    console.log('query:', query);
    console.log('variables:', variables);
    console.log('headers:', headers);
  };

  const handlePrettify = () => {
    console.log(query);
  };

  const handleQueryCopy = () => {
    navigator.clipboard.writeText(query).then(
      function () {
        dispatch(setMessageType('success'));
        dispatch(setStatusMessage('Query copied successfully'));
        dispatch(setIsOpenMessage(true));
      },
      function () {
        dispatch(setMessageType('error'));
        dispatch(setStatusMessage('Copy query failed'));
        dispatch(setIsOpenMessage(true));
      }
    );
  };

  return (
    <Box
      sx={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'sticky',
        backgroundColor: '#2E3235',
        top: 0,
        right: 0,
      }}
    >
      <Tooltip title="Execute query">
        <IconButton
          className="editor__button"
          onClick={handleExecuteQuery}
          sx={{
            padding: '0.7rem',
            backgroundColor: '#AD7630',
            color: '#fffffc',
          }}
        >
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Prettify query">
        <IconButton
          onClick={handlePrettify}
          sx={{ color: '#808076', '&:hover': { backgroundColor: '#8080762e' } }}
        >
          <AutoFixHighIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy query">
        <IconButton
          onClick={handleQueryCopy}
          sx={{ color: '#808076', '&:hover': { backgroundColor: '#8080762e' } }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ToolBox;
