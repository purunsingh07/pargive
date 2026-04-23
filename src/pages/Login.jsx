import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      login(email, password);
      // Redirect based on role
      if (email === 'admin@pargive.com') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Try guest@pargive.com / admin@pargive.com');
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.authCard}
        >
          <div className={styles.header}>
            <div className={styles.iconBox}><Sparkles color="var(--gold)" /></div>
            <h2>Welcome Back</h2>
            <p>Access the clubhouse and manage your impact.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label><Mail size={16} /> Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label><Lock size={16} /> Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
              Enter Clubhouse <ChevronRight size={18} />
            </button>
          </form>

          <div className={styles.footer}>
            <p>Don't have an account? <span onClick={() => navigate('/subscribe')}>Subscribe Now</span></p>
            <div className={styles.hints}>
              <p>Demo Admin: admin@pargive.com</p>
              <p>Demo User: member@pargive.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
