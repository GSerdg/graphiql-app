import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useNotificationContext } from '../../contexts/notification';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export function Notification() {
  const { notification, setNotification } = useNotificationContext();

  return (
    <Snackbar
      sx={{ marginTop: '50px' }}
      TransitionComponent={SlideTransition}
      data-testid="modulTest"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={notification.isNotificationOpen}
      autoHideDuration={4000}
      onClose={() => {
        setNotification({ ...notification, isNotificationOpen: false });
      }}
    >
      <Alert
        onClose={() => {
          setNotification({ ...notification, isNotificationOpen: false });
        }}
        severity={notification.notificationType}
        sx={{ width: '100%' }}
      >
        {notification.description}
      </Alert>
    </Snackbar>
  );
}
