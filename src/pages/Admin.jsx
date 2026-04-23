import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Settings, 
  Users, 
  Search, 
  ShieldCheck, 
  Eye, 
  FileText, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import styles from './Admin.module.css';

const TABS = [
  { id: 'Logic', label: 'Draw Studio', icon: <Settings size={18} /> },
  { id: 'Members', label: 'Members', icon: <Users size={18} /> },
  { id: 'Verification', label: 'Verification', icon: <ShieldCheck size={18} /> },
];

const MOCK_USERS = [
  { id: 101, name: 'John Doe', email: 'john@example.com', plan: 'Yearly', status: 'Active', impact: 154.20 },
  { id: 102, name: 'Jane Smith', email: 'jane@smith.io', plan: 'Monthly', status: 'Active', impact: 89.00 },
  { id: 103, name: 'Mike Ross', email: 'mike@specter.com', plan: 'Monthly', status: 'Paused', impact: 45.50 },
  { id: 104, name: 'Sarah Connor', email: 'sarah@skynet.net', plan: 'Yearly', status: 'Active', impact: 210.00 },
];

const INITIAL_SUBMISSIONS = [
  { id: 1, name: 'John Doe', prize: 1550, month: 'June 2026', status: 'Pending', proof: 'score_card_june.png' },
  { id: 2, name: 'Sarah Connor', prize: 850, month: 'May 2026', status: 'Approved', proof: 'skynet_proof_01.jpg' }
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Logic');
  
  // Logic Studio State
  const [activeLogic, setActiveLogic] = useState('Random');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState(null);

  // Members State
  const [searchTerm, setSearchTerm] = useState('');

  // Verification State
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSimulate = () => {
    setSimulating(true);
    setSimResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      const winningNum = activeLogic === 'Random' ? Math.floor(Math.random() * 45) + 1 : 38;
      setSimResult({
        number: winningNum,
        winners: Math.floor(Math.random() * 12) + 1,
        totalPrize: 18600
      });
      setSimulating(false);
    }, 2000);
  };

  const verifySubmission = (id, newStatus) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
    );
  };

  return (
    <main className={styles.page}>
      <div className="container">
        
        <div className={styles.layout}>
          {/* ── Sidebar Nav ── */}
          <aside className={styles.sidebar}>
            <h1 className={styles.adminTitle}>Admin <span>Oversight</span></h1>
            <nav className={styles.sideNav}>
              {TABS.map(t => (
                <button 
                  key={t.id}
                  className={`${styles.navBtn} ${activeTab === t.id ? styles.navActive : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon} <span>{t.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* ── Main Content ── */}
          <section className={styles.content}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                
                {/* ── TAB: Logic Studio ── */}
                {activeTab === 'Logic' && (
                  <div className={styles.logicTab}>
                    <header className={styles.tabHeader}>
                      <h2>Draw Engine Studio</h2>
                      <p>Configure and simulate next month's distribution logic.</p>
                    </header>

                    <div className={styles.studioGrid}>
                      <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <h3>Logic Configuration</h3>
                        <div className={styles.logicToggle}>
                          <button className={activeLogic === 'Random' ? styles.activeLogic : ''} onClick={() => setActiveLogic('Random')}>Random Distribution</button>
                          <button className={activeLogic === 'Weighted' ? styles.activeLogic : ''} onClick={() => setActiveLogic('Weighted')}>Weighted Algorithmic</button>
                        </div>
                        <p className={styles.logicDesc}>
                          {activeLogic === 'Random' 
                            ? 'Generates a winning number based on pure RNG. Standard lottery mechanics.' 
                            : 'Favors clusters of frequent user scores. Ensures higher engagement by targeting active brackets.'}
                        </p>
                        <button className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '2rem' }} onClick={handleSimulate}>
                          Run Logic Simulation
                        </button>
                      </div>

                      <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <h3>Simulation Result</h3>
                        {simulating ? (
                          <div className={styles.simPending}>
                            <div className={styles.spinner} />
                            <p>Calculating variances...</p>
                          </div>
                        ) : simResult ? (
                          <div className={styles.resultsBox}>
                            <div className={styles.winCircle}>{simResult.number}</div>
                            <div className={styles.resStats}>
                              <div><span>Potential Winners</span><strong>{simResult.winners}</strong></div>
                              <div><span>Estimated Pool</span><strong>£{simResult.totalPrize.toLocaleString()}</strong></div>
                            </div>
                            <div className={styles.resActions}>
                              <button className="btn btn-ghost" onClick={() => setSimResult(null)}>Reset</button>
                              <button className="btn btn-gold">Publish Official Result</button>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.emptyResults}>Start simulation to see projected outcomes.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB: Members ── */}
                {activeTab === 'Members' && (
                  <div className={styles.membersTab}>
                     <header className={styles.tabHeader}>
                      <h2>Member Directory</h2>
                      <div className={styles.searchBox}>
                        <Search size={18} />
                        <input 
                          type="text" 
                          placeholder="Search name or email..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </header>

                    <div className="glass-card" style={{ overflow: 'hidden' }}>
                      <table className={styles.adminTable}>
                        <thead>
                          <tr>
                            <th>Subscriber</th>
                            <th>Status</th>
                            <th>Next Draw</th>
                            <th>Impact Score</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map(user => (
                            <tr key={user.id}>
                              <td>
                                <div className={styles.userName}>{user.name}</div>
                                <div className={styles.userEmail}>{user.email}</div>
                              </td>
                              <td><span className={`${styles.statusPill} ${user.status === 'Active' ? styles.statusActive : styles.statusPaused}`}>{user.status}</span></td>
                              <td>—</td>
                              <td className={styles.impactCell}>£{user.impact.toLocaleString()}</td>
                              <td><button className={styles.iconBtn}><Eye size={14} /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── TAB: Verification ── */}
                {activeTab === 'Verification' && (
                  <div className={styles.verifyTab}>
                    <header className={styles.tabHeader}>
                      <h2>Winner Verification</h2>
                      <p>Review uploaded proof for pending prize payouts (Section 09).</p>
                    </header>

                    <div className={styles.submissionGrid}>
                      {submissions.map(sub => (
                        <div key={sub.id} className="glass-card" style={{ padding: '2rem' }}>
                          <div className={styles.subMeta}>
                            <div>
                              <div className={styles.subName}>{sub.name}</div>
                              <div className={styles.subPrize}>£{sub.prize.toLocaleString()} · {sub.month}</div>
                            </div>
                            <span className={`${styles.statusPill} ${sub.status === 'Approved' ? styles.statusActive : styles.statusPending}`}>{sub.status}</span>
                          </div>
                          
                          <div className={styles.proofPreview}>
                            <FileText size={32} color="var(--gold)" />
                            <span>{sub.proof}</span>
                            <button className={styles.viewProofBtn}>View File</button>
                          </div>

                          {sub.status === 'Pending' && (
                             <div className={styles.verifyActions}>
                               <button className={styles.approveBtn} onClick={() => verifySubmission(sub.id, 'Approved')}>
                                 <CheckCircle size={14} /> Approve Result
                               </button>
                               <button className={styles.rejectBtn} onClick={() => verifySubmission(sub.id, 'Rejected')}>
                                 <XCircle size={14} /> Reject Proof
                               </button>
                             </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}