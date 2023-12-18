import { createSlice } from '@reduxjs/toolkit';

interface VariablesState {
  value: string;
}

const initialState: VariablesState = {
  value: '',
};

export const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setVariables: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
