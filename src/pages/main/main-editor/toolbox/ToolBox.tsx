import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setDescription, setIsNotificationOpen, setNotificationType } from '../../../../app/modulSlice';
import { setQuery } from '../../../../app/querySlice';
import { LangField, useLocalizer } from '../../../../localization/language';
import convertPrettifyText from '../../../../shared/prettify';
import { useSelector } from '../../../../shared/useSelector';

const ToolBox = () => {
  const query = useSelector((state) => state.query.value);
  const variables = useSelector((state) => state.variables.value);
  const headers = useSelector((state) => state.headers.value);
  const dispatch = useDispatch();
  const localizer = useLocalizer();

  const handleExecuteQuery = () => {
    console.log('query:', query);
    console.log('variables:', variables);
    console.log('headers:', headers);
  };

  const handlePrettify = () => {
    try {
      const prettifyText = convertPrettifyText(query);
      dispatch(setQuery(prettifyText));
    } catch (error) {
      const err = error as Error;
      dispatch(setNotificationType('error'));
      dispatch(setDescription(localizer(err.message as LangField)));
      dispatch(setIsNotificationOpen(true));
    }
  };

  const handleQueryCopy = () => {
    navigator.clipboard.writeText(query).then(
      function () {
        dispatch(setNotificationType('success'));
        dispatch(setDescription('Query copied successfully'));
        dispatch(setIsNotificationOpen(true));
      },
      function () {
        dispatch(setNotificationType('error'));
        dispatch(setDescription('Copy query failed'));
        dispatch(setIsNotificationOpen(true));
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
      <Tooltip title={localizer('tooltipExecute')}>
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
      <Tooltip title={localizer('tooltipPrettify')}>
        <IconButton
          onClick={handlePrettify}
          sx={{ color: '#808076', '&:hover': { backgroundColor: '#8080762e' } }}
        >
          <AutoFixHighIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={localizer('tooltipCopy')}>
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
