import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, User, Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo} onClick={() => { navigate('/'); closeMobile(); }}>
        Par<span>Give</span>
      </div>

      {/* Navigation Links */}
      <ul className={`${styles.links} ${mobileOpen ? styles.mobileActive : ''}`}>
        <li><NavLink to="/"           onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
        <li><NavLink to="/charities"  onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>Charities</NavLink></li>
        <li><NavLink to="/draw"       onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>Monthly Draw</NavLink></li>
        {user && <li><NavLink to="/dashboard" onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>Dashboard</NavLink></li>}
        {isAdmin && <li><NavLink to="/admin" onClick={closeMobile} className={({ isActive }) => isActive ? styles.active : ''}>Admin Portal</NavLink></li>}
      </ul>

      {/* CTA / Auth */}
      <div className={styles.btns}>
        {user ? (
          <div className={styles.profileBox}>
             <div className={styles.userInfo}>
                <span className={styles.uName}>{user.name}</span>
                <span className={styles.uRole}>{user.role}</span>
             </div>
             <button className={styles.circleBtn} onClick={logout} title="Logout">
               <LogOut size={18} />
             </button>
          </div>
        ) : (
          <div className={styles.guestBtns}>
            <button className="btn btn-ghost-white" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="btn btn-gold" onClick={() => navigate('/subscribe')}>
              Subscribe
            </button>
          </div>
        )}
        
        <button className={styles.mobileToggle} onClick={toggleMobile}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
