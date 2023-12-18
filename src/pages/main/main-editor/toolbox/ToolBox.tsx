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
    try {
      const text = query;
      const checkText: string[] = [];

      // Проверяем на наличие ошибок в расстановке скобок
      text.match(/{|}/g)?.forEach((item) => {
        if (item === '{') {
          checkText.push(item);
        } else if (item === '}' && (checkText.length === 0 || checkText.pop() !== '{')) {
          throw new Error('Missing opening or closing parenthesis');
        }
      });

      if (checkText.length > 0) {
        throw new Error('Missing opening or closing parenthesis');
      }

      const textArray = text
        .split('\n')
        .map((item) =>
          item
            .trim()
            .replace(/{\s+/g, '{')
            .replace(/\s+{/g, '{')
            .replace(/\s+}/g, '}')
            .replace(/}\s+/g, '}')
            .replace(/\s+/g, '\n')
        );
      console.log('text: a', textArray);

      let spaces = 2;
      let count = 0;
      const textConvert = textArray.map((item) => {
        let string = '';

        if (item.length > 0 && item[0] !== '}' && item[0] !== '{') {
          string += '\n' + ' '.repeat(spaces - 2);
        }

        for (let i = 0; i < item.length; i++) {
          switch (item[i]) {
            case '{':
              count += 1;
              if (i === 0 || item[i - 1] === '}') {
                string += item[i] + '\n' + ' '.repeat(spaces);
              } else if (i === item.length - 1) {
                string += ' ' + item[i];
              } else {
                string += ' ' + item[i] + '\n' + ' '.repeat(spaces);
              }
              spaces += 2;
              break;

            case '\n':
              string += item[i] + ' '.repeat(spaces - 2);
              break;

            case '}':
              count -= 1;
              spaces -= 2;
              string += '\n' + ' '.repeat(spaces - 2) + item[i];

              if (count === 0) {
                string += '\n';
              } else if (i < item.length - 1) {
                if (item[i + 1] === '}') {
                  break;
                } else {
                  string += '\n' + ' '.repeat(spaces - 2);
                }
              }
              break;

            default:
              string += item[i];
              break;
          }
        }
        return string;
      });
      console.log('text: b', textConvert);
      console.log(textConvert.join(''));
    } catch (error) {
      console.error(error); // TODO обработать ошибку для отображения пользователю
    }
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
