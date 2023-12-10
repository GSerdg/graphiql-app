import { MockedFunction, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Signup from './SignupPage';
import { useAuthState } from 'react-firebase-hooks/auth';

afterEach(() => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const mod = await importOriginal<typeof import('react-router-dom')>();
    return {
      ...mod,
      useNavigate: vi.fn(),
    };
  });
});

vi.mock('react-firebase-hooks/auth');

const Mocktest = () => {
  return (
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
};

describe('SignUp', () => {
  it('should render', () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

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
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

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

  it('should validate password and repeat input', async () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

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
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

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

  it('should enabled submit button and redirect', async () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

    render(<Mocktest />);

    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeEnabled();
  });
});
