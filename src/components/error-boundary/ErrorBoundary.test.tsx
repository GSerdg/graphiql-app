import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { renderWithProviders } from '../../test/testUtils';

const errorName = 'generated error';
const error = new Error(errorName);
const WithError = () => {
  throw error;
};

describe('Tests for ErrorBoundary', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);

  it('Make sure the component is rendering', () => {
    renderWithProviders(<WithError />, { wrapper: ErrorBoundary });
    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'An unexpected error occurred while the application was running. Try to reload page'
    );

    expect(title).toHaveTextContent('Something went wrong');
    expect(description).toBeInTheDocument();
  });
});
