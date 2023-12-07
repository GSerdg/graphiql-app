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
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../shared/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

interface SubmitForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  function handleClickShowPassword() {
    setIsShowPassword((show) => !show);
  }

  function onSubmitHandelr(data: SubmitForm) {
    console.log(data);
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
        <Avatar sx={{ bgcolor: blueGrey[600] }} variant="rounded">
          <HowToRegOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
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
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            sx={{ mt: 3, mb: 2, float: 'right' }}
          >
            Log In
          </Button>
        </Box>
        <LinkMUI component={Link} to="/signup" variant="caption">
          Don`t have an account? Sign Up
        </LinkMUI>
      </Box>
    </Container>
  );
}
