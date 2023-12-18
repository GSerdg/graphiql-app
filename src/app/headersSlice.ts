import { createSlice } from '@reduxjs/toolkit';

interface HeadersState {
  value: string;
}

const initialState: HeadersState = {
  value: '',
};

export const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeaders: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHeaders } = headersSlice.actions;
export default headersSlice.reducer;
