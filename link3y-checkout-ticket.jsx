import { useState } from "react";

// ─── SAVANNA TOKENS ───────────────────────────────────────────────────────────
const t = {
  brand: "#C17D2F",
  brandDim: "#A66A22",
  brandLight: "#FDF3E3",
  brandLighter: "#FEF9F0",
  accentText: "#7A4E18",
  bg: "#FAF8F4",
  bgCard: "#FFFFFF",
  text: "#1C1A17",
  textMuted: "#6B6560",
  textFaint: "#A8A49E",
  border: "#EAE7E1",
  borderStrong: "#D6D1CA",
  pill: "#F5ECD8",
  pillText: "#7A4E18",
  statusGreen: "#16A34A", statusGreenBg: "#DCFCE7",
  statusAmber: "#D97706", statusAmberBg: "#FEF3C7",
  statusRed: "#DC2626",   statusRedBg: "#FEE2E2",
  statusGrey: "#71717A",  statusGreyBg: "#F4F4F5",
};

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { background: #E8E5DF; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .sora { font-family: 'Sora', sans-serif; }
    ::-webkit-scrollbar { display: none; }

    .primary-btn {
      width: 100%; background: ${t.brand}; color: #fff;
      border: none; border-radius: 14px; padding: 15px 20px;
      font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: background 0.13s, transform 0.1s;
      box-shadow: 0 6px 20px rgba(193,125,47,0.35);
    }
    .primary-btn:hover { background: ${t.brandDim}; }
    .primary-btn:active { transform: scale(0.99); }

    .ghost-btn {
      width: 100%; background: transparent; color: ${t.textMuted};
      border: 1.5px solid ${t.border}; border-radius: 14px; padding: 13px 20px;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      cursor: pointer; transition: border-color 0.13s, background 0.13s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .ghost-btn:hover { border-color: ${t.borderStrong}; background: ${t.bgCard}; }

    .back-btn {
      display: inline-flex; align-items: center; gap: 5px;
      background: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      color: ${t.textMuted}; font-weight: 500; padding: 4px 0;
    }

    .surface {
      background: ${t.bgCard}; border: 1px solid ${t.border};
      border-radius: 16px; overflow: hidden;
    }

    .row {
      padding: 13px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .row + .row { border-top: 1px solid ${t.border}; }

    .timeline-dot {
      width: 20px; height: 20px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; font-size: 10px; font-weight: 700;
    }
    .timeline-line {
      width: 2px; height: 16px; margin: 2px 0 2px 9px;
    }

    .pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.45; }
    }

    .ticket-enter {
      animation: ticketIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes ticketIn {
      from { opacity: 0; transform: scale(0.92) translateY(16px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .fade-in { animation: fadeIn 0.2s ease-out; }
    .stagger-1 { animation: fadeIn 0.2s ease-out 0.06s both; }
    .stagger-2 { animation: fadeIn 0.2s ease-out 0.12s both; }
    .stagger-3 { animation: fadeIn 0.2s ease-out 0.18s both; }
    .stagger-4 { animation: fadeIn 0.2s ease-out 0.24s both; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

// ─── MOCK CART ────────────────────────────────────────────────────────────────
const CART_ITEMS = [
  { id: 1, name: "Jollof Rice",          price: 800,  qty: 1, emoji: "🍚" },
  { id: 5, name: "Fried Egg",            price: 200,  qty: 2, emoji: "🍳" },
  { id: 9, name: "Zobo",                 price: 200,  qty: 1, emoji: "🧃" },
];
const SHOP_NAME = "Mama Titi's Kitchen";
const CART_TOTAL = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const TICKET_NUM = "5047";

// ─── CHECKOUT SCREEN ──────────────────────────────────────────────────────────
const CheckoutScreen = ({ onConfirm }) => (
  <div className="fade-in" style={{ overflowY: "auto", maxHeight: 680, padding: "16px 16px 32px" }}>

    {/* Back */}
    <button className="back-btn" style={{ marginBottom: 18 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      Back to menu
    </button>

    <h2 className="sora" style={{ fontSize: 20, fontWeight: 800, color: t.text, marginBottom: 2, letterSpacing: -0.3 }}>
      Review Order
    </h2>
    <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 22 }}>{SHOP_NAME}</p>

    {/* Order items */}
    <div className="stagger-1" style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 10 }}>
        Your items
      </p>
      <div className="surface">
        {CART_ITEMS.map((item, i) => (
          <div key={item.id} className="row">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{item.name}</p>
                <p style={{ fontSize: 12, color: t.textFaint }}>× {item.qty}</p>
              </div>
            </div>
            <span className="sora" style={{ fontSize: 14, fontWeight: 700, color: t.brand }}>
              ₦{(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}

        {/* Subtotal row */}
        <div className="row" style={{ background: t.brandLighter }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>Total</span>
          <span className="sora" style={{ fontSize: 16, fontWeight: 800, color: t.brand }}>
            ₦{CART_TOTAL.toLocaleString()}
          </span>
        </div>
      </div>
    </div>

    {/* Fulfilment method selector */}
    <div className="stagger-2" style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 10 }}>
        How do you want to receive it?
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {/* Pickup — active */}
        <div style={{
          flex: 1, background: t.bgCard,
          border: `2px solid ${t.brand}`,
          borderRadius: 14, padding: "13px 14px",
          boxShadow: `0 0 0 3px ${t.brandLight}`,
          cursor: "pointer"
        }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏃</div>
          <p style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>Pick up</p>
          <p style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.4 }}>
            Go to the shop when ready
          </p>
          <div style={{
            marginTop: 8, display: "inline-block",
            background: t.statusGreenBg, color: t.statusGreen,
            fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20
          }}>
            Available
          </div>
        </div>

        {/* Delivery — coming soon */}
        <div style={{
          flex: 1, background: t.statusGreyBg,
          border: `1.5px solid ${t.border}`,
          borderRadius: 14, padding: "13px 14px",
          opacity: 0.75, cursor: "not-allowed", position: "relative"
        }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🛵</div>
          <p style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, marginBottom: 2 }}>Delivery</p>
          <p style={{ fontSize: 11, color: t.textFaint, lineHeight: 1.4 }}>
            Runner brings it to you
          </p>
          <div style={{
            marginTop: 8, display: "inline-block",
            background: t.statusAmberBg, color: t.statusAmber,
            fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20
          }}>
            Coming soon
          </div>
        </div>
      </div>

      {/* Delivery explainer */}
      <div style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 12, padding: "11px 14px", marginTop: 10,
        display: "flex", gap: 10, alignItems: "flex-start"
      }}>
        <span style={{ fontSize: 15, flexShrink: 0 }}>ℹ️</span>
        <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.55 }}>
          Delivery by student runners is launching soon. Runners set their own fee — you'll see the rate and confirm before paying.
        </p>
      </div>
    </div>

    {/* How pickup works */}
    <div className="stagger-3" style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 10 }}>
        How pickup works
      </p>
      <div className="surface" style={{ padding: "14px 16px" }}>
        {[
          { icon: "🎟️", title: "You'll get a ticket number",       sub: "Generated instantly when you confirm" },
          { icon: "⚡",  title: "Vendor has 7 min to accept",       sub: "You'll be notified when they do" },
          { icon: "🏃",  title: "Head to the shop when it's ready", sub: "Show your ticket number to collect" },
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < 2 ? 14 : 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: t.brandLight, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 17
            }}>
              {step.icon}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 1 }}>{step.title}</p>
              <p style={{ fontSize: 12, color: t.textMuted }}>{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Payment note */}
    <div className="stagger-4" style={{
      background: t.statusAmberBg, border: `1px solid #FDE68A`,
      borderRadius: 12, padding: "11px 14px", marginBottom: 24,
      display: "flex", gap: 10, alignItems: "flex-start"
    }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>💳</span>
      <p style={{ fontSize: 12, color: t.text, lineHeight: 1.5 }}>
        <strong>Payment is required to confirm your order.</strong> This reserves the vendor's time and stock — no-shows affect other students.
      </p>
    </div>

    {/* CTA */}
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button className="primary-btn" onClick={onConfirm}>
        Confirm & Pay ₦{CART_TOTAL.toLocaleString()} →
      </button>
      <button className="ghost-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Edit order
      </button>
    </div>
  </div>
);

