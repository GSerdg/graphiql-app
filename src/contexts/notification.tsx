import { AlertColor } from '@mui/material';
import { createContext, useContext, useState } from 'react';

interface NotificationContext {
  isNotificationOpen: boolean;
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notificationType: AlertColor;
  setNotificationType: React.Dispatch<React.SetStateAction<AlertColor>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export function useNotification() {
  const { setIsNotificationOpen, setNotificationType, setDescription } = useContext(NotificationContext);

  function showNotification(type: AlertColor, message: string) {
    setIsNotificationOpen(true);
    setNotificationType(type);
    setDescription(message);
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<AlertColor>('success');
  const [description, setDescription] = useState('');

  return (
    <NotificationContext.Provider
      value={{
        isNotificationOpen,
        setIsNotificationOpen,
        notificationType,
        setNotificationType,
        description,
        setDescription,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
