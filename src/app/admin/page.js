"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Users, 
    Trophy, 
    Heart, 
    ShieldCheck, 
    Settings, 
    TrendingUp, 
    AlertCircle,
    CheckCircle2,
    XCircle,
    ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [adminStats, setAdminStats] = useState({
        totalUsers: 0,
        totalScores: 0,
        pendingVerifications: 0,
        totalPrizePool: 0
    });
    const [winnerList, setWinnerList] = useState([]);
    const [simulating, setSimulating] = useState(false);

    const refreshData = async () => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(data => setAdminStats(data));
        
        fetch("/api/admin/winners")
            .then(res => res.json())
            .then(data => setWinnerList(data.winners || []));
    };

    useEffect(() => {
        if (!authLoading && (!user || !user.isAdmin)) {
            router.push("/dashboard");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user?.isAdmin) {
            refreshData();
        }
    }, [user?.isAdmin]);

    const handleSimulate = async () => {
        setSimulating(true);
        try {
            const res = await fetch("/api/admin/draws/simulate", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                alert(`Simulation Complete! Winning Numbers: ${data.winningNumbers.join(", ")}. Found ${data.winnersFound} matches.`);
                refreshData();
            } else {
                alert("Simulation failed: " + data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSimulating(false);
        }
    };

    if (authLoading || !user || !user.isAdmin) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-[#0F352E]/10 border-t-[#0F352E] rounded-full animate-spin"></div>
            </div>
        );
    }

    const stats = [
        { name: "Total Members", value: adminStats.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
        { name: "Prize Pool", value: `$${adminStats.totalPrizePool}`, icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
        { name: "Total Rounds", value: adminStats.totalScores, icon: Heart, color: "text-emerald-500", bg: "bg-emerald-50" },
        { name: "Pending Review", value: adminStats.pendingVerifications, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Admin Sidebar */}
            <aside className="w-80 bg-white border-r border-[#0F352E]/5 p-10 flex flex-col">
                <div className="flex items-center gap-3 mb-16">
                    <div className="h-10 w-10 bg-[#0F352E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0F352E]/20">
                        <ShieldCheck className="text-white" size={24} />
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#0F352E]">Admin</span>
                </div>

                <nav className="space-y-3 flex-1">
                    {[
                        { id: "overview", name: "System Overview", icon: TrendingUp },
                        { id: "users", name: "User Management", icon: Users },
                        { id: "draws", name: "Draw Config", icon: Trophy },
                        { id: "charities", name: "Charity Management", icon: Heart },
                        { id: "settings", name: "Global Settings", icon: Settings },
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-[#0F352E] text-white shadow-xl shadow-[#0F352E]/10' : 'text-[#0F352E]/40 hover:bg-[#0F352E]/5 hover:text-[#0F352E]'}`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="pt-8 border-t border-[#0F352E]/5">
                    <button 
                        onClick={() => router.push("/dashboard")}
                        className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-[#0F352E]/5 text-[#0F352E] font-bold text-sm hover:bg-[#0F352E]/10 transition-all"
                    >
                        Back to Clubhouse <ArrowRight size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-16">
                <header className="mb-16 flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-5xl font-bold text-[#0F352E] tracking-tight capitalize">{activeTab}</h1>
                        <p className="text-[#0F352E]/40 font-bold text-sm mt-3 tracking-widest uppercase">System Analytics & Controls</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleSimulate}
                            disabled={simulating}
                            className="bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                        >
                            {simulating ? "Simulating..." : "Run Simulation"}
                        </button>
                    </div>
                </header>

                {activeTab === "overview" && (
                    <div className="space-y-12">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-8">
                            {stats.map(s => (
                                <div key={s.name} className="bg-white p-8 rounded-[40px] shadow-sm border border-[#0F352E]/5">
                                    <div className={`h-12 w-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6`}>
                                        <s.icon size={24} />
                                    </div>
                                    <h4 className="text-[0.65rem] font-bold text-[#0F352E]/30 uppercase tracking-[0.2em] mb-2">{s.name}</h4>
                                    <p className="text-3xl font-serif font-bold text-[#0F352E]">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity / Pending Verification */}
                        <div className="bg-white rounded-[48px] p-12 shadow-sm border border-[#0F352E]/5">
                            <h3 className="text-2xl font-serif font-bold text-[#0F352E] mb-10">Pending Verifications</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#0F352E]/5 text-[0.65rem] font-bold text-[#0F352E]/30 uppercase tracking-widest">
                                            <th className="text-left pb-6 pl-2">User</th>
                                            <th className="text-left pb-6">Match Type</th>
                                            <th className="text-left pb-6">Amount</th>
                                            <th className="text-left pb-6">Status</th>
                                            <th className="text-right pb-6 pr-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#0F352E]/5">
                                        {winnerList.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="py-20 text-center text-[#0F352E]/20 font-bold uppercase tracking-widest text-xs">
                                                    No pending verifications
                                                </td>
                                            </tr>
                                        ) : winnerList.map((winner) => (
                                            <tr key={winner.id} className="group">
                                                <td className="py-8 pl-2">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-full bg-[#0F352E]/5 flex items-center justify-center text-[#0F352E] font-bold text-xs uppercase">
                                                            {winner.userName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-[#0F352E]">{winner.userName}</p>
                                                            <p className="text-xs text-[#0F352E]/40">{winner.userEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-8">
                                                    <span className="bg-[#0F352E]/5 px-4 py-1.5 rounded-full text-[0.65rem] font-bold text-[#0F352E] uppercase">{winner.matchType}-Number Match</span>
                                                </td>
                                                <td className="py-8 font-serif font-bold text-[#0F352E]">${winner.amount}</td>
                                                <td className="py-8">
                                                    <div className={`flex items-center gap-2 ${winner.status === 'pending' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                                        <AlertCircle size={14} />
                                                        <span className="text-[0.65rem] font-bold uppercase tracking-widest">{winner.status}</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 text-right pr-2">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button className="h-10 w-10 rounded-xl hover:bg-emerald-50 text-emerald-500 flex items-center justify-center transition-all">
                                                            <CheckCircle2 size={20} />
                                                        </button>
                                                        <button className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500 flex items-center justify-center transition-all">
                                                            <XCircle size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== "overview" && (
                    <div className="h-96 w-full flex flex-col items-center justify-center bg-white rounded-[48px] border border-dashed border-[#0F352E]/10">
                        <Settings className="text-[#0F352E]/10 mb-6" size={48} />
                        <h3 className="text-xl font-serif font-bold text-[#0F352E]/30">Module Under Construction</h3>
                        <p className="text-[0.7rem] font-bold text-[#0F352E]/20 uppercase tracking-widest mt-2 px-12 text-center max-w-sm leading-relaxed">
                            This administrative module is currently being optimized for high-volume data handling.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
