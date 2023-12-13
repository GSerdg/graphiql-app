import { CircularProgress, Container } from '@mui/material';
import { green } from '@mui/material/colors';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../shared/firebase';

export function RedirectAuthorizedUserRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  return (
    <Container component="main" maxWidth="xs" sx={{ flexGrow: 1 }}>
      {loading ? (
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
      ) : user ? (
        <Navigate to="/editor" state={{ from: location }} replace />
      ) : (
        children
      )}
    </Container>
  );
}
