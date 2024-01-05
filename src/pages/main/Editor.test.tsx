import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MockWrapper } from '../../test/testUtils';
import Editor from './Editor';

vi.mock('@uiw/react-codemirror');

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(async () => {}),
  },
});

const Mocktest = () => {
  return (
    <MockWrapper>
      <Editor />
    </MockWrapper>
  );
};

describe('Tests for main page', () => {
  it('Make sure the component is rendering in English', () => {
    render(<Mocktest />);

    expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Execute query' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'DOCS' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Headers' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Variables' })).toBeInTheDocument();
  });

  it('Verify that clicking the "Copy query" button calls window.navigator', async () => {
    render(<Mocktest />);

    const copyButton = screen.getByRole('button', { name: 'Copy query' });

    await userEvent.click(copyButton);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledOnce();
  });

  it('Verify that clicking the "Docs" opens the docs panel', async () => {
    render(<Mocktest />);

    const docsButton = screen.getByRole('button', { name: 'DOCS' });

    expect(screen.queryByTestId('docs-panel')).not.toBeInTheDocument();

    await userEvent.click(docsButton);

    expect(screen.queryByTestId('docs-panel')).toBeInTheDocument();
  });

  it('Verify that clicking the expand button opens/closes the additional panel', async () => {
    render(<Mocktest />);

    const iconButton = screen.getByTestId('expand-button');

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();

    await userEvent.click(iconButton);

    expect(screen.queryByTestId('additional-editor')).toBeInTheDocument();

    await userEvent.click(iconButton);

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();
  });

  it('Verify that clicking the variables tab opens the additional panel', async () => {
    render(<Mocktest />);

    const variablesTab = screen.getByRole('tab', { name: 'Variables' });

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();

    await userEvent.click(variablesTab);

    expect(screen.queryByTestId('additional-editor')).toBeInTheDocument();
  });

  it('Verify that clicking the headers tab open the additional panel', async () => {
    render(<Mocktest />);

    const headersTab = screen.getByRole('tab', { name: 'Headers' });

    expect(screen.queryByTestId('additional-editor')).not.toBeInTheDocument();

    await userEvent.click(headersTab);

    expect(screen.queryByTestId('additional-editor')).toBeInTheDocument();
  });

  it('Make sure the component is rendering in Russian', () => {
    localStorage.setItem('lang', 'ru');

    render(<Mocktest />);

    expect(screen.getByRole('button', { name: 'Изменить' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Выполнить запрос' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Справка' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Заголовки' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Переменные' })).toBeInTheDocument();
  });
});
