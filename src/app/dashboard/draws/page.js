"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Sparkles, HelpCircle, ArrowUpRight } from "lucide-react";

export default function DrawsPage() {
    const { user } = useAuth();
    const [drawRecords, setDrawRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/draws")
            .then(res => res.json())
            .then(data => {
                setDrawRecords(data.draws || []);
                setLoading(false);
            });
    }, []);

    const upcomingDraw = drawRecords.find(d => d.status === 'pending') || {
        month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalPrizePool: "Calculating...",
        status: 'pending'
    };

    const pastDraws = drawRecords.filter(d => d.status === 'published');

    return (
        <div className="p-8 md:p-12 lg:p-16">
            <header className="mb-16">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0F352E] tracking-tight">The Draw</h1>
                <p className="text-[#0F352E]/40 font-bold text-sm mt-3 tracking-widest uppercase">Monthly rewards for precision and charitable impact</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    {/* Active Draw Banner */}
                    <div className="bg-[#0F352E] rounded-[48px] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#0F352E]/30">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full w-fit text-[0.65rem] font-bold uppercase tracking-widest mb-8 border border-emerald-500/20">
                                <Sparkles size={14} /> Active Pool
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">{typeof upcomingDraw.month === 'string' ? upcomingDraw.month : new Date(upcomingDraw.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                            <div className="flex flex-wrap gap-12 mt-12">
                                <div>
                                    <p className="text-white/40 text-[0.65rem] font-bold uppercase tracking-widest mb-2">Estimated Prize Pool</p>
                                    <p className="text-4xl font-serif font-bold text-emerald-400">${upcomingDraw.totalPrizePool}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 text-[0.65rem] font-bold uppercase tracking-widest mb-2">Draw Date</p>
                                    <p className="text-2xl font-bold">{upcomingDraw.month ? new Date(upcomingDraw.month).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBD"}</p>
                                </div>
                            </div>
                            <div className="mt-16 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0F352E] bg-white/10 overflow-hidden flex items-center justify-center">
                                            <span className="text-[0.6rem] font-bold">G{i}</span>
                                        </div>
                                    ))}
                                    <div className="h-10 w-10 rounded-full border-2 border-[#0F352E] bg-emerald-500 flex items-center justify-center">
                                        <span className="text-[0.6rem] font-bold">+842</span>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-white/60 tracking-wide">Members currently enrolled</p>
                            </div>
                        </div>
                        {/* Graphics */}
                        <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                        <div className="absolute left-[40%] bottom-[10%] w-64 h-64 bg-white/5 rounded-full blur-[60px]"></div>
                    </div>

                    {/* How it works */}
                    <div className="bg-white rounded-[40px] p-12 shadow-sm border border-[#0F352E]/5">
                        <div className="flex items-center gap-4 mb-10">
                            <HelpCircle className="text-[#0F352E]/20" size={24} />
                            <h3 className="text-2xl font-serif font-bold text-[#0F352E]">Prize Logic</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="p-4 rounded-3xl bg-[#0F352E]/5 w-fit">
                                    <span className="text-lg font-serif font-bold text-[#0F352E]">40%</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#0F352E] uppercase tracking-widest">5-Number Match</h4>
                                <p className="text-xs text-[#0F352E]/50 leading-relaxed font-bold">The Jackpot. Rollover applied if no winner exists.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 rounded-3xl bg-[#0F352E]/5 w-fit">
                                    <span className="text-lg font-serif font-bold text-[#0F352E]">35%</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#0F352E] uppercase tracking-widest">4-Number Match</h4>
                                <p className="text-xs text-[#0F352E]/50 leading-relaxed font-bold">Secondary Pool. Split equally among all matches.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 rounded-3xl bg-[#0F352E]/5 w-fit">
                                    <span className="text-lg font-serif font-bold text-[#0F352E]">25%</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#0F352E] uppercase tracking-widest">3-Number Match</h4>
                                <p className="text-xs text-[#0F352E]/50 leading-relaxed font-bold">Community Pool. Distributed to smaller matches.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white rounded-[48px] p-10 shadow-sm border border-[#0F352E]/5">
                        <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#0F352E]/30 mb-8 font-sans">Past Results</h4>
                        <div className="space-y-8">
                            {pastDraws.map((draw, i) => (
                                <div key={i} className={`pb-8 ${i < pastDraws.length - 1 ? 'border-b border-[#0F352E]/5' : ''}`}>
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-sm font-bold text-[#0F352E]">{new Date(draw.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                        <p className="text-[0.65rem] font-bold text-emerald-600 uppercase tracking-widest">${draw.totalPrizePool}</p>
                                    </div>
                                    <div className="flex gap-2 mb-4">
                                        {(draw.winningNumbers || []).map((num, j) => (
                                            <div key={j} className="w-8 h-8 rounded-lg bg-[#0F352E]/5 border border-[#0F352E]/5 flex items-center justify-center text-[0.65rem] font-bold text-[#0F352E]">
                                                {num}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[0.65rem] font-bold text-[#0F352E]/40 uppercase tracking-widest">
                                        {draw.winners} Professional Winners
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#0F352E]/40 hover:text-[#0F352E] transition-colors">
                            Archive Results <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="bg-[#0F352E] rounded-[48px] p-10 shadow-2xl text-white relative overflow-hidden">
                        <Trophy className="opacity-20 mb-6" size={32} />
                        <h3 className="text-2xl font-serif font-bold mb-4">Winner Verification</h3>
                        <p className="text-white/40 text-xs leading-relaxed mb-10 font-medium">
                            If you match 3 or more numbers, you must upload your score verification screenshot to claim prizes.
                        </p>
                        <button className="w-full bg-white text-[#0F352E] py-4 rounded-2xl text-[0.65rem] font-bold uppercase tracking-widest shadow-xl">
                            Upload Proof
                        </button>
                        <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
