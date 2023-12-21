import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LangContext } from '../../../contexts/localization';
import { SupportedLocales } from '../../../localization/language';
import AsideEditorMiddle from './AsideEditorMiddle';
import userEvent from '@testing-library/user-event';

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, setLang }}>
        <AsideEditorMiddle />
      </LangContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for AsideEditorMiddle', () => {
  it('Make sure the component is rendering in English', () => {
    render(<Mocktest language="en" />);

    expect(screen.getByRole('button', { name: 'DOCS' })).toBeInTheDocument();
  });

  it('Make sure the component is rendering in Russian', () => {
    render(<Mocktest language="ru" />);

    expect(screen.getByRole('button', { name: 'Справка' })).toBeInTheDocument();
  });

  it('Verify that clicking the "Docs" opens the docs panel', async () => {
    render(<Mocktest language="en" />);

    const docsButton = screen.getByRole('button', { name: 'DOCS' });

    expect(screen.queryByTestId('docs-panel')).not.toBeInTheDocument();

    await userEvent.click(docsButton);

    expect(screen.queryByTestId('docs-panel')).toBeInTheDocument();
  });
});
