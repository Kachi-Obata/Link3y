import { useState, useEffect } from "react";

// ─── SAVANNA TOKENS ───────────────────────────────────────────────────────────
const t = {
  brand: "#C17D2F", brandDim: "#A66A22", brandLight: "#FDF3E3",
  brandLighter: "#FEF9F0", accentText: "#7A4E18",
  bg: "#FAF8F4", bgCard: "#FFFFFF",
  text: "#1C1A17", textMuted: "#6B6560", textFaint: "#A8A49E",
  border: "#EAE7E1", borderStrong: "#D6D1CA",
  pill: "#F5ECD8", pillText: "#7A4E18",
  statusGreen: "#16A34A", statusGreenBg: "#DCFCE7",
  statusAmber: "#D97706", statusAmberBg: "#FEF3C7",
  statusRed: "#DC2626", statusRedBg: "#FEE2E2",
  statusGrey: "#71717A", statusGreyBg: "#F4F4F5",
};

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { background: #E8E5DF; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .sora { font-family: 'Sora', sans-serif; }
    ::-webkit-scrollbar { display: none; }

    .order-card {
      background: ${t.bgCard};
      border-radius: 14px;
      border: 1.5px solid ${t.border};
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .order-card.pending { border-color: ${t.statusAmber}; box-shadow: 0 0 0 3px ${t.statusAmberBg}; }
    .order-card.urgent  { border-color: ${t.statusRed};   box-shadow: 0 0 0 3px ${t.statusRedBg}; }
    .order-card.done    { opacity: 0.6; }

    .action-btn {
      flex: 1; padding: 9px 0; border: none; border-radius: 10px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: opacity 0.12s, transform 0.1s;
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .action-btn:active { transform: scale(0.97); }

    .toggle-track {
      width: 44px; height: 24px; border-radius: 12px; border: none;
      cursor: pointer; position: relative; transition: background 0.2s;
      flex-shrink: 0;
    }
    .toggle-thumb {
      width: 18px; height: 18px; background: #fff; border-radius: 50%;
      position: absolute; top: 3px; transition: left 0.2s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }

    .tab-btn {
      flex: 1; padding: 9px 0; background: none; border: none;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      cursor: pointer; transition: all 0.12s; border-bottom: 2px solid transparent;
    }

    .inventory-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 14px; border-bottom: 1px solid ${t.border};
    }
    .inventory-row:last-child { border-bottom: none; }

    .urgent-pulse { animation: urgentPulse 1s ease-in-out infinite; }
    @keyframes urgentPulse {
      0%, 100% { color: ${t.statusRed}; }
      50% { color: #ff8080; }
    }

    .fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .stagger-1 { animation: fadeIn 0.2s 0.05s ease-out both; }
    .stagger-2 { animation: fadeIn 0.2s 0.10s ease-out both; }
    .stagger-3 { animation: fadeIn 0.2s 0.15s ease-out both; }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INIT_ORDERS = [
  {
    id: "5047", status: "pending", timeLeft: 380,
    items: [{ name: "Jollof Rice", qty: 1 }, { name: "Fried Egg", qty: 2 }],
    total: 1200, note: "Extra stew please", studentName: "Adaeze O.",
  },
  {
    id: "5046", status: "accepted", timeLeft: null,
    items: [{ name: "White Rice + Stew", qty: 2 }, { name: "Zobo", qty: 2 }],
    total: 1800, note: "", studentName: "Emeka C.",
  },
  {
    id: "5044", status: "ready", timeLeft: null,
    items: [{ name: "Fried Rice + Plantain", qty: 1 }],
    total: 900, note: "", studentName: "Funmi B.",
  },
  {
    id: "5040", status: "fulfilled", timeLeft: null,
    items: [{ name: "Beans + Fried Yam", qty: 1 }, { name: "Boiled Egg", qty: 1 }],
    total: 850, note: "", studentName: "Tunde A.",
  },
];

const INIT_INVENTORY = [
  { id: 1,  name: "Jollof Rice",         price: 800,  available: true  },
  { id: 2,  name: "White Rice + Stew",   price: 700,  available: true  },
  { id: 3,  name: "Fried Rice + Plantain", price: 900, available: true },
  { id: 4,  name: "Beans + Fried Yam",   price: 700,  available: false },
  { id: 5,  name: "Fried Egg",           price: 200,  available: true  },
  { id: 6,  name: "Boiled Egg",          price: 150,  available: true  },
  { id: 7,  name: "Sausage (2 pieces)",  price: 300,  available: true  },
  { id: 8,  name: "Bottled Water",       price: 150,  available: true  },
  { id: 9,  name: "Zobo",               price: 200,  available: true  },
];

const STATUS_LABELS = {
  pending: { label: "Pending", bg: t.statusAmberBg, color: t.statusAmber },
  accepted: { label: "Accepted", bg: t.brandLight, color: t.brand },
  ready: { label: "Ready ✓", bg: t.statusGreenBg, color: t.statusGreen },
  fulfilled: { label: "Fulfilled", bg: t.statusGreyBg, color: t.statusGrey },
};

// ─── COUNTDOWN HOOK ───────────────────────────────────────────────────────────
const useCountdown = (orders) => {
  const [timers, setTimers] = useState(() =>
    Object.fromEntries(orders.filter(o => o.timeLeft).map(o => [o.id, o.timeLeft]))
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => { if (next[id] > 0) next[id]--; });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return timers;
};

const formatTime = (secs) => {
  if (secs <= 0) return "00:00";
  return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
};

// ─── TOGGLE ───────────────────────────────────────────────────────────────────
const Toggle = ({ on, onChange }) => (
  <button className="toggle-track" onClick={onChange}
    style={{ background: on ? t.brand : t.borderStrong }}>
    <div className="toggle-thumb" style={{ left: on ? 23 : 3 }} />
  </button>
);

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_LABELS[status] || STATUS_LABELS.pending;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: cfg.bg, color: cfg.color, letterSpacing: 0.2, flexShrink: 0,
    }}>{cfg.label}</span>
  );
};

