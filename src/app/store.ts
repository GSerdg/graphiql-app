import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import modulReducer from './modulSlice';
import queryReducer from './querySlice';
import variablesReducer from './variablesSlice';
import headersReducer from './headersSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  modul: modulReducer,
  query: queryReducer,
  variables: variablesReducer,
  headers: headersReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
