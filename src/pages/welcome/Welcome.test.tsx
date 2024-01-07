import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MockWrapper } from '../../test/testUtils';
import Welcome from './Welcome';

const Mocktest = () => {
  return (
    <MockWrapper>
      <Welcome />
    </MockWrapper>
  );
};

describe('Tests for home component', () => {
  it('Make sure the component is rendering in English', () => {
    render(<Mocktest />);

    const title = screen.getAllByRole('heading');
    const divider = screen.getByRole('separator');
    const chip = screen.getByText('OUR TEAM');

    expect(title[0]).toHaveTextContent('Debugging your GraphQL server was never this easy!');
    expect(divider).toBeInTheDocument();
    expect(chip).toBeInTheDocument();
  });

  it('Make sure the component is rendering in Russian', () => {
    localStorage.setItem('lang', 'ru');

    render(<Mocktest />);

    const title = screen.getAllByRole('heading');
    const chip = screen.getByText('НАША КОМАНДА');
    const role = screen.getAllByText('Разработчик');

    expect(title[0]).toHaveTextContent('Отладка вашего сервера GraphQL никогда не была такой простой!');
    expect(chip).toBeInTheDocument();
    expect(role[0]).toBeInTheDocument();
    expect(role[1]).toBeInTheDocument();
    expect(role[2]).toBeInTheDocument();
  });
});
