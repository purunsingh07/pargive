"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScoreManager from "@/components/ScoreManager";
import { CreditCard, Heart, Trophy, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalScore: 0,
        roundCount: 0,
        avgScore: "0.0",
        activeDrawMonth: "Loading...",
        activeDrawPool: "TBD"
    });

    useEffect(() => {
        if (user?.id) {
            fetch(`/api/user/stats?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setStats(data));
        }
    }, [user?.id]);

    return (
        <div className="p-8 md:p-12 lg:p-16">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                <header className="mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0F352E] tracking-tight">Overview</h1>
                    <p className="text-[#0F352E]/40 font-bold text-sm mt-3 tracking-widest uppercase">Member Statistics — {user?.displayName}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Featured Banner */}
                        <div className="bg-[#0F352E] rounded-[48px] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#0F352E]/30">
                            <div className="relative z-10 max-w-lg">
                                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Your Legacy<br />is the Course.</h3>
                                <p className="text-white/50 mb-10 font-medium italic leading-relaxed text-lg">
                                    Welcome back to the inner circle. Your journey at Pargive is a testament to precision and passion.
                                </p>
                                <button className="bg-white text-[#0F352E] px-12 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                    Book Tee Time
                                </button>
                            </div>
                            {/* Premium Glow elements */}
                            <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
                            <div className="absolute left-[-5%] bottom-[-5%] w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                        </div>

                        {/* Scores Section */}
                        <ScoreManager userId={user?.id} />
                    </div>

                    {/* Right Side Cards */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Member Status Card */}
                        <div className="bg-white rounded-[48px] p-10 shadow-2xl shadow-[#0F352E]/5 border border-white">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative h-36 w-36 mb-8 rounded-full p-2 border border-[#0F352E]/5 bg-[#f5f8fa]">
                                    <div className="relative h-full w-full rounded-full overflow-hidden bg-[#0F352E]">
                                        {user?.photoBase64 ? (
                                            <Image src={user.photoBase64} alt={user.displayName} fill className="object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-white text-5xl font-serif">
                                                {user?.displayName?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-[#0F352E] tracking-tight leading-none">{user?.displayName}</h2>
                                <div className="mt-4 flex items-center gap-2 bg-[#0F352E]/5 px-4 py-1.5 rounded-full">
                                    <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${user?.subscriptionStatus !== 'inactive' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                    <span className="text-[#0F352E]/60 font-bold text-[0.65rem] uppercase tracking-[0.25em]">
                                        {user?.subscriptionStatus !== 'inactive' ? 'Active Member' : 'Guest Member'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Charity Contribution Card */}
                        <div className="bg-white rounded-[48px] p-10 shadow-sm border border-[#0F352E]/5">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#0F352E]/30 font-sans">Charity Impact</h4>
                                <Heart size={16} className="text-emerald-500" />
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                        <Heart size={20} className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#0F352E]/40 uppercase tracking-widest">Active Choice</p>
                                        <p className="text-sm font-bold text-[#0F352E]">{user?.charityName || "No charity selected"}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-3xl bg-[#0F352E]/5 border border-[#0F352E]/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[0.65rem] font-bold text-[#0F352E]/40 uppercase tracking-widest">Monthly Share</span>
                                        <span className="text-xs font-bold text-[#0F352E]">{user?.charityPercentage || 10}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#0F352E]/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${user?.charityPercentage || 10}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Draw Participation Card */}
                        <div className="bg-[#0F352E] rounded-[48px] p-10 shadow-2xl text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-white/30 font-sans">Monthly Draw</h4>
                                    <Trophy size={16} className="text-emerald-400" />
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-lg font-serif font-bold">Entered in {stats.activeDrawMonth}</p>
                                    </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                            <span>Draw Pool</span>
                                            <span className="text-emerald-400">{stats.activeDrawPool}</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: "85%" }}></div>
                                        </div>
                                    </div>
                                    <button className="w-full bg-white/10 hover:bg-white/20 transition-all rounded-2xl py-3 text-[0.65rem] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                        View Details <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute right-[-20%] bottom-[-20%] w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px]"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
