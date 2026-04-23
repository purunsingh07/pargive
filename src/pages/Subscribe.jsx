import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, Award, CreditCard, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { CHARITIES } from '../lib/mockData';
import styles from './Subscribe.module.css';

const PLANS = {
  monthly: { price: 9.99, label: 'month', save: null },
  yearly: { price: 99.99, label: 'year', save: 'Save £19.89' },
};

export default function Subscribe() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly');
  const [charityPct, setCharityPct] = useState(20);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [step, setStep] = useState(1); 
  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvv: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const plan = PLANS[billing];
  const charityAmount = ((plan.price * charityPct) / 100).toFixed(2);
  const prizeAmount = ((plan.price * (100 - charityPct)) / 100).toFixed(2);

  const validateStep3 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.card.replace(/\s/g, '').length < 16) e.card = 'Enter 16-digit card number';
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Format: MM/YY';
    if (form.cvv.length < 3) e.cvv = '3-digit CVV required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px' }}
        >
          <div className={styles.successIcon}><CheckCircle size={64} color="var(--green-mid)" /></div>
          <h1 className={styles.successTitle}>Welcome to ParGive</h1>
          <p className={styles.successSub}>Your subscription is active. Your official rolling average is being calculated based on your next 5 uploads.</p>
          
          <div className={styles.summaryBox}>
            <div className={styles.sumRow}><span>Plan</span><strong>£{plan.price}/{plan.label}</strong></div>
            <div className={styles.sumRow}><span>Impact Partition</span><strong>{charityPct}% (£{charityAmount})</strong></div>
            <div className={styles.sumRow}><span>Selected Partner</span><strong>{selectedCharity?.name}</strong></div>
          </div>

          <button className="btn btn-gold btn-lg" style={{ width: '100%' }} onClick={() => navigate('/dashboard')}>
            Enter The Clubhouse <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        
        {/* Progress Nav */}
        <div className={styles.stepper}>
          {['Membership', 'Impact Partner', 'Payment'].map((label, i) => (
            <div key={i} className={`${styles.stepIndicator} ${step >= i + 1 ? styles.stepActive : ''}`}>
              <div className={styles.stepNum}>{i + 1}</div>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.contentWrap}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.mainStep}
            >

              {/* ── STEP 1: Plan ── */}
              {step === 1 && (
                <div className="glass-card" style={{ padding: '3rem' }}>
                  <h2 className={styles.title}>Secure your spot</h2>
                  <p className={styles.sub}>Exclusive entry to the world's most rewarding golf network.</p>

                  <div className={styles.toggleRow}>
                    <button className={billing === 'monthly' ? styles.activeT : ''} onClick={() => setBilling('monthly')}>Monthly</button>
                    <button className={billing === 'yearly' ? styles.activeT : ''} onClick={() => setBilling('yearly')}>
                      Yearly {plan.save && <span className={styles.save}>{plan.save}</span>}
                    </button>
                  </div>

                  <div className={styles.planFeatureGrid}>
                    <div className={styles.planHero}>
                      <span className={styles.pTag}>The Pro Tier</span>
                      <div className={styles.pPrice}>£{plan.price}<span>/{plan.label}</span></div>
                    </div>
                    <ul className={styles.pList}>
                      <li><Award size={16} /> Verified Rolling Handicapping</li>
                      <li><ShieldCheck size={16} /> Fully Audited Draw Engine</li>
                      <li><Heart size={16} /> 100% Impact Transparency</li>
                    </ul>
                  </div>

                  <div className={styles.sliderControl}>
                    <div className={styles.sliderHead}>
                      <span>Impact Split (Charity)</span>
                      <strong>{charityPct}%</strong>
                    </div>
                    <input
                      type="range" min="10" max="50" step="5"
                      value={charityPct}
                      onChange={e => setCharityPct(+e.target.value)}
                      className={styles.pSlider}
                    />
                    <div className={styles.splitViz}>
                      <div className={styles.splitBar} style={{ width: `${charityPct}%`, background: 'var(--green-mid)' }} />
                      <div className={styles.splitBar} style={{ width: `${100 - charityPct}%`, background: 'var(--gold)' }} />
                    </div>
                    <div className={styles.splitLabels}>
                      <span>£{charityAmount} Charity</span>
                      <span>£{prizeAmount} Prize Pool</span>
                    </div>
                  </div>

                  <button className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setStep(2)}>
                    Select Impact Partner <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {/* ── STEP 2: Charity ── */}
              {step === 2 && (
                <div className="glass-card" style={{ padding: '3rem' }}>
                  <h2 className={styles.title}>Select Impact Partner</h2>
                  <p className={styles.sub}>Your {charityPct}% (£{charityAmount}) contribution goes directly to your choice.</p>

                  <div className={styles.charityGrid}>
                    {CHARITIES.slice(0, 8).map(c => (
                      <button
                        key={c.id}
                        className={`${styles.cCard} ${selectedCharity?.id === c.id ? styles.cActive : ''}`}
                        onClick={() => setSelectedCharity(c)}
                      >
                        <div className={styles.cLogo}>{c.logo}</div>
                        <div className={styles.cName}>{c.name}</div>
                        <div className={styles.cTag}>{c.category}</div>
                      </button>
                    ))}
                  </div>

                  <div className={styles.navBtns}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}><ChevronLeft size={18} /> Plan</button>
                    <button
                      className="btn btn-gold"
                      style={{ padding: '1rem 3rem' }}
                      disabled={!selectedCharity}
                      onClick={() => setStep(3)}
                    >
                      Payment <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Payment ── */}
              {step === 3 && (
                <div className="glass-card" style={{ padding: '3rem' }}>
                  <h2 className={styles.title}>Checkout</h2>
                  <p className={styles.sub}>Start your membership today. Secure & Encrypted.</p>

                  <div className={styles.orderSummary}>
                    <div className={styles.summaryItem}>
                      <span>ParGive Membership ({billing})</span>
                      <strong>£{plan.price}</strong>
                    </div>
                    <div className={styles.summaryImpact}>
                      <Heart size={14} /> Supporting {selectedCharity?.name}
                    </div>
                  </div>

                  <div className={styles.form}>
                    <div className={styles.field}>
                      <label>Full Name</label>
                      <input 
                        type="text" placeholder="John Doe" 
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Email Address</label>
                      <input 
                        type="email" placeholder="john@example.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Card Details <CreditCard size={14} style={{ marginLeft: 'auto' }} /></label>
                      <div className={styles.cardInput}>
                        <input 
                          type="text" placeholder="0000 0000 0000 0000"
                          value={form.card} onChange={e => setForm({ ...form, card: formatCard(e.target.value) })}
                          maxLength={19}
                        />
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <input 
                          type="text" placeholder="MM/YY"
                          value={form.expiry} onChange={e => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                          maxLength={5}
                        />
                      </div>
                      <div className={styles.field}>
                        <input 
                          type="password" placeholder="CVV"
                          value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                          maxLength={3}
                        />
                      </div>
                    </div>
                    {Object.keys(errors).length > 0 && <p className={styles.err}>Please check all fields.</p>}
                  </div>

                  <div className={styles.navBtns}>
                    <button className="btn btn-ghost" onClick={() => setStep(2)}><ChevronLeft size={18} /> Charity</button>
                    <button className="btn btn-gold" style={{ padding: '1rem 3rem' }} onClick={handleSubmit}>
                      Submit Payment & Join
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          <aside className={styles.legal}>
            <p>Terms of Service & Privacy Policy apply.</p>
            <p>© 2025 ParGive Platform. All rights reserved.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}