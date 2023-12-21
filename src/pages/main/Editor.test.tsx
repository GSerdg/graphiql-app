import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LangContext } from '../../contexts/localization';
import { SupportedLocales } from '../../localization/language';
import Editor from './Editor';
import userEvent from '@testing-library/user-event';

vi.mock('@uiw/react-codemirror');
vi.mock('react-redux', () => {
  return {
    useDispatch: () => {
      return vi.fn();
    },
    useSelector: vi.fn(),
  };
});

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(async () => {}),
  },
});

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, setLang }}>
        <Editor />
      </LangContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for main page', () => {
  it('Make sure the component is rendering in English', () => {
    render(<Mocktest language="en" />);

    expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Execute query' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'DOCS' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Headers' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Variables' })).toBeInTheDocument();
  });

  it('Make sure the component is rendering in Russian', () => {
    render(<Mocktest language="ru" />);

    expect(screen.getByRole('button', { name: 'Изменить' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Выполнить запрос' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Справка' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Заголовки' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Переменные' })).toBeInTheDocument();
  });

  it('Verify that clicking the "Copy query" button calls window.navigator', async () => {
    render(<Mocktest language="en" />);

    const copyButton = screen.getByRole('button', { name: 'Copy query' });

    await userEvent.click(copyButton);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledOnce();
  });

  it('Verify that clicking the "Docs" opens the docs panel', async () => {
    render(<Mocktest language="en" />);

    const docsButton = screen.getByRole('button', { name: 'DOCS' });

    expect(screen.queryByTestId('docs-panel')).not.toBeInTheDocument();

    await userEvent.click(docsButton);

    expect(screen.queryByTestId('docs-panel')).toBeInTheDocument();
  });

  it('Verify that clicking the expand button opens/closes the additional panel', async () => {
    render(<Mocktest language="en" />);

    const iconButton = screen.getByTestId('expand-button');

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();

    await userEvent.click(iconButton);

    expect(screen.queryByTestId('additional-editor')).toBeInTheDocument();

    await userEvent.click(iconButton);

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();
  });

  it('Verify that clicking the variables tab opens the additional panel', async () => {
    render(<Mocktest language="en" />);

    const variablesTab = screen.getByRole('tab', { name: 'Variables' });

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();

    await userEvent.click(variablesTab);

    expect(screen.queryByTestId('additional-editor')).toBeInTheDocument();
  });

  it('Verify that clicking the headers tab open the additional panel', async () => {
    render(<Mocktest language="en" />);

    const headersTab = screen.getByRole('tab', { name: 'Headers' });

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();

    await userEvent.click(headersTab);

    expect(screen.queryByTestId('additional-editor')).toBeInTheDocument();
  });
});
