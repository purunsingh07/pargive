import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ExternalLink, Filter } from 'lucide-react';
import { CHARITIES } from '../lib/mockData';
import styles from './Charities.module.css';

export default function Charities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(CHARITIES.map(c => c.category))];

  const filtered = CHARITIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <main className={styles.page}>
      <div className="container">
        
        {/* Header */}
        <section className={styles.header}>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-tag"
          >
            Vetted Partners
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Support what matters to you
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-sub"
          >
            Choose where your impact goes. 100% of your charity split is sent directly to 
            our verified partners each month.
          </motion.p>
        </section>

        {/* Filters */}
        <div className={styles.filterRow}>
          <div className={styles.searchWrap}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search charities..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.catWrap}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((c, idx) => (
              <motion.div 
                layout
                key={c.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.logoBox}>{c.logo}</div>
                  <span className={styles.tag}>{c.category}</span>
                </div>

                <h3 className={styles.name}>{c.name}</h3>
                <p className={styles.desc}>{c.desc}</p>
                
                <div className={styles.impact}>
                  <Heart size={14} fill="var(--green-accent)" color="var(--green-accent)" />
                  <span>{c.impact}</span>
                </div>

                <div className={styles.actions}>
                  <button className="btn btn-gold" style={{ flex: 1 }}>Select Charity</button>
                  <button className="btn btn-ghost" style={{ padding: '0.75rem' }}>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <h3>No results found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </main>
  );
}