import { AlertColor } from '@mui/material';
import { createContext, useContext, useState } from 'react';

interface NotificationContext {
  notification: NotificationInterface;
  setNotification: React.Dispatch<React.SetStateAction<NotificationInterface>>;
}
interface NotificationInterface {
  isNotificationOpen: boolean;
  notificationType: AlertColor;
  description: string;
}

export function useNotification() {
  const { setNotification } = useContext(NotificationContext);

  function showNotification(type: AlertColor, message: string) {
    setNotification({ isNotificationOpen: true, notificationType: type, description: message });
  }

  return { showNotification };
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}

export const NotificationContext = createContext<NotificationContext>({} as NotificationContext);

export function NotificationProvider({ children }: { children: JSX.Element }) {
  const [notification, setNotification] = useState<NotificationInterface>({
    isNotificationOpen: false,
    notificationType: 'success',
    description: '',
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
