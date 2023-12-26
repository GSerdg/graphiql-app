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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LangField, useLocalizer } from '../../contexts/localization';
import { useNotification } from '../../contexts/notification';
import { logInWithEmailAndPassword, sendPasswordReset } from '../../shared/firebase';
import useLocalizerErrors from '../../shared/firebaseErrors';
import { signinSchema } from '../../shared/validationSchema';

interface SubmitForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const localize = useLocalizer();
  const { showNotification } = useNotification();
  const getAuthErrorMessage = useLocalizerErrors();

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

  function handleClickShowPassword() {
    setIsShowPassword((show) => !show);
  }

  async function onSubmitHandler(data: SubmitForm) {
    try {
      setIsLoading(true);
      await logInWithEmailAndPassword(data.email, data.password);
      showNotification('success', localize('logged'));
    } catch (error) {
      const err = error as FirebaseError;
      const message = getAuthErrorMessage(err.code);
      showNotification('error', message);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPasswordClick() {
    try {
      setIsLoading(true);
      await sendPasswordReset(getValues('email'));
      showNotification('success', localize('passwordSent'));
    } catch (error) {
      const err = error as Error;
      const message = getAuthErrorMessage(err.message);
      showNotification('error', message);
    } finally {
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
        {localize('login')}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 3, position: 'relative' }}
      >
        <FormControl error={errors.email ? true : false} variant="outlined" fullWidth required>
          <InputLabel htmlFor="email">{localize('emailInput')}</InputLabel>
          <OutlinedInput
            {...register('email')}
            id="email"
            type="text"
            aria-describedby="email-helper-text"
            label={localize('emailInput')}
            inputProps={{
              'data-testid': 'emailTest',
            }}
          />
          <FormHelperText id="email-helper-text" data-testid="emailHelperTest" sx={{ height: '40px' }}>
            {errors.email && localize(errors.email.message as LangField)}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={errors.password ? true : false}
          variant="outlined"
          fullWidth
          required
          sx={{ mt: 1 }}
        >
          <InputLabel htmlFor="password">{localize('passwordInput')}</InputLabel>
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
            label={localize('passwordInput')}
          />
          <FormHelperText id="password-helper-text" data-testid="passwordHelperTest" sx={{ height: '20px' }}>
            {errors.password && localize(errors.password.message as LangField)}
          </FormHelperText>
        </FormControl>
        {loginError && (
          <LinkMUI
            component={Button}
            variant="caption"
            data-testid="resetPasswordTest"
            onClick={handleResetPasswordClick}
          >
            {localize('resetPassword')}
          </LinkMUI>
        )}
        <Button
          type="submit"
          variant="contained"
          data-testid="buttonTest"
          disabled={!isValid || isLoading}
          sx={{ mt: 3, mb: 2, float: 'right' }}
        >
          {localize('login')}
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
        {localize('loginLink')}
      </LinkMUI>
    </Box>
  );
}
