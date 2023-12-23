import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
import { green } from '@mui/material/colors';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useNotification from '../../components/notification/Notification';
import { LangField, useLocalizer } from '../../contexts/localization';
import { registerWithEmailAndPassword } from '../../shared/firebase';
import useLocalizerErrors from '../../shared/firebaseErrors';
import { signupSchema } from '../../shared/validationSchema';

interface SubmitForm {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Signup() {
  const localize = useLocalizer();
  const getAuthErrorMessage = useLocalizerErrors();
  const { handleNotificationOpen } = useNotification();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });

  function handleClickShowPassword() {
    setIsShowPassword((show) => !show);
  }

  function handleClickShowRepeatPassword() {
    setIsShowRepeatPassword((show) => !show);
  }

  async function onSubmitHandler(data: SubmitForm) {
    try {
      setIsLoading(true);
      await registerWithEmailAndPassword(data.email, data.email, data.password);
      handleNotificationOpen('success', localize('registrationComplete'));
    } catch (error) {
      const err = error as FirebaseError;
      const message = getAuthErrorMessage(err.code);
      handleNotificationOpen('error', message);
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
      <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
        <AssignmentIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {localize('signup')}
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
            inputProps={{ 'data-testid': 'passwordTest' }}
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
          <FormHelperText id="password-helper-text" data-testid="passwordHelperTest" sx={{ height: '40px' }}>
            {errors.password && localize(errors.password.message as LangField)}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={errors.repeatPassword ? true : false}
          variant="outlined"
          fullWidth
          required
          sx={{ mt: 1 }}
        >
          <InputLabel htmlFor="repeatPassword">{localize('repeatPasswordInput')}</InputLabel>
          <OutlinedInput
            {...register('repeatPassword')}
            id="repeatPassword"
            type={isShowRepeatPassword ? 'text' : 'password'}
            aria-describedby="repeatPassword-helper-text"
            inputProps={{ 'data-testid': 'repeatPasswordTest' }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRepeatPassword}
                  edge="end"
                >
                  {isShowRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={localize('repeatPasswordInput')}
          />
          <FormHelperText id="repeatPassword-helper-text" data-testid="repeatPasswordHelperTest">
            {errors.repeatPassword && localize(errors.repeatPassword.message as LangField)}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          data-testid="buttonTest"
          variant="contained"
          disabled={!isValid || isLoading}
          sx={{ mt: 3, mb: 2, float: 'right' }}
        >
          {localize('signup')}
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '22%',
              right: 'calc(50% - 12px)',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
      <LinkMUI component={Link} to="/login" variant="body1">
        {localize('signupLink')}
      </LinkMUI>
    </Box>
  );
}
