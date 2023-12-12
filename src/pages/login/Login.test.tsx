import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MockedFunction, describe, expect, it, vi } from 'vitest';
import { logInWithEmailAndPassword, sendPasswordReset } from '../../shared/firebase';
import LoginPage from './LoginPage';

vi.mock('../../shared/firebase', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../shared/firebase')>();
  return {
    ...mod,
    logInWithEmailAndPassword: vi.fn(),
    sendPasswordReset: vi.fn(),
    logout: vi.fn(),
  };
});

const Mocktest = () => {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('SignIn', () => {
  it('should render', () => {
    render(<Mocktest />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Log In');
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should validate email input', async () => {
    render(<Mocktest />);

    await userEvent.type(screen.getByTestId('emailTest'), 'a');
    await userEvent.clear(screen.getByTestId('emailTest'));
    expect(screen.getByText('Enter your email')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('emailTest'), 'a');
    expect(
      screen.getByText('Email address must contain an "@" symbol separating local part and domain name')
    ).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('emailTest'), '@');
    expect(
      screen.getByText('Email address must contain a domain name (e.g., example.com)')
    ).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('emailTest'), 'b.com');
    expect(screen.getByTestId('emailHelperTest')).not.toHaveTextContent(/\w/);
  });

  it('should validate password input', async () => {
    render(<Mocktest />);

    await userEvent.type(screen.getByTestId('passwordTest'), 'a');
    await userEvent.clear(screen.getByTestId('passwordTest'));
    expect(screen.getByText('Enter your password')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), 'abcd');
    expect(screen.getByTestId('passwordHelperTest')).not.toHaveTextContent(/\w/);
  });

  it('should enabled submit button and fetch auth requiest', async () => {
    render(<Mocktest />);

    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeEnabled();

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId('buttonTest'));
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith('a@b.com', 'aA1@abcd');
    });
  });

  it('should show reset password button and fetch requiest', async () => {
    render(<Mocktest />);

    expect(screen.queryByTestId('resetPasswordTest')).not.toBeInTheDocument();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    (logInWithEmailAndPassword as MockedFunction<typeof logInWithEmailAndPassword>).mockRejectedValue({
      code: 'auth/invalid-credential',
    });

    await userEvent.click(screen.getByTestId('buttonTest'));
    waitFor(() => {
      expect(screen.getByText('Reset your password')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('resetPasswordTest'));
    expect(sendPasswordReset).toHaveBeenCalledWith('a@b.com');
  });
});
