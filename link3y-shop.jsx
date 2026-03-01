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

    .product-row {
      background: ${t.bgCard};
      border: 1px solid ${t.border};
      border-radius: 14px;
      transition: border-color 0.13s ease, box-shadow 0.13s ease;
    }
    .product-row.active {
      border-color: ${t.brand};
      box-shadow: 0 0 0 3px ${t.brandLight};
    }
    .product-row.unavailable { opacity: 0.55; }

    .qty-btn {
      width: 30px; height: 30px; border-radius: 9px; border: none;
      cursor: pointer; font-size: 17px; font-weight: 500;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.1s ease, background 0.1s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .qty-btn:active { transform: scale(0.9); }

    .add-btn {
      width: 30px; height: 30px; border-radius: 9px; border: none;
      background: ${t.brand}; color: #fff;
      cursor: pointer; font-size: 19px; font-weight: 300;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.1s ease, background 0.1s ease;
      box-shadow: 0 3px 8px rgba(193,125,47,0.3);
    }
    .add-btn:hover { background: ${t.brandDim}; }
    .add-btn:active { transform: scale(0.9); }

    .back-btn {
      display: flex; align-items: center; gap: 5px;
      background: rgba(255,255,255,0.8); border: 1px solid ${t.border};
      border-radius: 10px; padding: 6px 12px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      color: ${t.text}; font-weight: 500;
      backdrop-filter: blur(8px);
      transition: background 0.12s;
    }
    .back-btn:hover { background: rgba(255,255,255,0.95); }

    .cart-bar {
      position: absolute; bottom: 16px; left: 12px; right: 12px;
      background: ${t.brand};
      border-radius: 16px; padding: 13px 16px;
      display: flex; align-items: center; justify-content: space-between;
      cursor: pointer; border: none; font-family: 'DM Sans', sans-serif;
      box-shadow: 0 8px 28px rgba(193,125,47,0.40);
      transition: background 0.13s, transform 0.13s;
    }
    .cart-bar:hover { background: ${t.brandDim}; }
    .cart-bar:active { transform: scale(0.99); }

    .fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .stagger-1 { animation: fadeIn 0.2s ease-out 0.05s both; }
    .stagger-2 { animation: fadeIn 0.2s ease-out 0.10s both; }
    .stagger-3 { animation: fadeIn 0.2s ease-out 0.14s both; }

    .section-label {
      font-size: 11px; font-weight: 600; color: ${t.textFaint};
      letter-spacing: 0.9px; text-transform: uppercase; margin-bottom: 10px;
    }

    .note-pill {
      display: inline-flex; align-items: center; gap: 5px;
      background: ${t.brandLight}; color: ${t.accentText};
      border-radius: 20px; padding: 5px 11px; font-size: 12px; font-weight: 500;
    }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SHOP = {
  name: "Mama Titi's Kitchen",
  emoji: "🍛",
  zone: "Zone A",
  open: true,
  rt: "~7 min",
  rating: 4.8,
  totalOrders: 312,
  description: "Home-cooked Nigerian meals made fresh daily. Rice, stew, proteins and daily specials.",
};

const SECTIONS = [
  {
    title: "Rice & Mains",
    items: [
      { id: 1,  name: "Jollof Rice",               price: 800,  status: "available", emoji: "🍚", note: "Spicy party jollof" },
      { id: 2,  name: "White Rice + Stew",          price: 700,  status: "available", emoji: "🍲", note: null },
      { id: 3,  name: "Fried Rice + Plantain",      price: 900,  status: "few",       emoji: "🍳", note: "Only 3 portions left" },
      { id: 4,  name: "Beans + Fried Yam",          price: 700,  status: "sold",      emoji: "🫘", note: null },
    ],
  },
  {
    title: "Proteins (Add-on)",
    items: [
      { id: 5,  name: "Fried Egg",                  price: 200,  status: "available", emoji: "🍳", note: null },
      { id: 6,  name: "Boiled Egg",                 price: 150,  status: "available", emoji: "🥚", note: null },
      { id: 7,  name: "Sausage (2 pieces)",         price: 300,  status: "few",       emoji: "🌭", note: null },
    ],
  },
  {
    title: "Drinks",
    items: [
      { id: 8,  name: "Bottled Water",              price: 150,  status: "available", emoji: "💧", note: null },
      { id: 9,  name: "Zobo",                       price: 200,  status: "available", emoji: "🧃", note: "Made this morning" },
      { id: 10, name: "Malt (Maltina)",             price: 300,  status: "sold",      emoji: "🥤", note: null },
    ],
  },
];

const STATUS_CONFIG = {
  available: { bg: t.statusGreenBg, color: t.statusGreen, label: "Available" },
  few:       { bg: t.statusAmberBg, color: t.statusAmber, label: "Few left"  },
  sold:      { bg: t.statusRedBg,   color: t.statusRed,   label: "Sold out"  },
  paused:    { bg: t.statusGreyBg,  color: t.statusGrey,  label: "Paused"    },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.paused;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px",
      borderRadius: 20, background: cfg.bg, color: cfg.color,
      letterSpacing: 0.2, flexShrink: 0,
    }}>
      {cfg.label}
    </span>
  );
};

