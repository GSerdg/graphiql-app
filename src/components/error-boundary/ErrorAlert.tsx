import { Collapse, Alert, IconButton, AlertTitle, Fade, Tooltip } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useLocalizer } from '../../localization/language';

interface ErrorAlertProps {
  error: Error;
}

export default function ErrorAlert(props: ErrorAlertProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isShowDetailed, setIsShowDetailed] = useState(false);
  const localize = useLocalizer();

  return (
    <Fade in={isOpen}>
      <Alert
        severity={'error'}
        action={
          <>
            <Tooltip title={localize('ErrorAlertCollapseTitle')}>
              <IconButton
                sx={{ transition: 'transform .5s', transform: `rotate(${isShowDetailed ? 180 : 0}deg)` }}
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsShowDetailed(!isShowDetailed);
                }}
              >
                <ExpandCircleDownIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title={localize('ErrorAlertCloseTitle')}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        }
        sx={{ width: '75%', margin: '1rem auto 0', minWidth: '250px' }}
      >
        <AlertTitle>{props.error.message}</AlertTitle>
        <Collapse in={isShowDetailed}>{props.error.stack}</Collapse>
      </Alert>
    </Fade>
  );
}
