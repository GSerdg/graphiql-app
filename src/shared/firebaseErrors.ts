import { AuthErrorCodes } from 'firebase/auth';

export default function getAuthErrorMessage(code: string) {
  let message: string;

  switch (code) {
    case AuthErrorCodes.EMAIL_EXISTS: {
      message = 'Email exists. Please Log In';
      break;
    }
    case AuthErrorCodes.ARGUMENT_ERROR: {
      message = 'Argument error.';
      break;
    }
    case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
      message = 'Please logout, re-login, and try again.';
      break;
    }
    case AuthErrorCodes.INVALID_PASSWORD: {
      message = 'Incorrect password.';
      break;
    }
    case AuthErrorCodes.TOKEN_EXPIRED: {
      message = 'Your token has expired.  Please logout and re-login.';
      break;
    }
    case AuthErrorCodes.USER_CANCELLED: {
      message = 'Login process was stopped by you.';
      break;
    }
    case AuthErrorCodes.USER_DELETED: {
      message = 'User does not exist.';
      break;
    }
    case AuthErrorCodes.USER_DISABLED: {
      message = 'Your account has been disabled.';
      break;
    }
    case AuthErrorCodes.USER_MISMATCH: {
      message = 'Credential given does not correspond to you.';
      break;
    }
    case AuthErrorCodes.USER_SIGNED_OUT: {
      message = 'You are signed out.  Please re-sign in.';
      break;
    }
    case AuthErrorCodes.WEAK_PASSWORD: {
      message =
        'Your password is too weak.  It must be at least six characters long.';
      break;
    }
    case AuthErrorCodes.INVALID_EMAIL: {
      message = 'The email address is improperly formatted.';
      break;
    }
    case AuthErrorCodes.INTERNAL_ERROR: {
      message = 'Internal Error.';
      break;
    }
    case AuthErrorCodes.INVALID_API_KEY: {
      message = 'Invalid API key.';
      break;
    }
    case AuthErrorCodes.INVALID_APP_CREDENTIAL: {
      message = 'Invalid app credential.';
      break;
    }
    case AuthErrorCodes.INVALID_APP_ID: {
      message = 'Invalid app ID.';
      break;
    }
    case AuthErrorCodes.INVALID_AUTH: {
      message = 'Invalid user token.';
      break;
    }
    case AuthErrorCodes.TIMEOUT: {
      message = 'Authentication timeout.';
      break;
    }
    case AuthErrorCodes.UNVERIFIED_EMAIL: {
      message = 'Your email address is not verified.  Please verify it.';
      break;
    }
    case AuthErrorCodes.WEB_STORAGE_UNSUPPORTED: {
      message =
        'Web storage is unsupported.  Please update or use a different browser.';
      break;
    }
    case AuthErrorCodes.ALREADY_INITIALIZED: {
      message = 'Already initialized.';
      break;
    }
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER: {
      message =
        'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
      break;
    }
    case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS: {
      message = 'Email or password is incorrect';
      break;
    }
    case AuthErrorCodes.NETWORK_REQUEST_FAILED: {
      message = 'Network request failed';
      break;
    }
    default: {
      message = `Unknown error >> code = ${code}`;
      break;
    }
  }
  return message;
}
