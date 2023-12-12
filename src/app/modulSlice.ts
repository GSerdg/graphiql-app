import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

export interface ModulState {
  isOpenMessage: boolean;
  messageType: AlertColor;
  statusMessage: string;
}

const initialState: ModulState = {
  isOpenMessage: false,
  messageType: 'success',
  statusMessage: '',
};

export const modulSlice = createSlice({
  name: 'modul',
  initialState,
  reducers: {
    setIsOpenMessage: (state, action) => {
      state.isOpenMessage = action.payload;
    },
    setMessageType: (state, action) => {
      state.messageType = action.payload;
    },
    setStatusMessage: (state, action) => {
      state.statusMessage = action.payload;
    },
  },
});

export const { setIsOpenMessage, setMessageType, setStatusMessage } = modulSlice.actions;
export default modulSlice.reducer;
