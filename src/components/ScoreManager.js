"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trophy, Calendar, Pencil, Trash2, X } from "lucide-react";

export default function ScoreManager({ userId }) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newScore, setNewScore] = useState("");
    const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
    const [error, setError] = useState("");

    const fetchScores = async () => {
        if (!userId) return;
        try {
            const res = await fetch(`/api/scores?userId=${userId}`);
            const data = await res.json();
            if (data.scores) setScores(data.scores);
        } catch (err) {
            console.error("Failed to fetch scores:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScores();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        const scoreVal = parseInt(newScore);
        if (isNaN(scoreVal) || scoreVal < 1 || scoreVal > 45) {
            setError("Score must be between 1 and 45");
            return;
        }

        try {
            const res = await fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, score: scoreVal, date: newDate }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsAdding(false);
                setNewScore("");
                fetchScores();
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to save score");
        }
    };

    return (
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-[#0F352E]/5">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[#0F352E]/30 mb-2 font-sans">Performance Index</h4>
                    <h3 className="text-2xl font-serif font-bold text-[#0F352E]">Golf Scores</h3>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-[#0F352E] text-white p-3 rounded-2xl hover:bg-[#1a4a42] transition-colors shadow-lg shadow-[#0F352E]/10"
                >
                    <Plus size={20} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                {isAdding ? (
                    <motion.form 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-[#0F352E]/5 p-8 rounded-[32px] mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0F352E] uppercase tracking-widest">New Entry</span>
                            <button type="button" onClick={() => setIsAdding(false)} className="text-[#0F352E]/30 hover:text-[#0F352E]">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[0.6rem] font-bold text-[#0F352E]/40 uppercase tracking-widest block ml-1">Stableford Score</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="45"
                                    value={newScore}
                                    onChange={(e) => setNewScore(e.target.value)}
                                    placeholder="1-45"
                                    className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#0F352E] focus:outline-none focus:ring-2 ring-[#0F352E]/10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[0.6rem] font-bold text-[#0F352E]/40 uppercase tracking-widest block ml-1">Date</label>
                                <input 
                                    type="date" 
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#0F352E] focus:outline-none focus:ring-2 ring-[#0F352E]/10"
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-[0.65rem] font-bold">{error}</p>}
                        <button 
                            type="submit" 
                            className="w-full bg-[#0F352E] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#1a4a42] transition-all"
                        >
                            Confirm Entry
                        </button>
                    </motion.form>
                ) : null}
            </AnimatePresence>

            <div className="space-y-4">
                {loading ? (
                    <div className="py-10 text-center text-[#0F352E]/20 font-bold text-xs uppercase tracking-widest">Loading stats...</div>
                ) : scores.length === 0 ? (
                    <div className="py-10 text-center">
                        <div className="w-16 h-16 bg-[#0F352E]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy size={24} className="text-[#0F352E]/20" />
                        </div>
                        <p className="text-[#0F352E]/30 font-bold text-xs uppercase tracking-widest">No scores recorded yet</p>
                    </div>
                ) : (
                    scores.map((s, index) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={s.id} 
                            className={`flex items-center justify-between p-6 rounded-[28px] transition-all hover:bg-[#0F352E]/5 group ${index === 0 ? 'bg-[#0F352E]/5' : 'bg-transparent'}`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-[#0F352E] text-white' : 'bg-[#0F352E]/5 text-[#0F352E]'}`}>
                                    {s.score}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#0F352E]">Round Score</p>
                                    <div className="flex items-center gap-2 text-[0.65rem] font-bold text-[#0F352E]/40 uppercase tracking-widest mt-1">
                                        <Calendar size={12} />
                                        {new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                            {index === 0 && (
                                <span className="bg-[#0F352E]/10 text-[#0F352E] px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest">Latest</span>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
            
            <p className="mt-8 text-[0.6rem] font-bold text-[#0F352E]/20 uppercase tracking-[0.2em] leading-relaxed italic">
                * Only your latest 5 rounds are factored into the draw algorithm.
            </p>
        </div>
    );
}