const QtyControl = ({ qty, onAdd, onRemove }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <button className="qty-btn"
      onClick={onRemove}
      style={{ background: t.border, color: t.text }}>
      −
    </button>
    <span className="sora" style={{ fontWeight: 700, fontSize: 15, minWidth: 18, textAlign: "center", color: t.text }}>
      {qty}
    </span>
    <button className="qty-btn"
      onClick={onAdd}
      style={{ background: t.brand, color: "#fff" }}>
      +
    </button>
  </div>
);

// ─── PRODUCT ROW ──────────────────────────────────────────────────────────────
const ProductRow = ({ item, qty, onAdd, onRemove }) => {
  const canOrder = item.status === "available" || item.status === "few";
  const inCart = qty > 0;

  return (
    <div className={`product-row ${inCart ? "active" : ""} ${!canOrder ? "unavailable" : ""}`}
      style={{ padding: "13px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* Emoji */}
        <div style={{
          width: 42, height: 42, borderRadius: 11, flexShrink: 0,
          background: canOrder ? t.brandLight : t.statusGreyBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>
          {item.emoji}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: t.text, lineHeight: 1.3 }}>
              {item.name}
            </p>
            <StatusBadge status={item.status} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="sora" style={{ fontSize: 14, fontWeight: 700, color: t.brand }}>
              ₦{item.price.toLocaleString()}
            </span>
            {item.note && (
              <span style={{ fontSize: 11, color: t.textFaint, fontStyle: "italic" }}>
                · {item.note}
              </span>
            )}
          </div>
        </div>

        {/* Cart control */}
        <div style={{ flexShrink: 0 }}>
          {!canOrder ? (
            <span style={{ fontSize: 12, color: t.textFaint }}>—</span>
          ) : inCart ? (
            <QtyControl qty={qty} onAdd={onAdd} onRemove={onRemove} />
          ) : (
            <button className="add-btn" onClick={onAdd}>+</button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [cart, setCart] = useState({});

  const addItem = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id) => setCart(prev => {
    const next = { ...prev };
    if (next[id] > 1) next[id]--;
    else delete next[id];
    return next;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = SECTIONS.flatMap(s => s.items)
    .reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  return (
    <>
      <G />
      <div style={{
        minHeight: "100vh", background: "#E8E5DF",
        display: "flex", alignItems: "flex-start",
        justifyContent: "center", padding: "32px 16px 48px",
        gap: 32,
      }}>

        {/* ── PHONE ── */}
        <div style={{
          width: "100%", maxWidth: 390,
          background: t.bg, borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "6px solid #1A1A18",
          position: "relative",
          minHeight: 720,
        }}>

          {/* Status bar */}
          <div style={{
            background: t.brand, padding: "12px 20px 6px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>●●●● WiFi 🔋</span>
            </div>
          </div>

          {/* Shop header */}
          <div className="fade-in" style={{
            background: t.brand,
            padding: "6px 16px 20px",
            position: "relative",
          }}>
            {/* Back */}
            <div style={{ marginBottom: 14 }}>
              <button className="back-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Back
              </button>
            </div>

            {/* Shop identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, border: "1.5px solid rgba(255,255,255,0.25)"
              }}>
                {SHOP.emoji}
              </div>
              <div>
                <h2 className="sora" style={{
                  fontSize: 18, fontWeight: 700, color: "#fff",
                  marginBottom: 4, letterSpacing: -0.3
                }}>
                  {SHOP.name}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 8px",
                    borderRadius: 20, background: "rgba(255,255,255,0.25)",
                    color: "#fff"
                  }}>
                    Open
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                    ⚡ avg {SHOP.rt}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                    ⭐ {SHOP.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: 12, color: "rgba(255,255,255,0.7)",
              marginTop: 12, lineHeight: 1.5
            }}>
              {SHOP.description}
            </p>

            {/* Info pills */}
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <span className="note-pill" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                📍 {SHOP.zone}
              </span>
              <span className="note-pill" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                🎟️ Ticket on order
              </span>
            </div>
          </div>

          {/* Scroll area */}
          <div style={{ overflowY: "auto", maxHeight: 500, padding: "18px 14px 90px" }}>
            {SECTIONS.map((section, si) => (
              <div key={si} className={`stagger-${si + 1}`} style={{ marginBottom: 22 }}>
                <p className="section-label">{section.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.items.map(item => (
                    <ProductRow
                      key={item.id}
                      item={item}
                      qty={cart[item.id] || 0}
                      onAdd={() => addItem(item.id)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart bar */}
          {cartCount > 0 && (
            <button className="cart-bar">
              <div style={{
                background: "rgba(255,255,255,0.25)", borderRadius: 9,
                padding: "3px 9px", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span className="sora" style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>
                  {cartCount}
                </span>
              </div>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>
                Review Order
              </span>
              <span className="sora" style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
                ₦{cartTotal.toLocaleString()}
              </span>
            </button>
          )}
        </div>

        {/* ── ANNOTATIONS ── */}
        <div style={{
          maxWidth: 260, paddingTop: 8,
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          <div>
            <p className="sora" style={{ fontWeight: 700, fontSize: 15, color: "#1C1A17", marginBottom: 4 }}>
              Shop Page
            </p>
            <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.6 }}>
              Where students browse the menu and build their order. The entire cart interaction happens here — no separate cart screen.
            </p>
          </div>

          {[
            {
              label: "Header on brand color",
              note: "The shop header uses the brand amber as background. Creates a strong visual break from the home screen and immediately orients the student inside a specific shop.",
            },
            {
              label: "Info pills (Pay on pickup, Ticket issued)",
              note: "Sets expectations before a student adds anything. No surprises at checkout — they already know how this works.",
            },
            {
              label: "Sectioned menu",
              note: "Products grouped by type (Mains, Proteins, Drinks). Avoids a long undifferentiated list. Scannability is the goal.",
            },
            {
              label: "Product row — status badge",
              note: "Every item shows its availability state. Sold out items are visible but dimmed — students see what exists, not just what's orderable. Transparency builds trust.",
            },
            {
              label: "Add → Qty control in-place",
              note: "Tapping + transforms the button into a qty controller inline. No modal, no navigation. The row itself gets an amber border + glow when something is in the cart.",
            },
            {
              label: "Cart bar (sticky)",
              note: "Only appears once something is in the cart. Shows item count + running total. 'Review Order' takes them to checkout — not a separate cart screen.",
            },
            {
              label: "No product detail screen",
              note: "Deliberate. Item name, price, status, and a short note cover everything a student needs. A separate detail page would add a tap with no benefit.",
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12, padding: "11px 14px",
              border: "1px solid #EAE7E1"
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1A17", marginBottom: 3 }}>
                {item.label}
              </p>
              <p style={{ fontSize: 12, color: "#6B6560", lineHeight: 1.5 }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
