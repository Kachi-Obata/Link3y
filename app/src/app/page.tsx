"use client";

import { useState } from "react";
import Link from "next/link";
import { isBabcockEmail, isValidEmailShape, emailFieldClass } from "@/lib/validation";

/* ─── Google Icon ─── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/* ─── Email Hint ─── */
const EmailHint = ({ email, touched }: { email: string; touched: boolean }) => {
  if (!touched || !email) return null;
  if (!isValidEmailShape(email))
    return <p className="text-[12px] mt-[5px]" style={{ color: "#DC2626" }}>Enter a valid email address</p>;
  if (!isBabcockEmail(email))
    return (
      <p className="text-[12px] mt-[5px]" style={{ color: "#DC2626" }}>
        Only Babcock student emails are accepted — e.g. <strong>yourname@student.babcock.edu.ng</strong>
      </p>
    );
  return <p className="text-[12px] mt-[5px]" style={{ color: "#16A34A" }}>✓ Valid Babcock email</p>;
};

/* ─── Input styles ─── */
const inputBase = "w-full py-[13px] px-[14px] rounded-[12px] border-[1.5px] border-border-default bg-bg-card font-dm text-[14px] text-text-primary outline-none transition-all duration-150";
const inputClass = (state: string) => {
  if (state === "valid") return `${inputBase} !border-status-green shadow-[0_0_0_3px_var(--color-status-green-bg)]`;
  if (state === "invalid") return `${inputBase} !border-status-red shadow-[0_0_0_3px_var(--color-status-red-bg)]`;
  return `${inputBase} focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-light)]`;
};

/* ─── SPLASH ─── */
export default function SplashPage() {
  return (
    <div className="fade-in min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#FAF8F4" }}>
      {/* Background pattern */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 60% 0%, #FDF3E3 0%, transparent 65%),
                     radial-gradient(ellipse at 10% 80%, rgba(193,125,47,0.08) 0%, transparent 60%)`,
      }} />

      {/* Decorative circles */}
      <div className="absolute rounded-full opacity-60" style={{
        top: -40, right: -40, width: 180, height: 180,
        border: "1.5px solid #EAE7E1",
      }} />
      <div className="absolute rounded-full opacity-20" style={{
        top: 20, right: 20, width: 80, height: 80,
        border: "1.5px solid #C17D2F",
      }} />

      {/* Content */}
      <div className="flex-1 px-[18px] pt-[60px] pb-8 flex flex-col relative">
        {/* Logo mark */}
        <div className="mb-12">
          <div className="w-[52px] h-[52px] bg-brand rounded-[16px] flex items-center justify-center"
            style={{ boxShadow: "0 8px 24px rgba(193,125,47,0.35)" }}>
            <span className="font-sora text-white text-[26px] font-[800]">L</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-auto">
          <h1 className="font-sora text-[34px] font-[800] leading-[1.15]" style={{ color: "#1C1A17", letterSpacing: -0.8, marginBottom: 16 }}>
            Campus shops,<br />
            <span className="text-brand">ordered fast.</span>
          </h1>
          <p className="text-[15px] leading-[1.65] max-w-[280px]" style={{ color: "#6B6560" }}>
            Browse food, stationery, and essentials from shops on campus. Place an order, get a ticket, pick it up — no queues.
          </p>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { icon: "⚡", text: "Fast response" },
            { icon: "🎟️", text: "Order tickets" },
            { icon: "📍", text: "On campus" },
            { icon: "🔒", text: "Babcock only" },
          ].map(chip => (
            <div key={chip.text} className="flex items-center gap-[6px] rounded-full px-3 py-[6px] text-[12px] font-medium" style={{ background: "#F5ECD8", color: "#7A4E18" }}>
              <span className="text-[13px]">{chip.icon}</span>
              {chip.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-[10px]">
          <Link href="/signup" className="w-full py-[14px] text-white border-none rounded-[13px] font-dm text-[15px] font-semibold text-center cursor-pointer transition-all duration-150 hover:opacity-90 active:opacity-100" style={{ background: "#C17D2F", boxShadow: "0 6px 20px rgba(193,125,47,0.32)" }}>
            Get started →
          </Link>
          <Link href="/signup" className="w-full py-[13px] rounded-[13px] font-dm text-[14px] font-medium text-center cursor-pointer transition-all duration-150 hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex items-center justify-center gap-[10px]" style={{ color: "#1C1A17", background: "#FFFFFF", border: "1.5px solid #EAE7E1" }}>
            <GoogleIcon />
            Continue with Google
          </Link>
          <p className="text-center text-[13px] mt-1" style={{ color: "#A8A49E" }}>
            Already have an account?{" "}
            <Link href="/login" className="text-brand font-semibold hover:text-brand-dim">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