// ─── ORDER CARD ───────────────────────────────────────────────────────────────
const OrderCard = ({ order, timer, onAccept, onDecline, onReady, onFulfill }) => {
  const isUrgent = order.status === "pending" && timer !== undefined && timer < 120;
  const cardClass = order.status === "pending"
    ? (isUrgent ? "order-card urgent" : "order-card pending")
    : order.status === "fulfilled" ? "order-card done" : "order-card";

  return (
    <div className={`${cardClass} fade-in`} style={{ padding: "14px 14px 12px", marginBottom: 10 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <p className="sora" style={{ fontSize: 16, fontWeight: 800, color: t.text }}>#{order.id}</p>
            <StatusBadge status={order.status} />
          </div>
          <p style={{ fontSize: 12, color: t.textMuted }}>{order.studentName}</p>
        </div>
        {/* Countdown */}
        {order.status === "pending" && timer !== undefined && (
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 9, color: t.textFaint, fontWeight: 600, letterSpacing: 0.8, marginBottom: 2 }}>RESPOND IN</p>
            <p className={`sora ${isUrgent ? "urgent-pulse" : ""}`} style={{
              fontSize: 22, fontWeight: 800, lineHeight: 1,
              color: isUrgent ? t.statusRed : t.statusAmber,
            }}>
              {formatTime(timer)}
            </p>
          </div>
        )}
      </div>

      {/* Items */}
      <div style={{
        background: t.bg, borderRadius: 10, padding: "9px 12px", marginBottom: 10
      }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: t.text }}>{item.name}</span>
            <span style={{ fontSize: 13, color: t.textMuted }}>× {item.qty}</span>
          </div>
        ))}
        {order.note && (
          <p style={{ fontSize: 12, color: t.statusAmber, marginTop: 6, fontStyle: "italic" }}>
            💬 "{order.note}"
          </p>
        )}
      </div>

      {/* Total + actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="sora" style={{ fontSize: 14, fontWeight: 700, color: t.brand, marginRight: 4 }}>
          ₦{order.total.toLocaleString()}
        </span>

        {order.status === "pending" && (
          <>
            <button className="action-btn" onClick={onAccept}
              style={{ background: t.statusGreenBg, color: t.statusGreen }}>
              ✓ Accept
            </button>
            <button className="action-btn" onClick={onDecline}
              style={{ background: t.statusRedBg, color: t.statusRed }}>
              ✕ Decline
            </button>
          </>
        )}
        {order.status === "accepted" && (
          <button className="action-btn" onClick={onReady}
            style={{ background: t.brandLight, color: t.brand }}>
            Mark as Ready →
          </button>
        )}
        {order.status === "ready" && (
          <button className="action-btn" onClick={onFulfill}
            style={{ background: t.statusGreenBg, color: t.statusGreen }}>
            ✓ Confirm Pickup
          </button>
        )}
        {order.status === "fulfilled" && (
          <span style={{ fontSize: 12, color: t.statusGrey, fontWeight: 500 }}>Complete</span>
        )}
      </div>
    </div>
  );
};

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
const OrdersTab = ({ orders, setOrders, timers }) => {
  const update = (id, status) =>
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

  const active = orders.filter(o => o.status !== "fulfilled");
  const done   = orders.filter(o => o.status === "fulfilled");

  return (
    <div style={{ padding: "14px 14px 90px", overflowY: "auto", maxHeight: 560 }}>
      {active.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: t.textFaint }}>
          <p style={{ fontSize: 28, marginBottom: 8 }}>🎉</p>
          <p style={{ fontSize: 14 }}>All caught up — no active orders</p>
        </div>
      )}
      {active.map(order => (
        <OrderCard key={order.id} order={order} timer={timers[order.id]}
          onAccept={() => update(order.id, "accepted")}
          onDecline={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
          onReady={() => update(order.id, "ready")}
          onFulfill={() => update(order.id, "fulfilled")}
        />
      ))}
      {done.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, letterSpacing: 0.8, textTransform: "uppercase", margin: "14px 0 10px" }}>
            Completed today
          </p>
          {done.map(order => (
            <OrderCard key={order.id} order={order} timer={undefined}
              onAccept={() => {}} onDecline={() => {}} onReady={() => {}} onFulfill={() => {}} />
          ))}
        </>
      )}
    </div>
  );
};

// ─── INVENTORY TAB ────────────────────────────────────────────────────────────
const InventoryTab = ({ inventory, setInventory, shopOpen, setShopOpen }) => {
  const toggleItem = (id) =>
    setInventory(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));

  const pauseAll = () => setInventory(prev => prev.map(i => ({ ...i, available: false })));
  const resumeAll = () => setInventory(prev => prev.map(i => ({ ...i, available: true })));

  return (
    <div style={{ padding: "14px 14px 90px", overflowY: "auto", maxHeight: 560 }}>
      {/* Shop open/close */}
      <div style={{
        background: shopOpen ? t.statusGreenBg : t.statusGreyBg,
        border: `1px solid ${shopOpen ? "#BBF7D0" : t.border}`,
        borderRadius: 14, padding: "14px 16px", marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 2 }}>Shop status</p>
          <p style={{ fontSize: 12, color: shopOpen ? t.statusGreen : t.statusGrey, fontWeight: 500 }}>
            {shopOpen ? "Open — students can order" : "Closed — no new orders"}
          </p>
        </div>
        <Toggle on={shopOpen} onChange={() => setShopOpen(!shopOpen)} />
      </div>

      {/* Bulk actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={pauseAll} style={{
          flex: 1, padding: "8px 0", borderRadius: 10, border: `1px solid ${t.border}`,
          background: t.bgCard, cursor: "pointer", fontSize: 12, fontWeight: 500,
          color: t.statusRed, fontFamily: "'DM Sans', sans-serif"
        }}>
          Pause all items
        </button>
        <button onClick={resumeAll} style={{
          flex: 1, padding: "8px 0", borderRadius: 10, border: `1px solid ${t.border}`,
          background: t.bgCard, cursor: "pointer", fontSize: 12, fontWeight: 500,
          color: t.statusGreen, fontFamily: "'DM Sans', sans-serif"
        }}>
          Resume all
        </button>
      </div>

      {/* Item list */}
      <div style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 14, overflow: "hidden"
      }}>
        {inventory.map(item => (
          <div key={item.id} className="inventory-row">
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: item.available ? t.text : t.textFaint }}>
                {item.name}
              </p>
              <p style={{ fontSize: 12, color: t.textFaint }}>₦{item.price.toLocaleString()}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                background: item.available ? t.statusGreenBg : t.statusGreyBg,
                color: item.available ? t.statusGreen : t.statusGrey
              }}>
                {item.available ? "Available" : "Paused"}
              </span>
              <Toggle on={item.available} onChange={() => toggleItem(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function VendorDashboard() {
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [inventory, setInventory] = useState(INIT_INVENTORY);
  const [shopOpen, setShopOpen] = useState(true);
  const timers = useCountdown(orders);

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const todayTotal = orders
    .filter(o => o.status === "fulfilled")
    .reduce((s, o) => s + o.total, 0);

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
          border: "6px solid #1A1A18", minHeight: 720, position: "relative"
        }}>
          {/* Status bar */}
          <div style={{ background: t.brand, padding: "12px 20px 6px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>9:41</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>●●●● WiFi 🔋</span>
          </div>

          {/* Vendor header */}
          <div style={{ background: t.brand, padding: "8px 16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                }}>🍛</div>
                <div>
                  <p className="sora" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Mama Titi's Kitchen</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: shopOpen ? "#4ade80" : "#94a3b8"
                    }} />
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
                      {shopOpen ? "Open" : "Closed"}
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>TODAY'S REVENUE</p>
                <p className="sora" style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
                  ₦{todayTotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Stat pills */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Pending", value: pendingCount, urgent: pendingCount > 0 },
                { label: "Active", value: orders.filter(o => ["accepted","ready"].includes(o.status)).length, urgent: false },
                { label: "Done today", value: orders.filter(o => o.status === "fulfilled").length, urgent: false },
              ].map(stat => (
                <div key={stat.label} style={{
                  flex: 1, background: stat.urgent ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.15)",
                  borderRadius: 10, padding: "7px 10px", border: stat.urgent ? "1px solid rgba(220,38,38,0.4)" : "none"
                }}>
                  <p className="sora" style={{ fontSize: 17, fontWeight: 800, color: stat.urgent ? "#fca5a5" : "#fff" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: t.bgCard, borderBottom: `1px solid ${t.border}` }}>
            {[
              { key: "orders", label: "Orders", badge: pendingCount },
              { key: "inventory", label: "Inventory" },
            ].map(tb => (
              <button key={tb.key} className="tab-btn" onClick={() => setTab(tb.key)} style={{
                fontWeight: tab === tb.key ? 600 : 400,
                color: tab === tb.key ? t.brand : t.textMuted,
                borderBottom: `2px solid ${tab === tb.key ? t.brand : "transparent"}`,
              }}>
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {tb.label}
                  {tb.badge > 0 && (
                    <span style={{
                      background: t.statusRed, color: "#fff",
                      fontSize: 9, fontWeight: 700, padding: "1px 5px",
                      borderRadius: 10, lineHeight: 1.4
                    }}>{tb.badge}</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {tab === "orders"
            ? <OrdersTab orders={orders} setOrders={setOrders} timers={timers} />
            : <InventoryTab inventory={inventory} setInventory={setInventory} shopOpen={shopOpen} setShopOpen={setShopOpen} />
          }
        </div>

        {/* Annotations */}
        <div style={{ maxWidth: 260, paddingTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p className="sora" style={{ fontWeight: 700, fontSize: 15, color: "#1C1A17", marginBottom: 4 }}>
              Vendor Dashboard
            </p>
            <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.6 }}>
              One screen, two tabs. Everything a vendor needs to run their shop — no unnecessary navigation.
            </p>
          </div>
          {[
            { label: "Header at a glance", note: "Revenue, pending count, and active orders visible the moment the vendor opens the app. No digging required." },
            { label: "Countdown timer", note: "Ticks live on each pending order. Goes amber → red as it approaches zero. Urgency is communicated without a single word." },
            { label: "Accept / Decline in one tap", note: "No confirmation modal. The action is immediate and the card updates in place. Speed matters when a student is waiting." },
            { label: "Fulfilled orders stay visible", note: "Dimmed but present. Vendors can see their full day's work, and it makes it easy to resolve disputes ('did I fulfil order 5040?' — yes, scroll down)." },
            { label: "Inventory tab — toggles only", note: "No typing, no forms. Each item has a single toggle. Pause all / Resume all handles the rush-hour scenario in one tap." },
            { label: "Shop open/closed toggle", note: "Lives in the Inventory tab so it's always near the item list. Closing the shop immediately stops new orders — important for end of day." },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "11px 14px", border: "1px solid #EAE7E1" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1A17", marginBottom: 3 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#6B6560", lineHeight: 1.5 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
