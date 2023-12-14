import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    const divider = screen.getByRole('separator');

    expect(title[0]).toHaveTextContent('Debugging your GraphQL server was never this easy!');
    expect(divider).toBeInTheDocument();
  });
});
