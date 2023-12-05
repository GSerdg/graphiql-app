import { Link } from 'react-router-dom';
import { PATHS } from '../../main';
import './Header.css';

export default function Header() {
  return (
    <>
      <div>Header Component</div>
      <Link to={PATHS.AUTH}>Authorisation</Link>
      <Link to={PATHS.GRAPHYQL}>Graphyql</Link>
    </>
  );
}
