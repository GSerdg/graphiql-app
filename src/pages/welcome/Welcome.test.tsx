import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LangContext } from '../../contexts/localization';
import { SupportedLocales } from '../../localization/language';
import Welcome from './Welcome';

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, setLang }}>
        <Welcome />
      </LangContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for home component', () => {
  it('Make sure the component is rendering in English', () => {
    render(<Mocktest language="en" />);

    const title = screen.getAllByRole('heading');
    const divider = screen.getByRole('separator');
    const chip = screen.getByText('OUR TEAM');

    expect(title[0]).toHaveTextContent('Debugging your GraphQL server was never this easy!');
    expect(divider).toBeInTheDocument();
    expect(chip).toBeInTheDocument();
  });

  it('Make sure the component is rendering in Russian', () => {
    render(<Mocktest language="ru" />);

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
