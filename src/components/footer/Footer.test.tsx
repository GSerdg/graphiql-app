import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Tests for footer component', () => {
  it('Make sure the component is rendering', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = screen.getByRole('contentinfo');
    const rssLogo = screen.getByRole('link', { name: 'rss_logo' });
    const gitList = screen.getByRole('list');

    expect(footer).toBeInTheDocument();
    expect(rssLogo).toBeInTheDocument();
    expect(gitList).toBeInTheDocument();
  });
});
