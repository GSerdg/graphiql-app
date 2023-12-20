import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { MockedFunction, describe, expect, it, vi } from 'vitest';
import Header from './Header';
import { SupportedLocales } from '../../localization/language';
import { useState } from 'react';
import { LangContext } from '../../contexts/localization';

vi.mock('react-firebase-hooks/auth');

const Mocktest = ({ language }: { language: 'ru' | 'en' }) => {
  const [lang, setLang] = useState<SupportedLocales>(language);

  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, setLang }}>
        <Header />
      </LangContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for header component', () => {
  it('Make sure the component is rendering in English', async () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

    render(<Mocktest language="en" />);

    const header = screen.getByRole('banner');
    const buttonGroup = screen.getByRole('group');
    const homeLink = screen.getByRole('link', { name: 'Home' });

    expect(header).toBeInTheDocument();
    expect(buttonGroup).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  it('Make sure clicking a link redirects to the appropriate page', async () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

    render(<Mocktest language="en" />);

    const mainLink = screen.getByRole('link', { name: 'Home' });
    const loginLink = screen.getByRole('link', { name: 'Log in' });
    const signupLink = screen.getByRole('link', { name: 'Sign up' });

    await userEvent.click(loginLink);
    expect(window.location.pathname).toBe('/login');

    await userEvent.click(signupLink);
    expect(window.location.pathname).toBe('/signup');

    await userEvent.click(mainLink);
    expect(window.location.pathname).toBe('/');
  });

  it('Make sure the component is rendering in Russian', async () => {
    (useAuthState as MockedFunction<typeof useAuthState>).mockReturnValue([undefined, false, undefined]);

    render(<Mocktest language="ru" />);

    const homeLink = screen.getByRole('link', { name: 'Домой' });
    const loginLink = screen.getByRole('link', { name: 'Вход' });
    const signupLink = screen.getByRole('link', { name: 'Регистрация' });

    expect(homeLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });
});
