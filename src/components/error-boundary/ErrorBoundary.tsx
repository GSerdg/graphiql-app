import { Component } from 'react';
import FallbackComponent from './FallbackComponent';
import './ErrorBoundary.scss';

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
    return this.state.error ? <FallbackComponent error={this.state.error} /> : this.props.children;
  }
}

export default ErrorBoundary;
