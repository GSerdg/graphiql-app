import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

export interface NotificationState {
  isNotificationOpen: boolean;
  notificationType: AlertColor;
  description: string;
}

const initialState: NotificationState = {
  isNotificationOpen: false,
  notificationType: 'success',
  description: '',
};

export const modulSlice = createSlice({
  name: 'modul',
  initialState,
  reducers: {
    setIsNotificationOpen: (state, action) => {
      state.isNotificationOpen = action.payload;
    },
    setNotificationType: (state, action) => {
      state.notificationType = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setIsNotificationOpen, setNotificationType, setDescription } = modulSlice.actions;
export default modulSlice.reducer;
