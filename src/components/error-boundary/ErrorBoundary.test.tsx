import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { renderWithProviders } from '../../test/testUtils';
import { LangContext } from '../../contexts/localization';
import { SupportedLocales } from '../../localization/language';
import { useState } from 'react';

const errorName = 'generated error';
const error = new Error(errorName);
const ComponentWithError = () => {
  throw error;
};

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    </LangContext.Provider>
  );
};

describe('Tests for ErrorBoundary', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);

  it('Should render Fallback component on Error', () => {
    renderWithProviders(<Mocktest language="en" />);

    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'An unexpected error occurred while the application was running. Try to reload page'
    );

    expect(title).toHaveTextContent('Something went wrong');
    expect(description).toBeInTheDocument();
  });

  it('Should change language in accordance with provider', () => {
    renderWithProviders(<Mocktest language="ru" />);

    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'Во время работы приложения произошла непредвиденная ошибка. Попробуйте перезагрузить страницу'
    );

    expect(title).toHaveTextContent('Что-то пошло не так');
    expect(description).toBeInTheDocument();
  });
});
