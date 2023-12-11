import { SlideProps, Slide, Alert, Snackbar, AlertColor } from '@mui/material';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

interface ModalMessageProps {
  isOpenMessage: boolean;
  setIsOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
  messageType?: AlertColor;
  statusMessage: string;
}

export default function ModalMessage(props: ModalMessageProps) {
  return (
    <Snackbar
      sx={{ marginTop: '50px' }}
      TransitionComponent={SlideTransition}
      data-testid="modulTest"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.isOpenMessage}
      autoHideDuration={3000}
      onClose={() => {
        props.setIsOpenMessage(false);
      }}
    >
      <Alert
        onClose={() => {
          props.setIsOpenMessage(false);
        }}
        severity={props.messageType}
        sx={{ width: '100%' }}
      >
        {props.statusMessage}
      </Alert>
    </Snackbar>
  );
}
