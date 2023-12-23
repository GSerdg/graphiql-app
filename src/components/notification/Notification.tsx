import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useNotificationContext } from '../../contexts/notification';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export function Notification() {
  const { isNotificationOpen, notificationType, description, setIsNotificationOpen } =
    useNotificationContext();

  return (
    <Snackbar
      sx={{ marginTop: '50px' }}
      TransitionComponent={SlideTransition}
      data-testid="modulTest"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationOpen}
      autoHideDuration={4000}
      onClose={() => {
        setIsNotificationOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          setIsNotificationOpen(false);
        }}
        severity={notificationType}
        sx={{ width: '100%' }}
      >
        {description}
      </Alert>
    </Snackbar>
  );
}
