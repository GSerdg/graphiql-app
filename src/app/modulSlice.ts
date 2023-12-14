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
    setIsOpenMessage: (state, action) => {
      state.isNotificationOpen = action.payload;
    },
    setMessageType: (state, action) => {
      state.notificationType = action.payload;
    },
    setStatusMessage: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setIsOpenMessage, setMessageType, setStatusMessage } = modulSlice.actions;
export default modulSlice.reducer;
