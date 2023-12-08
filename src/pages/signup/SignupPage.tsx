import {
  Avatar,
  Box,
  Button,
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
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useForm } from 'react-hook-form';
import { signupSchema } from '../../shared/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../shared/firebase';
import { FirebaseError } from 'firebase/app';
import getAuthErrorMessage from '../../shared/firebaseErrors';

interface SubmitForm {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  const [user, loading] = useAuthState(auth);
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
    if (loading) return;
    if (user) navigate('/');
  }, [loading, navigate, user]);

  function handleClickShowPassword() {
    setIsShowPassword((show) => !show);
  }

  function handleClickShowRepeatPassword() {
    setIsShowRepeatPassword((show) => !show);
  }

  async function onSubmitHandelr(data: SubmitForm) {
    try {
      await registerWithEmailAndPassword(data.email, data.email, data.password);
    } catch (error) {
      const err = error as FirebaseError;
      const message = getAuthErrorMessage(err.code);
      console.log(message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
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
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandelr)}
          sx={{ mt: 3 }}
        >
          <FormControl
            error={errors.email ? true : false}
            variant="outlined"
            fullWidth
            required
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              {...register('email')}
              id="email"
              type="text"
              aria-describedby="email-helper-text"
              label="Email"
            />
            <FormHelperText id="email-helper-text" sx={{ height: '40px' }}>
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
            <FormHelperText id="password-helper-text" sx={{ height: '40px' }}>
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
            <FormHelperText id="repeatPassword-helper-text">
              {errors.repeatPassword?.message || ' '}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            sx={{ mt: 3, mb: 2, float: 'right' }}
          >
            Sign Up
          </Button>
        </Box>
        <LinkMUI component={Link} to="/login" variant="caption">
          {'Have an account? Sign In'}
        </LinkMUI>
      </Box>
    </Container>
  );
}
