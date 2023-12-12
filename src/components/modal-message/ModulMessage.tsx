import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setIsOpenMessage } from '../../app/modulSlice';
import { useSelector } from '../../shared/useSelector';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function ModalMessage() {
  const { isOpenMessage, messageType, statusMessage } = useSelector((state) => state.modul);
  const dispatch = useDispatch();

  return (
    <Snackbar
      sx={{ marginTop: '50px' }}
      TransitionComponent={SlideTransition}
      data-testid="modulTest"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpenMessage}
      autoHideDuration={3000}
      onClose={() => {
        dispatch(setIsOpenMessage(false));
      }}
    >
      <Alert
        onClose={() => {
          dispatch(setIsOpenMessage(false));
        }}
        severity={messageType}
        sx={{ width: '100%' }}
      >
        {statusMessage}
      </Alert>
    </Snackbar>
  );
}
