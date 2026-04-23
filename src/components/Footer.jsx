import { useNavigate } from 'react-router-dom';
import { Heart, Instagram, Twitter, Linkedin, Sparkles } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          
          <div className={styles.brand}>
            <div className={styles.logo} onClick={() => navigate('/')}>
              Par<span>Give</span>
            </div>
            <p className={styles.tagline}>
              Redefining golf tracking through the lens of charitable impact. 
              Join the movement that plays for more.
            </p>
            <div className={styles.socials}>
              <Instagram size={20} />
              <Twitter size={20} />
              <Linkedin size={20} />
            </div>
          </div>

          <div className={styles.navGroup}>
            <h4>Platform</h4>
            <ul className={styles.links}>
              <li onClick={() => navigate('/draw')}>Monthly Draw</li>
              <li onClick={() => navigate('/charities')}>Charity Partners</li>
              <li onClick={() => navigate('/subscribe')}>Subscription Plans</li>
            </ul>
          </div>

          <div className={styles.navGroup}>
            <h4>Support</h4>
            <ul className={styles.links}>
              <li>Impact Transparency</li>
              <li>Handicap Verification</li>
              <li>Contact Support</li>
            </ul>
          </div>

          <div className={styles.impactBox}>
            <div className={styles.impactBadge}>
              <Sparkles size={14} color="var(--gold)" />
              <span>Verified Impact</span>
            </div>
            <p>100% of charity contributions are audited and verified by independent partners.</p>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 ParGive Platform. Dedicated to the golfers who give back.</p>
          <div className={styles.legal}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
