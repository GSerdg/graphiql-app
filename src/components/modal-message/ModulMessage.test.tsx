import { screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { setIsOpenMessage, setMessageType, setStatusMessage } from '../../app/modulSlice';
import { renderWithProviders } from '../../test/testUtils';
import ModalMessage from './ModulMessage';

const Mocktest = () => {
  const dispatch = useDispatch();

  dispatch(setMessageType('success'));
  dispatch(setStatusMessage('Message for modul'));
  dispatch(setIsOpenMessage(true));

  return (
    <BrowserRouter>
      <ModalMessage />
    </BrowserRouter>
  );
};

describe('SignIn', () => {
  it('should not render', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ModalMessage />
      </BrowserRouter>
    );
    expect(screen.queryByTestId('modulTest')).not.toBeInTheDocument();
  });

  it('should render', async () => {
    renderWithProviders(<Mocktest />);
    expect(screen.getByText('Message for modul')).toBeInTheDocument();
  });
});
