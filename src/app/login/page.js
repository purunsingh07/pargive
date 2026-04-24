"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { login, signup, googleLogin } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password, name);
            }
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-[#e4e9ee]">
            {/* Left Side: Branding / Visuals */}
            <div className="relative hidden w-1/2 lg:block">
                <Image
                    src="/login-golf.png"
                    alt="Golf Green"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F352E]/60 to-transparent p-16 flex flex-col justify-between text-white">
                    <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white mb-8">
                            <div className="h-3 w-3 rounded-full bg-white" />
                        </div>
                        <h1 className="font-serif text-6xl font-bold leading-[1.1] uppercase tracking-wide">
                            Elevate<br />Your Game
                        </h1>
                        <p className="mt-6 text-lg text-white/80 max-w-md font-light leading-relaxed">
                            Join the most exclusive golf community and experience perfection on every green.
                        </p>
                    </div>
                    <div className="text-white/40 text-[0.65rem] tracking-[0.3em] uppercase font-bold">
                        © 2026 Pargive — Premium Golf
                    </div>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-sm space-y-10">
                    <div className="text-center">
                        <h2 className="font-serif text-[2.5rem] font-bold text-[#0F352E] leading-tight mb-3">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-[#0F352E]/50 text-sm font-medium tracking-wide">
                            {isLogin ? "Enter your details to access the clubhouse" : "Join our community of premium golfers"}
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-2xl bg-red-500/5 p-4 text-center text-[0.75rem] font-semibold text-red-600/80 backdrop-blur-sm border border-red-500/10 animate-in fade-in slide-in-from-top-2 duration-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-2xl border border-[#0F352E]/10 bg-white/40 px-6 py-4 text-sm font-medium transition-all placeholder:text-[#0F352E]/30 focus:bg-white focus:shadow-xl focus:shadow-[#0F352E]/5 focus:outline-none"
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-2xl border border-[#0F352E]/10 bg-white/40 px-6 py-4 text-sm font-medium transition-all placeholder:text-[#0F352E]/30 focus:bg-white focus:shadow-xl focus:shadow-[#0F352E]/5 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-2xl border border-[#0F352E]/10 bg-white/40 px-6 py-4 text-sm font-medium transition-all placeholder:text-[#0F352E]/30 focus:bg-white focus:shadow-xl focus:shadow-[#0F352E]/5 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#0F352E] py-4 text-sm font-bold text-white transition-all hover:bg-[#1a4a42] hover:shadow-2xl hover:shadow-[#0F352E]/20 active:scale-[0.98] mt-2 shadow-lg shadow-[#0F352E]/10"
                        >
                            {isLogin ? "Sign In" : "Sign Up"}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#0F352E]/10" />
                        </div>
                        <div className="relative flex justify-center text-[0.65rem] uppercase tracking-[0.2em] font-bold">
                            <span className="bg-[#e4e9ee] px-4 text-[#0F352E]/30">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#0F352E]/10 bg-white px-6 py-4 text-sm font-bold text-[#0F352E] transition-all hover:bg-[#F9FAFB] hover:shadow-xl hover:shadow-black/5 active:scale-[0.98] shadow-sm"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>

                    <p className="text-center text-sm text-[#0F352E]/40 font-medium">
                        {isLogin ? "New here? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[#0F352E] border-b border-[#0F352E]/20 hover:border-[#0F352E] font-bold ml-1"
                        >
                            {isLogin ? "Create an account" : "Sign in instead"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
