import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>GraphyQL APP</h1>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
