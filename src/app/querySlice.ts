import { createSlice } from '@reduxjs/toolkit';

interface QueryState {
  query: string;
}

const initialState: QueryState = {
  query: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
