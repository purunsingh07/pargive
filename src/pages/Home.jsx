import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Heart, Award, ArrowRight, Sparkles } from 'lucide-react'
import styles from './Home.module.css'

// ── Data ──────────────────────────────────────────────
const stats = [
  { num: '€42,800', label: 'Donated to Charity' },
  { num: '1,240',   label: 'Active Members' },
  { num: '€18,600', label: 'Current Prize Pool' },
]

const steps = [
  {
    num: <Target size={32} />,
    title: 'Subscribe & Choose',
    desc: 'Pick your plan and select a charity. At least 10% goes directly to them.',
  },
  {
    num: <Award size={32} />,
    title: 'Enter Your Scores',
    desc: 'Log your Stableford scores. Your rolling 5 average is your draw entry point.',
  },
  {
    num: <Heart size={32} />,
    title: 'Win & Give Back',
    desc: 'Match numbers in the monthly draw to win big. Most importantly, change lives.',
  },
]

const charities = [
  '🌿 Cancer Research',
  "💙 Alzheimer's Society",
  '🌍 Oxfam',
  "🏥 St. Vincent's Hospital",
  '🧒 ISPCC',
  '🌊 Irish Wildlife Trust',
]

const prizes = [
  {
    cls:     'gold',
    pct:     '40%',
    match:   '5-Number Match',
    note:    '🏆 Jackpot — Rolls Over',
    noteCls: 'noteJackpot',
  },
  {
    cls:     'silver',
    pct:     '35%',
    match:   '4-Number Match',
    note:    'Split Among Winners',
    noteCls: 'noteSilver',
  },
  {
    cls:     'bronze',
    pct:     '25%',
    match:   '3-Number Match',
    note:    'Entry-Level Prize',
    noteCls: 'noteBronze',
  },
]

// ── Component ─────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()

  return (
    <main className={styles.main}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.badge}
          >
            ⛳ Golf · Give · Win
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.heroTitle}
          >
            Play Golf.<br />
            Change Lives.<br />
            <em>Win Big.</em>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={styles.heroSub}
          >
            Track your Stableford scores, enter monthly prize draws, and direct
            real money to the charity you believe in — all in one platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.heroCta}
          >
            <button
              className="btn btn-gold btn-lg"
              onClick={() => navigate('/subscribe')}
            >
              Start for €9.99/mo <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-ghost-white btn-lg"
              onClick={() => navigate('/charities')}
            >
              Explore Charities
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={styles.heroStats}
          >
            {stats.map(s => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howSection}>
        <div className="container">
          <p className="section-tag">The Process</p>
          <h2 className="section-title">Three steps to making a difference</h2>
          <p className="section-sub">
            No complicated rules. Subscribe, play golf, watch your impact grow —
            and you might just win the jackpot.
          </p>

          <div className={styles.steps}>
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={styles.stepCard}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARITY STRIP ── */}
      <section className={styles.charityStrip}>
        <div className="container">
          <h2>Support What Matters to You</h2>
          <p>
            Choose from our vetted charity partners. Your subscription makes
            a direct, measurable difference.
          </p>
          <div className={styles.charityPills}>
            {charities.map((c, idx) => (
              <motion.button
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={styles.pill}
                onClick={() => navigate('/charities')}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIZE POOL ── */}
      <section className={styles.prizeSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">Rewards</p>
          <h2 className="section-title">How winnings are split</h2>
          <p className="section-sub" style={{ margin: '0 auto 3rem' }}>
            Pool grows with every subscriber. All tiers auto-calculate in real time.
          </p>

          <div className={styles.prizeGrid}>
            {prizes.map((p, idx) => (
              <motion.div 
                key={p.match}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`${styles.prizeCard} ${styles[p.cls]}`}
              >
                <div className={styles.prizePct}>{p.pct}</div>
                <div className={styles.prizeMatch}>{p.match}</div>
                <div className={`${styles.prizeNote} ${styles[p.noteCls]}`}>
                  {p.note}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className={styles.finalCta}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.ctaBox}
          >
            <h2>Ready to play with purpose?</h2>
            <p>Join 1,240 golfers already making a difference — one score at a time.</p>
            <button
              className="btn btn-gold btn-lg"
              onClick={() => navigate('/subscribe')}
            >
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>Par<span>Give</span></div>
        <p>© 2026 ParGive · Golf · Give · Win</p>
      </footer>

    </main>
  )
}