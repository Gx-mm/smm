import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <header className="navbar">
      <h1>EduSphere</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/academics">Academics</Link>
        <Link to="/faculty">Faculty</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/events">Events</Link>
        <Link to="/admission">Admission</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="nav-actions">
        <button onClick={toggle}>{theme === 'light' ? '🌙' : '☀️'}</button>
        {user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </header>
  );
};

export default Navbar;
