import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MockWrapper } from '../../../test/testUtils';
import AsideEditorMiddle from './AsideEditorMiddle';

const Mocktest = () => {
  return (
    <MockWrapper>
      <AsideEditorMiddle />
    </MockWrapper>
  );
};

describe('Tests for AsideEditorMiddle', () => {
  it('Make sure the component is rendering in English', () => {
    render(<Mocktest />);

    expect(screen.getByRole('button', { name: 'DOCS' })).toBeInTheDocument();
  });

  it('Verify that clicking the "Docs" opens the docs panel', async () => {
    render(<Mocktest />);

    const docsButton = screen.getByRole('button', { name: 'DOCS' });

    expect(screen.queryByTestId('docs-panel')).not.toBeInTheDocument();

    await userEvent.click(docsButton);

    expect(screen.queryByTestId('docs-panel')).toBeInTheDocument();
  });

  it('Make sure the component is rendering in Russian', () => {
    localStorage.setItem('lang', 'ru');

    render(<Mocktest />);

    expect(screen.getByRole('button', { name: 'Справка' })).toBeInTheDocument();
  });
});
