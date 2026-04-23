import { motion } from 'framer-motion';
import { Award, ShieldCheck, HelpCircle, History } from 'lucide-react';
import styles from './Draw.module.css';

const DRAW_TYPES = [
  { 
    title: '5-Number Match', 
    pool: '40%', 
    desc: 'The ultimate prize. Match your full rolling average with our monthly draw number.', 
    tag: 'Jackpot',
    rollover: true
  },
  { 
    title: '4-Number Match', 
    pool: '35%', 
    desc: 'High-tier reward for near-perfect consistency. Split among all qualifiers.', 
    tag: 'Elite',
    rollover: false
  },
  { 
    title: '3-Number Match', 
    pool: '25%', 
    desc: 'Entry-level prize. Reachable for most active players. Consistent wins possible.', 
    tag: 'Supporter',
    rollover: false
  },
];

export default function Draw() {
  return (
    <main className={styles.page}>
      <div className="container">
        
        {/* Hero Section */}
        <header className={styles.header}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.statusBadge}
          >
            LIVE · Next Draw in 8 Days
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            The Monthly Distribution
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-sub"
            style={{ margin: '0 auto' }}
          >
            Our proprietary draw engine calculates winners based on the rolling 5 Stableford 
            average of our global community.
          </motion.p>
        </header>

        {/* Current Pool */}
        <section className={styles.poolSection}>
          <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <span className={styles.poolLabel}>Current Estimated Prize Pool</span>
            <div className={styles.poolValue}>€18,642<span>.50</span></div>
            <p className={styles.poolNote}>Pool grows with every new subscription. 25% of all fees fuel the pool.</p>
          </div>
        </section>

        {/* Breakdown */}
        <section className={styles.breakdown}>
          <div className={styles.grid}>
            {DRAW_TYPES.map((type, idx) => (
              <motion.div 
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card"
                style={{ padding: '2.5rem' }}
              >
                <div className={styles.typeHeader}>
                  <span className={styles.typeTag}>{type.tag}</span>
                  <span className={styles.typePool}>{type.pool}</span>
                </div>
                <h3 className={styles.typeTitle}>{type.title}</h3>
                <p className={styles.typeDesc}>{type.desc}</p>
                {type.rollover && (
                  <div className={styles.rollover}>
                    <ShieldCheck size={14} /> Jackpot Rollover Enabled
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Style Mechanics */}
        <section className={styles.mechanics}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>How it works</h2>
          <div className={styles.mechGrid}>
            <div className={styles.mechItem}>
              <Award className={styles.mechIcon} />
              <h4>Verified Numbers</h4>
              <p>Winners are required to upload a screenshot of their scores from their official golf platform for verification.</p>
            </div>
            <div className={styles.mechItem}>
              <History className={styles.mechIcon} />
              <h4>Rolling Average</h4>
              <p>We use your most recent 5 scores. This ensures that a single bad day doesn't ruin your chances.</p>
            </div>
            <div className={styles.mechItem}>
              <HelpCircle className={styles.mechIcon} />
              <h4>Fair Logic</h4>
              <p>The draw is automated and audited. No manual intervention is possible once the simulation is published.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}