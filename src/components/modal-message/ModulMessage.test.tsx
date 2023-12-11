import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ModalMessage from './ModulMessage';

const Mocktest = () => {
  return (
    <BrowserRouter>
      <ModalMessage
        isOpenMessage={true}
        setIsOpenMessage={vi.fn()}
        messageType="error"
        statusMessage="Message for modul"
      />
    </BrowserRouter>
  );
};

describe('SignIn', () => {
  it('should render', async () => {
    render(<Mocktest />);
    expect(screen.getByText('Message for modul')).toBeInTheDocument();
  });

  it('should not render', async () => {
    render(
      <BrowserRouter>
        <ModalMessage
          isOpenMessage={false}
          setIsOpenMessage={vi.fn()}
          messageType="error"
          statusMessage="Message for modul"
        />
      </BrowserRouter>
    );
    expect(screen.queryByTestId('modulTest')).not.toBeInTheDocument();
  });
});
