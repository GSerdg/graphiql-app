import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Welcome from './Welcome';

describe('Tests for home component', () => {
  it('Make sure the component is rendering', () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    const title = screen.getAllByRole('heading');
    const login = screen.getByRole('link', { name: 'Log in' });
    const divider = screen.getByRole('separator');

    expect(title[0]).toHaveTextContent(
      'Debugging your GraphQL server was never this easy!'
    );
    expect(login).toBeInTheDocument();
    expect(divider).toBeInTheDocument();
  });

  it('Make sure clicking a link redirects to the appropriate page', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Welcome />
      </Router>
    );

    const loginLink = screen.getByRole('link', { name: 'Log in' });
    const signupLink = screen.getByRole('link', { name: 'Sign up' });

    await userEvent.click(loginLink);
    expect(history.location.pathname).toBe('/login');

    await userEvent.click(signupLink);
    expect(history.location.pathname).toBe('/signup');
  });
});