// ─── ORDER TICKET SCREEN ──────────────────────────────────────────────────────
const TicketScreen = () => {
  const [orderStatus, setOrderStatus] = useState("pending_vendor");

  const STEPS = [
    { key: "pending_vendor",   label: "Order placed",        sub: "Waiting for vendor to accept" },
    { key: "accepted",         label: "Vendor accepted",     sub: "Your order is being prepared" },
    { key: "ready_for_pickup", label: "Ready for pickup",    sub: "Head to the shop now" },
    { key: "picked_up",        label: "Collected",           sub: "Enjoy your meal!" },
  ];

  const currentIdx = STEPS.findIndex(s => s.key === orderStatus);

  const STATUS_MESSAGES = {
    pending_vendor:   { emoji: "⏳", text: "Waiting for vendor…",       color: t.statusAmber,  bg: t.statusAmberBg },
    accepted:         { emoji: "👨‍🍳", text: "Vendor is preparing your order", color: t.brand,   bg: t.brandLight },
    ready_for_pickup: { emoji: "✅", text: "Ready! Head to the shop",   color: t.statusGreen,  bg: t.statusGreenBg },
    picked_up:        { emoji: "🎉", text: "Order complete. Enjoy!",    color: t.statusGreen,  bg: t.statusGreenBg },
  };

  const msg = STATUS_MESSAGES[orderStatus];

  // Demo: cycle through states
  const advance = () => {
    const keys = STEPS.map(s => s.key);
    const idx = keys.indexOf(orderStatus);
    if (idx < keys.length - 1) setOrderStatus(keys[idx + 1]);
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: 680, padding: "16px 16px 32px" }}>

      {/* Live status banner */}
      <div className="fade-in" style={{
        background: msg.bg, borderRadius: 14,
        padding: "12px 16px", marginBottom: 18,
        display: "flex", alignItems: "center", gap: 10
      }}>
        <div className={orderStatus === "pending_vendor" || orderStatus === "accepted" ? "pulse" : ""}
          style={{ fontSize: 20 }}>
          {msg.emoji}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: msg.color }}>{msg.text}</p>
          {orderStatus === "pending_vendor" && (
            <p style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>Vendor has 7 min to respond</p>
          )}
        </div>
      </div>

      {/* The ticket */}
      <div className="ticket-enter" style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 20, overflow: "hidden", marginBottom: 16,
        boxShadow: "0 6px 28px rgba(0,0,0,0.08)"
      }}>
        {/* Ticket header */}
        <div style={{ background: t.brand, padding: "20px 20px 18px" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.65)",
            letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6
          }}>
            Order Ticket · {SHOP_NAME}
          </p>
          <div className="sora" style={{
            fontSize: 56, fontWeight: 800, color: "#fff",
            letterSpacing: -2, lineHeight: 1
          }}>
            #{TICKET_NUM}
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 8 }}>
            Show this number at the shop counter
          </p>
        </div>

        {/* Dashed tear line */}
        <div style={{
          margin: "0 16px",
          borderTop: `2px dashed ${t.border}`,
          position: "relative"
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: "#E8E5DF",
            position: "absolute", top: -8, left: -24, border: `1px solid ${t.border}`
          }} />
          <div style={{
            width: 16, height: 16, borderRadius: "50%", background: "#E8E5DF",
            position: "absolute", top: -8, right: -24, border: `1px solid ${t.border}`
          }} />
        </div>

        {/* Ticket body */}
        <div style={{ padding: "16px 20px" }}>
          {/* Meta row */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 10, color: t.textFaint, fontWeight: 600, letterSpacing: 0.6, marginBottom: 2 }}>ORDER ID</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text }}>LK-{TICKET_NUM}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: t.textFaint, fontWeight: 600, letterSpacing: 0.6, marginBottom: 2 }}>PLACED</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text }}>12:41 PM</p>
            </div>
          </div>

          {/* Items */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 10, color: t.textFaint, fontWeight: 600, letterSpacing: 0.6, marginBottom: 6 }}>ITEMS</p>
            {CART_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 13, color: t.textMuted }}>
                  {item.emoji} {item.name} × {item.qty}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: `1px solid ${t.border}`, paddingTop: 12,
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Total paid</span>
            <span className="sora" style={{ fontWeight: 800, fontSize: 16, color: t.brand }}>
              ₦{CART_TOTAL.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Status timeline */}
      <div style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 16, padding: "16px 16px", marginBottom: 16
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 14 }}>
          Order status
        </p>
        {STEPS.map((step, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          return (
            <div key={step.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className={`timeline-dot ${active && orderStatus !== "picked_up" ? "pulse" : ""}`} style={{
                  background: done ? t.brand : t.border,
                  border: active ? `2px solid ${t.brandDim}` : "none",
                }}>
                  {done && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: done ? 600 : 400, color: done ? t.text : t.textFaint }}>
                    {step.label}
                  </p>
                  {active && (
                    <p style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>{step.sub}</p>
                  )}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="timeline-line" style={{ background: i < currentIdx ? t.brand : t.border }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Help button */}
      <button className="ghost-btn" style={{ marginBottom: 10 }}>
        💬 Need help with this order?
      </button>

      {/* Demo control */}
      {orderStatus !== "picked_up" && (
        <button onClick={advance} style={{
          width: "100%", background: t.statusGreyBg, border: "none",
          borderRadius: 12, padding: "10px", cursor: "pointer",
          fontSize: 12, color: t.textFaint, fontFamily: "'DM Sans', sans-serif"
        }}>
          ↓ Demo: advance order status
        </button>
      )}
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("checkout");

  return (
    <>
      <G />
      <div style={{
        minHeight: "100vh", background: "#E8E5DF",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "32px 16px 48px", gap: 32
      }}>

        {/* Phone */}
        <div style={{
          width: "100%", maxWidth: 390, background: t.bg,
          borderRadius: 36, overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "6px solid #1A1A18", position: "relative", minHeight: 720
        }}>

          {/* Status bar */}
          <div style={{
            background: screen === "ticket" ? t.brand : t.bg,
            padding: "12px 20px 8px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            transition: "background 0.3s"
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: screen === "ticket" ? "rgba(255,255,255,0.8)" : t.text }}>9:41</span>
            <span style={{ fontSize: 11, color: screen === "ticket" ? "rgba(255,255,255,0.6)" : t.textFaint }}>●●●● WiFi 🔋</span>
          </div>

          {/* Screen toggle tabs */}
          <div style={{
            display: "flex", background: t.bg,
            borderBottom: `1px solid ${t.border}`,
            padding: "0 16px"
          }}>
            {[
              { key: "checkout", label: "Checkout" },
              { key: "ticket",   label: "Order Ticket" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setScreen(tab.key)} style={{
                flex: 1, padding: "10px 0", background: "none", border: "none",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: screen === tab.key ? 600 : 400,
                color: screen === tab.key ? t.brand : t.textMuted,
                borderBottom: screen === tab.key ? `2px solid ${t.brand}` : "2px solid transparent",
                transition: "all 0.13s"
              }}>
                {tab.label}
              </button>
            ))}
          </div>

          {screen === "checkout"
            ? <CheckoutScreen onConfirm={() => setScreen("ticket")} />
            : <TicketScreen />
          }
        </div>

        {/* Annotations */}
        <div style={{ maxWidth: 260, paddingTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p className="sora" style={{ fontWeight: 700, fontSize: 15, color: "#1C1A17", marginBottom: 4 }}>
              Checkout + Order Ticket
            </p>
            <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.6 }}>
              Two screens that form one continuous flow. Use the tabs above to switch, or tap "Confirm & Pay" to flow through naturally.
            </p>
          </div>

          {[
            {
              label: "No separate cart screen",
              note: "Checkout is the cart. Students see their items, the total, and how pickup works — all in one place before committing.",
            },
            {
              label: "Payment framing (vendor protection)",
              note: "The amber notice explains why payment is required upfront. It frames it as fairness to vendors and other students — not just a gate.",
            },
            {
              label: "How pickup works — 3 steps",
              note: "Students know exactly what happens after they pay. No uncertainty = fewer abandoned orders and fewer 'what do I do now?' support requests.",
            },
            {
              label: "The ticket number — big and central",
              note: "This is the most important element on the whole screen. Large Sora 800 on the brand amber header. It should feel like a boarding pass — certain and official.",
            },
            {
              label: "Tear-line detail",
              note: "The dashed line with cutout circles makes the ticket feel like a real physical ticket. Small detail, strong impression.",
            },
            {
              label: "Live status timeline",
              note: "Tap 'Demo: advance order status' to see each state. Active step pulses. Completed steps fill amber. Students always know where their order is.",
            },
            {
              label: "Need help button",
              note: "Always visible on the ticket screen. Tapping it auto-attaches the order ID to the support request — no manual searching needed.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12, padding: "11px 14px",
              border: "1px solid #EAE7E1"
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1A17", marginBottom: 3 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#6B6560", lineHeight: 1.5 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
