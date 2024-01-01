import type { PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../app/api/api';
import type { AppStore, RootState } from '../app/store';
import { LangProvider } from '../contexts/localization';
import { NotificationProvider } from '../contexts/notification';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithReduxProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function MockWrapper({ children }: { children: JSX.Element }) {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <LangProvider>{children}</LangProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
