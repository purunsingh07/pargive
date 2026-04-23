import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Calendar, 
  Heart, 
  TrendingUp, 
  Plus, 
  Edit2, 
  ShieldCheck, 
  ChevronRight,
  Upload,
  CheckCircle,
  X
} from 'lucide-react';
import { INITIAL_SCORES, DRAW_HISTORY } from '../lib/mockData';
import styles from './Dashboard.module.css';

const TABS = ['Overview', 'Scores', 'Draw History', 'Winnings'];

export default function Dashboard() {
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [editScore, setEditScore] = useState(null);
  const [formData, setFormData] = useState({ date: '', course: '', score: '' });
  const [formError, setFormError] = useState('');
  const [charityPct, setCharityPct] = useState(20);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [proofSent, setProofSent] = useState(false);

  // Rolling average — the draw number
  const avgScore = Math.round(scores.reduce((a, b) => a + Number(b.score), 0) / scores.length);
  const totalWon = DRAW_HISTORY.reduce((a, b) => a + b.prize, 0);
  const totalDonated = scores.length * 9.99 * (charityPct / 100) * 12;

  const pendingWins = DRAW_HISTORY.filter(d => d.prize > 0 && d.month === 'June 2025');

  const handleAddScore = () => {
    setFormError('');
    if (!formData.date || !formData.course || !formData.score) {
      setFormError('All fields are required.');
      return;
    }
    const scoreNum = parseInt(formData.score);
    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 45) {
      setFormError('Stableford points must be between 1 and 45.');
      return;
    }
    const dateExists = scores.some(s => s.date === formData.date && s.id !== editScore?.id);
    if (dateExists) {
      setFormError('Only one score entry is permitted per date.');
      return;
    }

    if (editScore) {
      setScores(scores.map(s => s.id === editScore.id
        ? { ...s, date: formData.date, course: formData.course, score: scoreNum }
        : s
      ));
      setEditScore(null);
    } else {
      const newScore = {
        id: Date.now(),
        date: formData.date,
        course: formData.course,
        score: scoreNum,
        type: 'Stableford'
      };
      const updated = [...scores, newScore].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      setScores(updated);
    }
    setFormData({ date: '', course: '', score: '' });
    setShowScoreForm(false);
  };

  const handleEdit = (s) => {
    setEditScore(s);
    setFormData({ date: s.date, course: s.course, score: String(s.score) });
    setShowScoreForm(true);
    setActiveTab('Scores');
  };

  const handleUploadProof = () => {
    setProofSent(true);
    setTimeout(() => {
      setProofSent(false);
      setUploadingFor(null);
    }, 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.greeting}
            >
              The Clubhouse
            </motion.h1>
            <p className={styles.subtext}>Member John Doe · Next draw in 8 days</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.drawCircle}
          >
            <span className={styles.drawLabel}>Draw Score</span>
            <span className={styles.drawValue}>{avgScore}</span>
            <span className={styles.drawHint}>R5 Avg</span>
          </motion.div>
        </header>

        {/* ── Stats ── */}
        <div className={styles.statsGrid}>
          {[
            { label: 'Donated', val: `£${totalDonated.toFixed(2)}`, icon: <Heart />, color: styles.green },
            { label: 'Total Won', val: `£${totalWon.toLocaleString()}`, icon: <Trophy />, color: styles.gold },
            { label: 'Draw Entries', val: DRAW_HISTORY.length, icon: <TrendingUp />, color: '' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={styles.statCard}
            >
              <div className={styles.statLine}>
                <div className={`${styles.statVal} ${stat.color}`}>{stat.val}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
              <div className={styles.statIconSmall}>{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className={styles.tabsStrip}>
          {TABS.map(t => (
            <button
              key={t}
              className={`${styles.tabBtn} ${activeTab === t ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <main className={styles.panel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >

              {activeTab === 'Overview' && (
                <div className={styles.tabGrid}>
                  <div className="glass-card" style={{ padding: '2rem' }}>
                    <div className={styles.cardTop}>
                      <h3>Membership</h3>
                      <span className="badge badge-gold">Active</span>
                    </div>
                    <div className={styles.metaList}>
                      <div className={styles.meta}><span>Tier</span><strong>Charter Member</strong></div>
                      <div className={styles.meta}><span>Next Payment</span><strong>1 July 2025</strong></div>
                      <div className={styles.meta}><span>Impact Area</span><strong>Cancer Research UK</strong></div>
                    </div>
                    <button className="btn btn-ghost" style={{ width: '100%', marginTop: '2rem' }}>Manage Subscription</button>
                  </div>

                  <div className="glass-card" style={{ padding: '2rem' }}>
                    <div className={styles.cardTop}>
                      <h3>Action Required</h3>
                    </div>
                    {pendingWins.length > 0 ? (
                      <div className={styles.actionBox}>
                        <div className={styles.actionIcon}><Upload size={20} /></div>
                        <div>
                          <p className={styles.actionTitle}>Draw Winner: {pendingWins[0].month}</p>
                          <p className={styles.actionDesc}>Upload screenshot for verification</p>
                        </div>
                        <button className="btn btn-gold btn-sm" onClick={() => setActiveTab('Winnings')}>Finish</button>
                      </div>
                    ) : (
                      <p className={styles.emptyMsg}>All caught up! No actions needed.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'Scores' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                  <div className={styles.cardTop}>
                    <h3>Verified Rounds</h3>
                    <button className="btn btn-gold" onClick={() => { setShowScoreForm(true); setEditScore(null); }}>
                      <Plus size={16} /> Add Score
                    </button>
                  </div>

                  {showScoreForm && (
                     <div className={styles.quickForm}>
                        <div className={styles.formRow}>
                           <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                           <input type="text" placeholder="Course Name" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} />
                           <input type="number" placeholder="Stableford Pts" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} />
                        </div>
                        {formError && <p className={styles.errTxt}>{formError}</p>}
                        <div className={styles.formNav}>
                          <button onClick={() => setShowScoreForm(false)}>Cancel</button>
                          <button onClick={handleAddScore} className={styles.confirm}>Save Entry</button>
                        </div>
                     </div>
                  )}

                  <div className={styles.scoreList}>
                    {scores.map((s, i) => (
                      <div key={s.id} className={styles.scoreRow}>
                        <div className={styles.sDate}>{s.date}</div>
                        <div className={styles.sCourse}>{s.course}</div>
                        <div className={styles.sVal}>{s.score} <span>pts</span></div>
                        <button onClick={() => handleEdit(s)}>Edit</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Draw History' && (
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                   <div className={styles.drawTable}>
                      <header>
                        <span>Month</span><span>Your Score</span><span>Drawn</span><span>Result</span>
                      </header>
                      {DRAW_HISTORY.map((d, i) => (
                        <div key={i} className={styles.drawRow}>
                          <span>{d.month}</span>
                          <span>{d.entry}</span>
                          <span>{d.drawn}</span>
                          <span className={d.prize > 0 ? styles.winTxt : ''}>
                            {d.prize > 0 ? `WIN £${d.prize}` : 'No Match'}
                          </span>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'Winnings' && (
                <div className={styles.tabGrid}>
                  <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <p className={styles.wLabel}>Available to Withdraw</p>
                    <h2 className={styles.wHuge}>£{totalWon.toLocaleString()}</h2>
                    <button className="btn btn-gold btn-lg" style={{ width: '100%' }}>Withdraw to Stripe</button>
                  </div>

                  <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <h3>Verification Status</h3>
                    <div className={styles.vList}>
                      {DRAW_HISTORY.filter(d => d.prize > 0).map((w, i) => (
                        <div key={i} className={styles.vRow}>
                          <div>
                            <div className={styles.vMonth}>{w.month} Winner</div>
                            <div className={styles.vPrize}>£{w.prize.toLocaleString()}</div>
                          </div>
                          {w.month === 'June 2025' && !proofSent ? (
                            <button className="btn btn-outline" onClick={() => setUploadingFor(w)}>
                              <Upload size={14} /> Upload Proof
                            </button>
                          ) : (
                            <div className={styles.vCheck}><CheckCircle size={18} /> Verified</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Upload Modal ── */}
      <AnimatePresence>
        {uploadingFor && (
          <div className={styles.modalOverlay}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={styles.modal}
            >
              <button className={styles.modalClose} onClick={() => setUploadingFor(null)}><X /></button>
              <h3>Verify Winning Rounds</h3>
              <p>As per PRD Section 09, please upload a screenshot of your official golf platform scores for the month of {uploadingFor.month}.</p>
              
              <div className={styles.uploadArea}>
                {proofSent ? (
                  <div className={styles.uploadSuccess}>
                    <CheckCircle size={48} color="var(--green-accent)" />
                    <p>Proof submitted for review!</p>
                  </div>
                ) : (
                  <>
                    <Upload size={48} color="var(--muted)" />
                    <p>Drop screenshot here or <span>browse</span></p>
                    <input type="file" onClick={(e) => { e.preventDefault(); handleUploadProof(); }} />
                  </>
                )}
              </div>
              <p className={styles.modalHint}>Accepted formats: PNG, JPG (Max 5MB)</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}