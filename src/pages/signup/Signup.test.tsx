import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { registerWithEmailAndPassword } from '../../shared/firebase';
import Signup from './SignupPage';

vi.mock('../../shared/firebase', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../shared/firebase')>();
  return {
    ...mod,
    registerWithEmailAndPassword: vi.fn(),
  };
});

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
};

describe('SignUp', () => {
  it('should render', () => {
    render(<Mocktest />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Sign Up');
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Repeat password')).toBeInTheDocument();
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
    // (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

    render(<Mocktest />);

    await userEvent.type(screen.getByTestId('passwordTest'), 'a');
    await userEvent.clear(screen.getByTestId('passwordTest'));
    expect(screen.getByText('Enter your password')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), 'a');
    expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), 'A');
    expect(screen.getByText('Password must contain at least one digit (0-9)')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), '1');
    expect(
      screen.getByText('Password must contain at least one special character (e.g., !@#$%^&*-)')
    ).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), '@');
    expect(screen.getByText('Password too short')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), 'abcd');
    expect(screen.getByTestId('passwordHelperTest')).not.toHaveTextContent(/\w/);
  });

  it('should validate repeat password input', async () => {
    render(<Mocktest />);

    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'a');
    expect(screen.getByText('Passwords must match')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'A');
    expect(screen.getByText('Passwords must match')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), '1');
    expect(screen.getByText('Passwords must match')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), '@');
    expect(screen.getByText('Passwords must match')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'abcd');
    expect(screen.getByTestId('repeatPasswordHelperTest')).not.toHaveTextContent(/\w/);
  });

  it('should enabled submit button and fetch auth requiest', async () => {
    render(<Mocktest />);

    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeEnabled();

    await userEvent.click(screen.getByTestId('buttonTest'));
    waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith('a@b.com', 'a@b.com', 'aA1@abcd');
    });
  });
});
