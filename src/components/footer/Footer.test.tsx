import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LangContext } from '../../contexts/localization';
import { SupportedLocales } from '../../localization/language';
import Footer from './Footer';

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, setLang }}>
        <Footer />
      </LangContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for footer component', () => {
  it('Make sure the component is rendering', () => {
    render(<Mocktest language="en" />);

    const footer = screen.getByRole('contentinfo');
    const rssLogo = screen.getByRole('link', { name: 'rss_logo' });
    const gitList = screen.getByRole('list');

    expect(footer).toBeInTheDocument();
    expect(rssLogo).toBeInTheDocument();
    expect(gitList).toBeInTheDocument();
  });
});
