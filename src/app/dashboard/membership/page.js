"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Shield } from "lucide-react";

export default function MembershipPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const plans = [
        {
            name: "Monthly Pro",
            price: "$29",
            period: "per month",
            features: [
                "Full Golf Performance Tracking",
                "Monthly Draw Entry (Unlimited)",
                "Select Any Charity",
                "10% Minimum Donation",
                "Cancel Anytime"
            ],
            cta: "Choose Monthly",
            popular: false,
            type: "monthly"
        },
        {
            name: "Annual Elite",
            price: "$290",
            period: "per year",
            features: [
                "2 Months Free ($58 Savings)",
                "Full Golf Performance Tracking",
                "Monthly Draw Entry (Unlimited)",
                "Priority Winner Verification",
                "Select Any Charity",
                "Exclusive Founder Badge"
            ],
            cta: "Choose Yearly",
            popular: true,
            type: "yearly"
        }
    ];

    const handleSubscribe = async (planType) => {
        setLoading(planType);
        // Simulate Stripe checkout
        setTimeout(() => {
            alert(`Simulated checkout for ${planType} plan. In a real app, this would redirect to Stripe.`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="p-8 md:p-12 lg:p-16">
            <header className="mb-16 text-center max-w-2xl mx-auto">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0F352E] tracking-tight">Membership</h1>
                <p className="text-[#0F352E]/40 font-bold text-sm mt-6 tracking-widest uppercase mb-10">Choose the plan that suits your game and your impact</p>
                
                <div className="flex items-center justify-center gap-4 bg-[#0F352E]/5 p-2 rounded-full w-fit mx-auto border border-[#0F352E]/5">
                    <span className="text-[0.65rem] font-bold text-[#0F352E] px-6 py-2 rounded-full bg-white shadow-sm">Billed Monthly</span>
                    <span className="text-[0.65rem] font-bold text-[#0F352E]/40 px-6 py-2">Billed Yearly (Save 20%)</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {plans.map((plan) => (
                    <motion.div 
                        key={plan.name}
                        whileHover={{ y: -10 }}
                        className={`relative p-12 rounded-[48px] overflow-hidden border transition-all ${plan.popular ? 'bg-[#0F352E] text-white shadow-2xl shadow-[#0F352E]/30' : 'bg-white text-[#0F352E] border-[#0F352E]/5 shadow-sm'}`}
                    >
                        {plan.popular && (
                            <div className="absolute top-8 right-8 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[0.6rem] font-bold uppercase tracking-widest">
                                Best Value
                            </div>
                        )}

                        <div className="mb-12">
                            <h3 className="text-2xl font-serif font-bold mb-4">{plan.name}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-serif font-bold">{plan.price}</span>
                                <span className={`text-sm font-bold uppercase tracking-widest ${plan.popular ? 'text-white/40' : 'text-[#0F352E]/30'}`}>{plan.period}</span>
                            </div>
                        </div>

                        <ul className="space-y-6 mb-12">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/10' : 'bg-[#0F352E]/5'}`}>
                                        <Check size={14} className={plan.popular ? 'text-emerald-400' : 'text-emerald-600'} />
                                    </div>
                                    <span className={`text-sm font-medium ${plan.popular ? 'text-white/70' : 'text-[#0F352E]/60'}`}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => handleSubscribe(plan.type)}
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl text-[0.65rem] font-bold uppercase tracking-widest transition-all ${plan.popular ? 'bg-white text-[#0F352E] hover:scale-105' : 'bg-[#0F352E] text-white hover:bg-[#1a4a42]'}`}
                        >
                            {loading === plan.type ? 'Processing...' : user?.subscriptionStatus === plan.type ? 'Current Plan' : plan.cta}
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6">
                    <Shield className="text-[#0F352E]/20 mb-4" size={24} />
                    <h4 className="text-xs font-bold text-[#0F352E] uppercase tracking-widest mb-2">Secure Payments</h4>
                    <p className="text-[0.65rem] text-[#0F352E]/40 leading-relaxed">PCI-compliant transactions with end-to-end encryption.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                    <Zap className="text-[#0F352E]/20 mb-4" size={24} />
                    <h4 className="text-xs font-bold text-[#0F352E] uppercase tracking-widest mb-2">Instant Access</h4>
                    <p className="text-[0.65rem] text-[#0F352E]/40 leading-relaxed">Membership activated immediately after successful payment.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                    <Crown className="text-[#0F352E]/20 mb-4" size={24} />
                    <h4 className="text-xs font-bold text-[#0F352E] uppercase tracking-widest mb-2">Premium Perks</h4>
                    <p className="text-[0.65rem] text-[#0F352E]/40 leading-relaxed">Unlock exclusive golf events and higher prize pools.</p>
                </div>
            </div>
        </div>
    );
}
