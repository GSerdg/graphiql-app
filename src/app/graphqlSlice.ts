import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BASE_API } from './api/api';

interface GraphqlState {
  sourceLink: string;
}

const initialGraphqlState: GraphqlState = {
  sourceLink: BASE_API,
};

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState: initialGraphqlState,
  reducers: {
    updateSourceLink: (state, action: PayloadAction<string>) => {
      state.sourceLink = action.payload;
    },
  },
});

export default graphqlSlice.reducer;
