import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';
import { MockWrapper } from '../../test/testUtils';

const Mocktest = () => {
  return (
    <MockWrapper>
      <Footer />
    </MockWrapper>
  );
};

describe('Tests for footer component', () => {
  it('Make sure the component is rendering', () => {
    render(<Mocktest />);

    const footer = screen.getByRole('contentinfo');
    const rssLogo = screen.getByRole('link', { name: 'rss_logo' });
    const gitList = screen.getByRole('list');

    expect(footer).toBeInTheDocument();
    expect(rssLogo).toBeInTheDocument();
    expect(gitList).toBeInTheDocument();
  });
});
