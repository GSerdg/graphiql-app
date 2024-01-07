import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import router from '../../app/router';

describe('Tests for not-found page', () => {
  it('Make sure the component is rendering', () => {
    render(
      <RouterProvider
        router={createMemoryRouter(router.routes, {
          initialEntries: ['/bad-route'],
        })}
      />
    );
    const title = screen.getByRole('heading');
    const description = screen.getByText(
      'Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable'
    );

    expect(title).toHaveTextContent('404 page not Found');
    expect(description).toBeInTheDocument();
  });
});
