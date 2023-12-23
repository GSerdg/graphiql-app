import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { renderWithProviders } from '../../test/testUtils';
import Provider from '../../contexts/Provider';

const errorName = 'generated error';
const error = new Error(errorName);
const ComponentWithError = () => {
  throw error;
};
const Mocktest = () => {
  return (
    <ErrorBoundary>
      <ComponentWithError />
    </ErrorBoundary>
  );
};

describe('Tests for ErrorBoundary', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);

  it('Make sure the component is rendering', () => {
    renderWithProviders(<Mocktest />, { wrapper: Provider });
    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'An unexpected error occurred while the application was running. Try to reload page'
    );

    expect(title).toHaveTextContent('Something went wrong');
    expect(description).toBeInTheDocument();
  });

  it('Make sure the component is rendering', () => {
    localStorage.setItem('lang', 'ru');

    renderWithProviders(<Mocktest />, { wrapper: Provider });
    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'Во время работы приложения произошла непредвиденная ошибка. Попробуйте перезагрузить страницу'
    );

    expect(title).toHaveTextContent('Что-то пошло не так');
    expect(description).toBeInTheDocument();
  });
});
