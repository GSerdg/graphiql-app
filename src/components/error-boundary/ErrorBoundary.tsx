import { Component } from 'react';
import './ErrorBoundary.scss';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ErrorAlert from './ErrorAlert';
import '../../index.scss';

interface ErrorProps {
  children: JSX.Element;
}
interface ErrorState {
  error: null | Error;
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  static componentDidCatch(error: Error) {
    console.error(error);
  }
  render() {
    return this.state.error ? (
      <CssBaseline>
        <Box className="error-wrapper">
          <Container>
            <Box className="error-header">
              <Box sx={{ color: 'white' }}>
                <Typography component={'h1'} sx={{ fontSize: '2rem' }}>
                  Something went wrong
                </Typography>
                <Typography>
                  An unexpected error occurred while the application was running. Try to reload page
                </Typography>
              </Box>

              <img className="error-image" src="svg/error-905.svg" alt="Error image" />
            </Box>
            <ErrorAlert error={this.state.error}></ErrorAlert>
          </Container>
        </Box>
      </CssBaseline>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
