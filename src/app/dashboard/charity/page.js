"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Check, Info } from "lucide-react";
import Image from "next/image";

export default function CharityPage() {
    const { user } = useAuth();
    const [charities, setCharities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [percentage, setPercentage] = useState(10);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetch("/api/charities")
            .then(res => res.json())
            .then(data => {
                setCharities(data.charities || []);
                setLoading(false);
            });
    }, []);

    const handleSelect = async (charityId) => {
        setUpdating(true);
        try {
            const res = await fetch("/api/charities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id, charityId, percentage }),
            });
            if (res.ok) {
                // Success - could show a toast
                window.location.reload(); // Refresh to update user context
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    const filtered = charities.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 md:p-12 lg:p-16">
            <header className="mb-16">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0F352E] tracking-tight">Charitable Impact</h1>
                <p className="text-[#0F352E]/40 font-bold text-sm mt-3 tracking-widest uppercase">Select a cause to support with your participation</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0F352E]/30" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search charities..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white rounded-[32px] pl-16 pr-8 py-5 text-sm font-medium border border-[#0F352E]/5 focus:outline-none focus:ring-2 ring-[#0F352E]/10"
                        />
                    </div>

                    {/* Charity Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading ? (
                            [1,2,3,4].map(i => <div key={i} className="h-64 bg-[#0F352E]/5 animate-pulse rounded-[40px]"></div>)
                        ) : filtered.map(charity => (
                            <motion.div 
                                key={charity.id}
                                whileHover={{ y: -5 }}
                                className={`bg-white rounded-[40px] overflow-hidden border transition-all ${user?.charityId === charity.id ? 'border-[#0F352E] shadow-2xl shadow-[#0F352E]/10' : 'border-transparent shadow-sm'}`}
                            >
                                <div className="relative h-44 w-full">
                                    <Image src={charity.imageUrl} alt={charity.name} fill className="object-cover" />
                                    {user?.charityId === charity.id && (
                                        <div className="absolute top-4 right-4 bg-[#0F352E] text-white p-2 rounded-full">
                                            <Check size={16} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-serif font-bold text-[#0F352E] mb-3">{charity.name}</h3>
                                    <p className="text-[#0F352E]/50 text-sm leading-relaxed mb-6 line-clamp-2">{charity.description}</p>
                                    <button 
                                        onClick={() => handleSelect(charity.id)}
                                        disabled={updating || user?.charityId === charity.id}
                                        className={`w-full py-4 rounded-2xl text-[0.65rem] font-bold uppercase tracking-widest transition-all ${user?.charityId === charity.id ? 'bg-[#0F352E]/5 text-[#0F352E]' : 'bg-[#0F352E] text-white hover:bg-[#1a4a42]'}`}
                                    >
                                        {user?.charityId === charity.id ? 'Currently Selected' : updating ? 'Updating...' : 'Choose Charity'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white rounded-[48px] p-10 shadow-sm border border-[#0F352E]/5">
                        <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#0F352E]/30 mb-8 font-sans">Contribution Logic</h4>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-xs font-bold text-[#0F352E] uppercase tracking-widest">Percentage</span>
                                    <span className="text-lg font-serif font-bold text-[#0F352E]">{percentage}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="50" 
                                    step="5"
                                    value={percentage}
                                    onChange={(e) => setPercentage(parseInt(e.target.value))}
                                    className="w-full accent-[#0F352E]"
                                />
                                <p className="text-[0.6rem] text-[#0F352E]/40 font-bold uppercase tracking-widest leading-relaxed">
                                    A minimum of 10% from every subscription goes directly to your chosen charity. You can increase this to amplify your impact.
                                </p>
                            </div>

                            <div className="pt-8 border-t border-[#0F352E]/5 space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-3xl bg-[#0F352E]/5">
                                    <Info size={16} className="text-[#0F352E] mt-0.5" />
                                    <p className="text-[0.7rem] text-[#0F352E] font-medium leading-relaxed">
                                        Your selected charity receives funds monthly based on your active subscription status.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0F352E] rounded-[48px] p-10 shadow-2xl text-white">
                        <Heart className="mb-6 opacity-40" size={32} />
                        <h3 className="text-2xl font-serif font-bold mb-4">Total Impact</h3>
                        <p className="text-white/40 font-bold text-[0.65rem] uppercase tracking-widest mb-10">Your contribution to date</p>
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-serif font-bold">$124</span>
                            <span className="text-white/40 font-bold mb-1">.50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
