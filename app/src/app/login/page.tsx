"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isBabcockEmail, isValidEmailShape, emailFieldClass } from "@/lib/validation";

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const EmailHint = ({ email, touched }: { email: string; touched: boolean }) => {
    if (!touched || !email) return null;
    if (!isValidEmailShape(email))
        return <p className="text-[12px] mt-[5px]" style={{ color: "#DC2626" }}>Enter a valid email address</p>;
    if (!isBabcockEmail(email))
        return <p className="text-[12px] mt-[5px]" style={{ color: "#DC2626" }}>Only Babcock student emails are accepted — e.g. <strong>yourname@student.babcock.edu.ng</strong></p>;
    return <p className="text-[12px] mt-[5px]" style={{ color: "#16A34A" }}>✓ Valid Babcock email</p>;
};

const inputBase = "w-full py-[13px] px-[14px] rounded-[12px] border-[1.5px] border-border-default bg-bg-card font-dm text-[14px] text-text-primary outline-none transition-all duration-150 placeholder:text-text-faint";
const inputClass = (state: string) => {
    if (state === "valid") return `${inputBase} !border-status-green shadow-[0_0_0_3px_var(--color-status-green-bg)]`;
    if (state === "invalid") return `${inputBase} !border-status-red shadow-[0_0_0_3px_var(--color-status-red-bg)]`;
    return `${inputBase} focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-light)]`;
};

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const emailValid = isValidEmailShape(email) && isBabcockEmail(email);
    const canSubmit = emailValid && password.length >= 6;

    return (
        <div className="slide-up min-h-screen px-5 pt-5 pb-8 overflow-y-auto" style={{ background: "#FAF8F4" }}>
            {/* Header */}
            <div className="mb-8 pt-3">
                <div className="w-[42px] h-[42px] bg-brand rounded-[12px] flex items-center justify-center mb-5">
                    <span className="font-sora text-white text-[20px] font-[800]">L</span>
                </div>
                <h2 className="font-sora text-[22px] font-[800] mb-[5px]" style={{ color: "#1C1A17", letterSpacing: -0.3 }}>Welcome back</h2>
                <p className="text-[13px]" style={{ color: "#6B6560" }}>Log in to your Link3y account</p>
            </div>

            {/* Google */}
            <div className="mb-5">
                <button className="w-full py-[13px] bg-bg-card border-[1.5px] border-border-default rounded-[13px] font-dm text-[14px] font-medium cursor-pointer transition-all duration-150 hover:border-border-strong hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex items-center justify-center gap-[10px]" style={{ color: "#1C1A17" }}>
                    <GoogleIcon />
                    Continue with Google
                </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-[10px] mb-5">
                <div className="flex-1 h-px bg-border-default" />
                <span className="text-[12px] whitespace-nowrap" style={{ color: "#A8A49E" }}>or log in with email</span>
                <div className="flex-1 h-px bg-border-default" />
            </div>

            {/* Form */}
            <div className="flex flex-col gap-[14px] mb-5">
                <div>
                    <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: "#6B6560", letterSpacing: 0.3 }}>STUDENT EMAIL</label>
                    <input className={inputClass(emailFieldClass(email, emailTouched))} placeholder="yourname@student.babcock.edu.ng" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setEmailTouched(true)} type="email" />
                    <EmailHint email={email} touched={emailTouched} />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-[6px]">
                        <label className="text-[12px] font-semibold" style={{ color: "#6B6560", letterSpacing: 0.3 }}>PASSWORD</label>
                        <button className="bg-none border-none text-brand font-semibold text-[12px] cursor-pointer hover:text-brand-dim font-dm">Forgot password?</button>
                    </div>
                    <div className="relative">
                        <input className={inputClass("")} placeholder="Your password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[16px] p-0 leading-none" style={{ color: "#A8A49E" }}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button disabled={!canSubmit} onClick={() => router.push("/success")}
                className="w-full py-[14px] bg-brand text-white rounded-[13px] font-dm text-[15px] font-semibold cursor-pointer transition-all hover:bg-brand-dim active:scale-[0.99] disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none"
                style={{ boxShadow: canSubmit ? "0 6px 20px rgba(193,125,47,0.32)" : "none" }}>
                Log in →
            </button>

            <p className="text-center text-[13px] mt-5" style={{ color: "#A8A49E" }}>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-brand font-semibold hover:text-brand-dim">Sign up</Link>
            </p>
        </div>
    );
}
