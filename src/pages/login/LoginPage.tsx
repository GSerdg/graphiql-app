import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import LinkMUI from '@mui/material/Link';
import { blueGrey, green } from '@mui/material/colors';
import { FirebaseError } from 'firebase/app';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LangContext } from '../../App';
import { setIsOpenMessage, setMessageType, setStatusMessage } from '../../app/modulSlice';
import { logInWithEmailAndPassword, sendPasswordReset } from '../../shared/firebase';
import getAuthErrorMessage from '../../shared/firebaseErrors';
import getTitle, { LangField } from '../../shared/language';
import { signinSchema } from '../../shared/validationSchema';

interface SubmitForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { lang } = useContext(LangContext);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signinSchema),
  });
  const dispatch = useDispatch();

  function handleClickShowPassword() {
    setIsShowPassword((show) => !show);
  }

  async function onSubmitHandler(data: SubmitForm) {
    try {
      setIsLoading(true);
      await logInWithEmailAndPassword(data.email, data.password);
      dispatch(setMessageType('success'));
      dispatch(setStatusMessage(getTitle(lang, 'logged')));
    } catch (error) {
      const err = error as FirebaseError;
      const message = getAuthErrorMessage(err.code, lang);
      dispatch(setMessageType('error'));
      dispatch(setStatusMessage(message));
      setLoginError(true);
    } finally {
      dispatch(setIsOpenMessage(true));
      setIsLoading(false);
    }
  }

  async function handleResetPasswordClick() {
    try {
      setIsLoading(true);
      await sendPasswordReset(getValues('email'));
      dispatch(setMessageType('success'));
      dispatch(setStatusMessage(getTitle(lang, 'passwordSent')));
    } catch (error) {
      const err = error as Error;
      const message = getAuthErrorMessage(err.message, lang);

      dispatch(setMessageType('error'));
      dispatch(setStatusMessage(message));
    } finally {
      dispatch(setIsOpenMessage(true));
      setIsLoading(false);
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: blueGrey[600] }} variant="rounded">
        <HowToRegOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {getTitle(lang, 'login')}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 3, position: 'relative' }}
      >
        <FormControl error={errors.email ? true : false} variant="outlined" fullWidth required>
          <InputLabel htmlFor="email">{getTitle(lang, 'emailInput')}</InputLabel>
          <OutlinedInput
            {...register('email')}
            id="email"
            type="text"
            aria-describedby="email-helper-text"
            label={getTitle(lang, 'emailInput')}
            inputProps={{
              'data-testid': 'emailTest',
            }}
          />
          <FormHelperText id="email-helper-text" data-testid="emailHelperTest" sx={{ height: '40px' }}>
            {getTitle(lang, errors.email?.message as LangField) || ' '}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={errors.password ? true : false}
          variant="outlined"
          fullWidth
          required
          sx={{ mt: 1 }}
        >
          <InputLabel htmlFor="password">{getTitle(lang, 'passwordInput')}</InputLabel>
          <OutlinedInput
            {...register('password')}
            id="password"
            type={isShowPassword ? 'text' : 'password'}
            aria-describedby="password-helper-text"
            inputProps={{
              'data-testid': 'passwordTest',
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={getTitle(lang, 'passwordInput')}
          />
          <FormHelperText id="password-helper-text" data-testid="passwordHelperTest" sx={{ height: '20px' }}>
            {getTitle(lang, errors.password?.message as LangField) || ' '}
          </FormHelperText>
        </FormControl>
        {loginError && (
          <LinkMUI
            component={Button}
            variant="caption"
            data-testid="resetPasswordTest"
            onClick={handleResetPasswordClick}
          >
            {getTitle(lang, 'resetPassword')}
          </LinkMUI>
        )}
        <Button
          type="submit"
          variant="contained"
          data-testid="buttonTest"
          disabled={!isValid || isLoading}
          sx={{ mt: 3, mb: 2, float: 'right' }}
        >
          {getTitle(lang, 'login')}
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '31%',
              right: 'calc(50% - 12px)',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
      <LinkMUI component={Link} to="/signup" variant="body1">
        {getTitle(lang, 'loginLink')}
      </LinkMUI>
    </Box>
  );
}
