"use client";

import { useState } from "react";
import { INIT_ADMIN_ORDERS, INIT_VENDORS } from "@/lib/mock-data";
import type { AdminOrder, Vendor, OrderStatus } from "@/lib/types";

const STATUS_MAP: Record<string, { label: string; bg: string; color: string }> = {
    pending_vendor: { label: "Pending", bg: "#FEF3C7", color: "#D97706" },
    accepted: { label: "Accepted", bg: "#FDF3E3", color: "#C17D2F" },
    ready_for_pickup: { label: "Ready ✓", bg: "#DCFCE7", color: "#16A34A" },
    picked_up: { label: "Collected", bg: "#F4F4F5", color: "#71717A" },
    cancelled: { label: "Cancelled", bg: "#FEE2E2", color: "#DC2626" },
};

/* ─── Toggle ─── */
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className="relative flex-shrink-0 border-none cursor-pointer transition-colors duration-200"
            style={{ width: 38, height: 21, borderRadius: 11, background: on ? "#16A34A" : "#D6D1CA" }}>
            <div className="absolute rounded-full bg-white transition-all duration-200"
                style={{ width: 15, height: 15, top: 3, left: on ? 20 : 3, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
        </button>
    );
}

export default function AdminPage() {
    const [tab, setTab] = useState("orders");
    const [orders, setOrders] = useState(INIT_ADMIN_ORDERS);
    const [vendors, setVendors] = useState(INIT_VENDORS);

    const liveOrders = orders.filter(o => !["picked_up", "cancelled"].includes(o.status));
    const stuckOrders = orders.filter(o => o.status === "pending_vendor" && o.stuckMins !== null && o.stuckMins >= 5);
    const readyOrders = orders.filter(o => o.status === "ready_for_pickup");
    const doneOrders = orders.filter(o => o.status === "picked_up");
    const openVendors = vendors.filter(v => v.open).length;
    const totalRevenue = orders.filter(o => o.status === "picked_up").reduce((s, o) => s + o.total, 0);

    const forceComplete = (id: string) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "picked_up" as OrderStatus, stuckMins: null } : o));
    const forceCancel = (id: string) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "cancelled" as OrderStatus, stuckMins: null } : o));

    return (
        <div className="min-h-screen" style={{ background: "#FAF8F4" }}>
            {/* Admin header — DARK */}
            <div style={{ background: "#1C1A17", padding: "12px 16px 18px" }}>
                <div className="flex items-center justify-between mb-[14px]">
                    <div>
                        <div className="flex items-center gap-2 mb-[3px]">
                            <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center" style={{ background: "#C17D2F" }}>
                                <span className="text-white text-[13px] font-bold font-sora">L</span>
                            </div>
                            <p className="font-sora text-[15px] font-bold text-white">Ops Console</p>
                        </div>
                        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                            {openVendors}/{vendors.length} vendors online · Babcock Campus
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase mb-[2px]" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: 0.8 }}>TODAY&apos;S GMV</p>
                        <p className="font-sora text-[18px] font-[800]" style={{ color: "#C17D2F" }}>₦{totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Stats row */}
                <div className="flex gap-2">
                    {[
                        { label: "Live", value: liveOrders.length, color: "#fff" },
                        { label: "Stuck", value: stuckOrders.length, color: stuckOrders.length > 0 ? "#fca5a5" : "#fff" },
                        { label: "Ready", value: readyOrders.length, color: "#86efac" },
                        { label: "Done", value: doneOrders.length, color: "rgba(255,255,255,0.5)" },
                    ].map(stat => (
                        <div key={stat.label} className="flex-1 rounded-[10px] py-2 px-[10px]"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: stat.label === "Stuck" && stuckOrders.length > 0 ? "1px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.08)",
                            }}>
                            <p className="font-sora text-[18px] font-[800] leading-none mb-[2px]" style={{ color: stat.color }}>{stat.value}</p>
                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-bg-card border-b border-border-default">
                {[
                    { key: "orders", label: "Orders", badge: stuckOrders.length },
                    { key: "vendors", label: "Vendors", badge: 0 },
                ].map(tb => (
                    <button key={tb.key} onClick={() => setTab(tb.key)} className="flex-1 py-[9px] bg-none border-none font-dm text-[12px] cursor-pointer transition-all"
                        style={{ fontWeight: tab === tb.key ? 600 : 400, color: tab === tb.key ? "#C17D2F" : "#6B6560", borderBottom: `2px solid ${tab === tb.key ? "#C17D2F" : "transparent"}` }}>
                        <span className="inline-flex items-center gap-[5px]">
                            {tb.label}
                            {tb.badge > 0 && <span className="text-[9px] font-bold py-[1px] px-[5px] rounded-full leading-[1.4]" style={{ background: "#DC2626", color: "#fff" }}>{tb.badge}</span>}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            {tab === "orders" ? (
                <div className="overflow-y-auto py-[14px] px-[14px] pb-[90px]" style={{ maxHeight: "calc(100vh - 250px)" }}>
                    {/* Stuck alert */}
                    {stuckOrders.length > 0 && (
                        <div className="fade-in flex gap-[10px] items-start rounded-[12px] py-[11px] px-[14px] mb-[14px]" style={{ background: "#FEE2E2", border: "1px solid #FCA5A5" }}>
                            <span className="text-[18px] flex-shrink-0">⚠️</span>
                            <div>
                                <p className="text-[13px] font-bold mb-[1px]" style={{ color: "#DC2626" }}>
                                    {stuckOrders.length} order{stuckOrders.length > 1 ? "s" : ""} stuck — vendor not responding
                                </p>
                                <p className="text-[11px]" style={{ color: "#6B6560" }}>Intervene manually or resend vendor notification</p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-[9px]">
                        {orders.map(order => {
                            const isStuck = order.status === "pending_vendor" && order.stuckMins !== null && order.stuckMins >= 5;
                            const isDone = order.status === "picked_up" || order.status === "cancelled";
                            const cfg = STATUS_MAP[order.status] || STATUS_MAP.cancelled;
                            return (
                                <div key={order.id}
                                    className="bg-bg-card rounded-[14px]"
                                    style={{
                                        padding: "12px 14px",
                                        opacity: isDone ? 0.55 : 1,
                                        border: isStuck ? "1.5px solid #DC2626" : order.status === "ready_for_pickup" ? "1.5px solid #16A34A" : "1.5px solid #EAE7E1",
                                    }}>
                                    <div className="flex justify-between items-start mb-[7px]">
                                        <div>
                                            <div className="flex items-center gap-[7px] mb-[2px]">
                                                <p className="font-sora text-[14px] font-[800]" style={{ color: "#1C1A17" }}>LK-{order.id}</p>
                                                <span className="text-[10px] font-bold py-[2px] px-2 rounded-full flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                                                {isStuck && <span className="text-[9px] font-bold py-[2px] px-[6px] rounded-full" style={{ background: "#FEE2E2", color: "#DC2626" }}>Stuck {order.stuckMins}m</span>}
                                            </div>
                                            <p className="text-[11px]" style={{ color: "#6B6560" }}>{order.shop} · {order.student}</p>
                                        </div>
                                        <span className="font-sora text-[13px] font-bold" style={{ color: "#C17D2F" }}>₦{order.total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[12px] leading-[1.4]" style={{ color: "#A8A49E", marginBottom: isDone ? 0 : 10 }}>{order.items}</p>
                                    {!isDone && (
                                        <div className="flex gap-[6px]">
                                            <button onClick={() => forceComplete(order.id)} className="py-[5px] px-[10px] rounded-lg border-none font-dm text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1 active:scale-95 transition-transform" style={{ background: "#DCFCE7", color: "#16A34A" }}>✓ Force complete</button>
                                            <button onClick={() => forceCancel(order.id)} className="py-[5px] px-[10px] rounded-lg border-none font-dm text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1 active:scale-95 transition-transform" style={{ background: "#FEE2E2", color: "#DC2626" }}>✕ Cancel</button>
                                            <button className="py-[5px] px-[10px] rounded-lg border-none font-dm text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1 active:scale-95 transition-transform" style={{ background: "#F4F4F5", color: "#71717A" }}>📣 Resend</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="overflow-y-auto py-[14px] px-[14px] pb-[90px]" style={{ maxHeight: "calc(100vh - 250px)" }}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.8px] mb-[10px]" style={{ color: "#A8A49E" }}>All vendors</p>
                    <div className="bg-bg-card border border-border-default rounded-[14px] overflow-hidden">
                        {vendors.map((vendor, i) => (
                            <div key={vendor.id} className="flex items-center py-3 px-[14px] gap-[10px]" style={{ borderBottom: i < vendors.length - 1 ? "1px solid #EAE7E1" : "none" }}>
                                <div className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center text-[18px]" style={{ background: vendor.open ? "#FDF3E3" : "#F4F4F5" }}>
                                    {vendor.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold mb-[2px]" style={{ color: "#1C1A17" }}>{vendor.name}</p>
                                    <div className="flex gap-[10px]">
                                        <span className="text-[11px]" style={{ color: "#A8A49E" }}>📍 {vendor.zone}</span>
                                        <span className="text-[11px]" style={{ color: "#A8A49E" }}>
                                            Response: <span className="font-semibold" style={{ color: parseInt(vendor.responseRate) >= 90 ? "#16A34A" : "#D97706" }}>{vendor.responseRate}</span>
                                        </span>
                                        <span className="text-[11px]" style={{ color: "#A8A49E" }}>{vendor.ordersToday} orders</span>
                                    </div>
                                </div>
                                <Toggle on={vendor.open} onChange={() => setVendors(prev => prev.map(v => v.id === vendor.id ? { ...v, open: !v.open } : v))} />
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] mt-[10px] leading-[1.5] text-center" style={{ color: "#A8A49E" }}>
                        Toggling a vendor offline immediately stops new orders to their shop
                    </p>
                </div>
            )}
        </div>
    );
}
