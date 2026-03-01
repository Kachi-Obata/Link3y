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

export default function SignUpPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [googleClicked, setGoogleClicked] = useState(false);
    const [googleEmail, setGoogleEmail] = useState("");
    const [googleEmailTouched, setGoogleEmailTouched] = useState(false);

    const emailValid = isValidEmailShape(email) && isBabcockEmail(email);
    const canSubmit = fullName.trim().length > 1 && emailValid && password.length >= 6;
    const googleEmailValid = isValidEmailShape(googleEmail) && isBabcockEmail(googleEmail);

    return (
        <div className="slide-up min-h-screen px-5 pt-5 pb-8 overflow-y-auto" style={{ background: "#FAF8F4" }}>
            {/* Back */}
            <Link href="/login" className="flex items-center gap-[5px] text-[13px] font-dm font-medium mb-6 no-underline" style={{ color: "#6B6560" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Back
            </Link>

            {/* Header */}
            <div className="mb-7">
                <h2 className="font-sora text-[22px] font-[800] mb-[5px]" style={{ color: "#1C1A17", letterSpacing: -0.3 }}>Create your account</h2>
                <p className="text-[13px] leading-[1.5]" style={{ color: "#6B6560" }}>Only Babcock University student emails are accepted.</p>
            </div>

            {/* Google option */}
            {!googleClicked ? (
                <div className="mb-5">
                    <button onClick={() => setGoogleClicked(true)} className="w-full py-[13px] bg-bg-card border-[1.5px] border-border-default rounded-[13px] font-dm text-[14px] font-medium cursor-pointer transition-all duration-150 hover:border-border-strong hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex items-center justify-center gap-[10px]" style={{ color: "#1C1A17" }}>
                        <GoogleIcon />
                        Sign up with Google
                    </button>
                </div>
            ) : (
                <div className="slide-up bg-bg-card border border-border-default rounded-[14px] p-[14px_16px] mb-5">
                    <div className="flex items-center gap-2 mb-[10px]">
                        <GoogleIcon />
                        <p className="text-[13px] font-semibold" style={{ color: "#1C1A17" }}>Sign up with Google</p>
                    </div>
                    <p className="text-[12px] mb-[10px] leading-[1.5]" style={{ color: "#6B6560" }}>We&apos;ll verify your Babcock email before connecting your Google account.</p>
                    <div className="mb-2">
                        <input
                            className={inputClass(emailFieldClass(googleEmail, googleEmailTouched))}
                            placeholder="yourname@student.babcock.edu.ng"
                            value={googleEmail}
                            onChange={e => setGoogleEmail(e.target.value)}
                            onBlur={() => setGoogleEmailTouched(true)}
                        />
                        <EmailHint email={googleEmail} touched={googleEmailTouched} />
                    </div>
                    {googleEmailValid && (
                        <button className="w-full py-[14px] bg-brand text-white rounded-[13px] font-dm text-[15px] font-semibold cursor-pointer mt-1 transition-all hover:bg-brand-dim" style={{ boxShadow: "0 6px 20px rgba(193,125,47,0.32)" }}>
                            Continue with Google →
                        </button>
                    )}
                </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-[10px] mb-5">
                <div className="flex-1 h-px bg-border-default" />
                <span className="text-[12px] whitespace-nowrap" style={{ color: "#A8A49E" }}>or sign up with email</span>
                <div className="flex-1 h-px bg-border-default" />
            </div>

            {/* Form */}
            <div className="flex flex-col gap-[14px] mb-5">
                <div>
                    <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: "#6B6560", letterSpacing: 0.3 }}>FULL NAME</label>
                    <input className={inputClass("")} placeholder="e.g. Obata Onyelukachukwu" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div>
                    <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: "#6B6560", letterSpacing: 0.3 }}>STUDENT EMAIL</label>
                    <input className={inputClass(emailFieldClass(email, emailTouched))} placeholder="yourname@student.babcock.edu.ng" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setEmailTouched(true)} type="email" />
                    <EmailHint email={email} touched={emailTouched} />
                </div>
                <div>
                    <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: "#6B6560", letterSpacing: 0.3 }}>PASSWORD</label>
                    <div className="relative">
                        <input className={inputClass("")} placeholder="At least 6 characters" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[16px] p-0 leading-none" style={{ color: "#A8A49E" }}>
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {password.length > 0 && password.length < 6 && (
                        <p className="text-[12px] mt-[5px]" style={{ color: "#DC2626" }}>Password must be at least 6 characters</p>
                    )}
                </div>
            </div>

            {/* Submit */}
            <button disabled={!canSubmit} onClick={() => router.push("/success?new=true")}
                className="w-full py-[14px] bg-brand text-white rounded-[13px] font-dm text-[15px] font-semibold cursor-pointer transition-all hover:bg-brand-dim active:scale-[0.99] disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none"
                style={{ boxShadow: canSubmit ? "0 6px 20px rgba(193,125,47,0.32)" : "none" }}>
                Create account →
            </button>

            {/* Terms */}
            <p className="text-[11px] text-center mt-[14px] leading-[1.6]" style={{ color: "#A8A49E" }}>
                By signing up you agree to Link3y&apos;s{" "}
                <button className="bg-none border-none text-brand font-semibold text-[11px] cursor-pointer hover:text-brand-dim">Terms of Use</button>{" "}
                and{" "}
                <button className="bg-none border-none text-brand font-semibold text-[11px] cursor-pointer hover:text-brand-dim">Privacy Policy</button>
            </p>

            <p className="text-center text-[13px] mt-4" style={{ color: "#A8A49E" }}>
                Already have an account?{" "}
                <Link href="/login" className="text-brand font-semibold hover:text-brand-dim">Log in</Link>
            </p>
        </div>
    );
}
