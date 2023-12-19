import { screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { MockedFunction, describe, expect, it, vi } from 'vitest';
import App from './App';
import { renderWithProviders } from './test/testUtils';

vi.mock('react-firebase-hooks/auth');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  it('Should renders', () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

    renderWithProviders(<Mocktest />);

    expect(
      screen.getByRole('link', {
        name: 'Home',
      })
    ).toHaveTextContent('Home');
  });
});
