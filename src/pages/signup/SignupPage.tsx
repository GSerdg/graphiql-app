import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  AlertColor,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
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
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ModalMessage from '../../components/modal-message/ModulMessage';
import { auth, registerWithEmailAndPassword } from '../../shared/firebase';
import getAuthErrorMessage from '../../shared/firebaseErrors';
import { signupSchema } from '../../shared/validationSchema';

interface SubmitForm {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [messageType, setMessageType] = useState<AlertColor>();
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [navigate, user]);

  function handleClickShowPassword() {
    setIsShowPassword((show) => !show);
  }

  function handleClickShowRepeatPassword() {
    setIsShowRepeatPassword((show) => !show);
  }

  async function onSubmitHandelr(data: SubmitForm) {
    try {
      setIsLoading(true);
      await registerWithEmailAndPassword(data.email, data.email, data.password);
      setMessageType('success');
      setStatusMessage('registration complete');
    } catch (error) {
      const err = error as FirebaseError;
      const message = getAuthErrorMessage(err.code);

      setMessageType('error');
      setStatusMessage(message);

      if (message === 'Email exists. Please Log In') {
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } finally {
      setIsOpenMessage(true);
      setIsLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ flexGrow: 1 }}>
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
          Sign Up
        </Typography>
        <ModalMessage
          isOpenMessage={isOpenMessage}
          setIsOpenMessage={setIsOpenMessage}
          messageType={messageType}
          statusMessage={statusMessage}
        />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandelr)}
          sx={{ mt: 3, position: 'relative' }}
        >
          <FormControl error={errors.email ? true : false} variant="outlined" fullWidth required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              {...register('email')}
              id="email"
              type="text"
              aria-describedby="email-helper-text"
              label="Email"
              inputProps={{
                'data-testid': 'emailTest',
              }}
            />
            <FormHelperText id="email-helper-text" data-testid="emailHelperTest" sx={{ height: '40px' }}>
              {errors.email?.message || ' '}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={errors.password ? true : false}
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 1 }}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
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
              label="Password"
            />
            <FormHelperText
              id="password-helper-text"
              data-testid="passwordHelperTest"
              sx={{ height: '40px' }}
            >
              {errors.password?.message || ' '}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={errors.repeatPassword ? true : false}
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 1 }}
          >
            <InputLabel htmlFor="repeatPassword">Repeat password</InputLabel>
            <OutlinedInput
              {...register('repeatPassword')}
              id="repeatPassword"
              type={isShowPassword ? 'text' : 'password'}
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
              label="Repeat password"
            />
            <FormHelperText id="repeatPassword-helper-text" data-testid="repeatPasswordHelperTest">
              {errors.repeatPassword?.message || ' '}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            data-testid="buttonTest"
            variant="contained"
            disabled={!isValid || isLoading}
            sx={{ mt: 3, mb: 2, float: 'right' }}
          >
            Sign Up
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
        <LinkMUI component={Link} to="/login" variant="caption">
          {'Have an account? Sign In'}
        </LinkMUI>
      </Box>
    </Container>
  );
}
