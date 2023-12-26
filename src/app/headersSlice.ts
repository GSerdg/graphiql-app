import { createSlice } from '@reduxjs/toolkit';

interface HeadersState {
  headers: string;
}

const initialState: HeadersState = {
  headers: '',
};

export const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
  },
});

export const { setHeaders } = headersSlice.actions;
export default headersSlice.reducer;
