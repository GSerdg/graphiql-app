import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from './NotFound';

describe('Tests for not-found page', () => {
  it('Make sure the component is rendering', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable'
    );

    expect(title).toHaveTextContent('404 page not Found');
    expect(description).toBeInTheDocument();
  });
});
