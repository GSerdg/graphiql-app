import { createSlice } from '@reduxjs/toolkit';

interface VariablesState {
  variables: string;
}

const initialState: VariablesState = {
  variables: '',
};

export const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setVariables: (state, action) => {
      state.variables = action.payload;
    },
  },
});

export const { setVariables } = variablesSlice.actions;
export default variablesSlice.reducer;
