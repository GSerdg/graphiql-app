const lang = {
  emailInput: {
    en: 'Email',
    ru: 'Адрес электронной почты',
  },
  passwordInput: {
    en: 'Password',
    ru: 'Пароль',
  },
  repeatPasswordInput: {
    en: 'Repeat password',
    ru: 'Повторите пароль',
  },
  login: {
    en: 'Log In',
    ru: 'Войти',
  },
  signupHeader: {
    en: 'Sign Up',
    ru: 'Зарегистрироваться',
  },
  loginLink: {
    en: "Don't have an account? Sign Up",
    ru: 'Нет аккаунта? Зарегистрироваться',
  },
  signupLink: {
    en: 'Have an account? Sign In',
    ru: 'Есть аккаунт? Войти',
  },
  logged: {
    en: 'You are logged in',
    ru: 'Вы вошли в систему',
  },
  passwordSent: {
    en: 'Password reset link sent!',
    ru: 'Ссылка на сброс пароля отправлена!',
  },
  registrationComplite: {
    en: 'Registration complete',
    ru: 'Регистрация завершена',
  },
  signup: {
    en: 'Sign Up',
    ru: 'Зарегистрироваться',
  },
  resetPassword: {
    en: 'Reset your password',
    ru: 'Сбросить пароль',
  },
  requareEmailValid: {
    en: 'Enter your email',
    ru: 'Введите адрес электронной почты',
  },
  spaceEmailValid: {
    en: 'Email address must not contain leading or trailing whitespace',
    ru: 'Адрес электронной почты не должен содержать пробелов в начале или в конце',
  },
  nameEmailValid: {
    en: 'Email address must contain correct email',
    ru: 'Адрес электронной почты должен содержать правильное имя почтового ящика',
  },
  symbolEmailValid: {
    en: 'Email address must contain an "@" symbol separating local part and domain name',
    ru: 'Адрес электронной почты должен содержать символ «@», разделяющий локальную часть и имя домена',
  },
  domainEmailValid: {
    en: 'Email address must contain a domain name (e.g., example.com)',
    ru: 'Адрес электронной почты должен содержать доменное имя (например, example.com)',
  },
  formatEmailValid: {
    en: 'Email address must be properly formatted (e.g., user@example.com)',
    ru: 'Адрес электронной почты должен быть правильно отформатирован (например, user@example.com)',
  },

  requarePasswordValid: {
    en: 'Enter your password',
    ru: 'Введите пароль',
  },
  uppercasePasswordValid: {
    en: 'Password must contain at least one uppercase letter',
    ru: 'Пароль должен содержать хотя бы одну заглавную букву',
  },
  lowercasePasswordValid: {
    en: 'Password must contain at least one lowercase letter',
    ru: 'Пароль должен содержать хотя бы одну строчную букву',
  },
  digitPasswordValid: {
    en: 'Password must contain at least one digit (0-9)',
    ru: 'Пароль должен содержать хотя бы одну цифру (0-9)',
  },
  characterPasswordValid: {
    en: 'Password must contain at least one special character (e.g., !@#$%^&*-)',
    ru: 'Пароль должен содержать хотя бы один специальный символ (например, !@#$%^&*-)',
  },
  shortPasswordValid: {
    en: 'Password too short',
    ru: 'Пароль слишком короткий',
  },
  spacePasswordValid: {
    en: 'Password must not contain leading or trailing whitespace',
    ru: 'Пароль не должен содержать пробелов в начале или в конце',
  },
  requareRepeatPasswordValid: {
    en: 'Repeat your password',
    ru: 'Повторите ваш пароль',
  },
  matchPasswordValid: {
    en: 'Passwords must match',
    ru: 'Пароли должны совпадать',
  },
};

export type LangField = keyof typeof lang;

export default function getTitle(language: 'en' | 'ru', field?: LangField) {
  if (!field) return undefined;
  return lang[field]?.[language];
}
