import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockedFunction, describe, expect, it, vi } from 'vitest';
import { Notification } from '../../components/notification/Notification';
import { LangContext, SupportedLocales } from '../../contexts/localization';
import { NotificationProvider } from '../../contexts/notification';
import { registerWithEmailAndPassword } from '../../shared/firebase';
import { renderWithProviders } from '../../test/testUtils';
import Signup from './SignupPage';

vi.mock('../../shared/firebase', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../shared/firebase')>();
  return {
    ...mod,
    registerWithEmailAndPassword: vi.fn(),
  };
});

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <BrowserRouter>
      <NotificationProvider>
        <LangContext.Provider value={{ lang, setLang }}>
          <Notification />
          <Signup />
        </LangContext.Provider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

describe('SignUp', () => {
  it('should render', () => {
    renderWithProviders(<Mocktest language={'en'} />);

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
    renderWithProviders(<Mocktest language={'en'} />);

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
    renderWithProviders(<Mocktest language={'en'} />);

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
    renderWithProviders(<Mocktest language={'en'} />);

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

  it('should enabled submit button and fetch auth request', async () => {
    renderWithProviders(<Mocktest language={'en'} />);

    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeDisabled();

    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'aA1@abcd');
    expect(screen.getByTestId('buttonTest')).toBeEnabled();

    await userEvent.click(screen.getByTestId('buttonTest'));
    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith('a@b.com', 'a@b.com', 'aA1@abcd');
    });
  });

  it('should show notification message', async () => {
    (registerWithEmailAndPassword as MockedFunction<typeof registerWithEmailAndPassword>).mockRejectedValue({
      code: 'auth/email-already-in-use',
    });

    renderWithProviders(<Mocktest language={'en'} />);

    expect(screen.queryByTestId('modulTest')).not.toBeInTheDocument();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'aA1@abcd');
    await userEvent.click(screen.getByTestId('buttonTest'));
    await waitFor(() => {
      expect(screen.getByText('Email exists. Please Log In')).toBeInTheDocument();
    });
  });

  it('should render width ru language', () => {
    renderWithProviders(<Mocktest language={'ru'} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Зарегистрироваться');
    expect(screen.getByText('Адрес электронной почты')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Повторите пароль')).toBeInTheDocument();
  });

  it('should show text message width ru language', async () => {
    (registerWithEmailAndPassword as MockedFunction<typeof registerWithEmailAndPassword>).mockRejectedValue({
      code: 'auth/email-already-in-use',
    });

    renderWithProviders(<Mocktest language={'ru'} />);

    await userEvent.type(screen.getByTestId('emailTest'), 'a');
    expect(
      screen.getByText(
        'Адрес электронной почты должен содержать символ «@», разделяющий локальную часть и имя домена'
      )
    ).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('passwordTest'), 'a');
    expect(screen.getByText('Пароль должен содержать хотя бы одну заглавную букву')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('emailTest'), 'a@b.com');
    await userEvent.type(screen.getByTestId('passwordTest'), 'aA1@abcd');
    await userEvent.type(screen.getByTestId('repeatPasswordTest'), 'aaA1@abcd');
    await userEvent.click(screen.getByTestId('buttonTest'));
    await waitFor(() => {
      expect(screen.getByText('Электронная почта занята. Пожалуйста, войдите')).toBeInTheDocument();
    });
  });
});
