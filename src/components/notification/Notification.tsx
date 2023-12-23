import { Alert, AlertColor, Slide, SlideProps, Snackbar } from '@mui/material';
import { useState } from 'react';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function useNotification() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [notificationType, setNotificationType] = useState<AlertColor>();
  const [description, setDescription] = useState<string>();

  const handleNotificationOpen = (type: AlertColor, message: string) => {
    setIsNotificationOpen(true);
    setNotificationType(type);
    setDescription(message);
  };

  const Notification = () => {
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
  };

  return { Notification, handleNotificationOpen };
}
