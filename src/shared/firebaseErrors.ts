import { AuthErrorCodes } from 'firebase/auth';
import { useLangContext } from '../contexts/localization';

export default function useLocalizerErrors() {
  const { lang } = useLangContext();

  return (code: string) => {
    let message: string;

    switch (code) {
      case AuthErrorCodes.EMAIL_EXISTS: {
        if (lang === 'ru') {
          message = 'Электронная почта занята. Пожалуйста, войдите';
        } else {
          message = 'Email exists. Please Log In';
        }
        break;
      }
      case AuthErrorCodes.ARGUMENT_ERROR: {
        if (lang === 'ru') {
          message = 'Ошибка аргумента';
        } else {
          message = 'Argument error';
        }
        break;
      }
      case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
        if (lang === 'ru') {
          message = 'Пожалуйста, выйдите из системы, повторно войдите и повторите попытку';
        } else {
          message = 'Please logout, re-login, and try again';
        }
        break;
      }
      case AuthErrorCodes.INVALID_PASSWORD: {
        if (lang === 'ru') {
          message = 'Некорректный пароль';
        } else {
          message = 'Incorrect password';
        }
        break;
      }
      case AuthErrorCodes.TOKEN_EXPIRED: {
        if (lang === 'ru') {
          message = 'Срок действия вашего токена истек. Пожалуйста, выйдите из системы и войдите снова.';
        } else {
          message = 'Your token has expired.  Please logout and re-login.';
        }
        break;
      }
      case AuthErrorCodes.USER_CANCELLED: {
        if (lang === 'ru') {
          message = 'Процесс входа был остановлен вами';
        } else {
          message = 'Login process was stopped by you';
        }
        break;
      }
      case AuthErrorCodes.USER_DELETED: {
        if (lang === 'ru') {
          message = 'Пользователь не существует';
        } else {
          message = 'User does not exist';
        }
        break;
      }
      case AuthErrorCodes.USER_DISABLED: {
        if (lang === 'ru') {
          message = 'Your account has been disabled';
        } else {
          message = 'Ваш аккаунт был отключен';
        }
        break;
      }
      case AuthErrorCodes.USER_MISMATCH: {
        if (lang === 'ru') {
          message = 'Указанные учетные данные не соответствуют вам.';
        } else {
          message = 'Credential given does not correspond to you.';
        }
        break;
      }
      case AuthErrorCodes.USER_SIGNED_OUT: {
        if (lang === 'ru') {
          message = 'Вы вышли из системы. Пожалуйста, войдите в систему еще раз.';
        } else {
          message = 'You are signed out. Please re-sign in.';
        }
        break;
      }
      case AuthErrorCodes.WEAK_PASSWORD: {
        if (lang === 'ru') {
          message = 'Ваш пароль слишком слабый. Оно должно быть не менее шести символов.';
        } else {
          message = 'Your password is too weak. It must be at least six characters long.';
        }
        break;
      }
      case AuthErrorCodes.INVALID_EMAIL: {
        if (lang === 'ru') {
          message = 'Адрес электронной почты имеет неправильный формат';
        } else {
          message = 'The email address is improperly formatted';
        }
        break;
      }
      case AuthErrorCodes.INTERNAL_ERROR: {
        if (lang === 'ru') {
          message = 'Внутренняя ошибка';
        } else {
          message = 'Internal Error';
        }
        break;
      }
      case AuthErrorCodes.INVALID_API_KEY: {
        if (lang === 'ru') {
          message = 'Неверный ключ API';
        } else {
          message = 'Invalid API key';
        }
        break;
      }
      case AuthErrorCodes.INVALID_APP_CREDENTIAL: {
        if (lang === 'ru') {
          message = 'Неверные учетные данные приложения';
        } else {
          message = 'Invalid app credential';
        }
        break;
      }
      case AuthErrorCodes.INVALID_APP_ID: {
        if (lang === 'ru') {
          message = 'Неверный идентификатор приложения';
        } else {
          message = 'Invalid app ID';
        }
        break;
      }
      case AuthErrorCodes.INVALID_AUTH: {
        if (lang === 'ru') {
          message = 'Неверный токен пользователя';
        } else {
          message = 'Invalid user token';
        }
        break;
      }
      case AuthErrorCodes.TIMEOUT: {
        if (lang === 'ru') {
          message = 'Тайм-аут аутентификации';
        } else {
          message = 'Authentication timeout';
        }
        break;
      }
      case AuthErrorCodes.UNVERIFIED_EMAIL: {
        if (lang === 'ru') {
          message = 'Ваш адрес электронной почты не подтвержден. Пожалуйста, проверьте это.';
        } else {
          message = 'Your email address is not verified. Please verify it.';
        }
        break;
      }
      case AuthErrorCodes.WEB_STORAGE_UNSUPPORTED: {
        if (lang === 'ru') {
          message = 'Веб-хранилище не поддерживается. Пожалуйста, обновите или используйте другой браузер.';
        } else {
          message = 'Web storage is unsupported. Please update or use a different browser.';
        }
        break;
      }
      case AuthErrorCodes.ALREADY_INITIALIZED: {
        if (lang === 'ru') {
          message = 'Уже инициализирован';
        } else {
          message = 'Already initialized';
        }
        break;
      }
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER: {
        if (lang === 'ru') {
          message =
            'Доступ к этой учетной записи временно отключен из-за множества неудачных попыток входа. Вы можете немедленно восстановить его, сбросив пароль, или повторить попытку позже.';
        } else {
          message =
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
        }
        break;
      }
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS: {
        if (lang === 'ru') {
          message = 'Адрес электронной почты или пароль указаны неверно';
        } else {
          message = 'Email or password is incorrect';
        }
        break;
      }
      case AuthErrorCodes.NETWORK_REQUEST_FAILED: {
        if (lang === 'ru') {
          message = 'Сетевой запрос не выполнен';
        } else {
          message = 'Network request failed';
        }
        break;
      }
      default: {
        if (lang === 'ru') {
          message = 'Неизвестная ошибка >> code = ${code}';
        } else {
          message = `Unknown error >> code = ${code}`;
        }
        break;
      }
    }
    return message;
  };
}
