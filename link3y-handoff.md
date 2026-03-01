# LINK3Y — Frontend Design Handoff

**For:** Antigravity (AI coding tool / development team)  
**Prepared by:** Kachi (Obata Onyelukachukwu)  
**Date:** March 2026  
**Version:** MVP v1

---

## What This Document Is

This is the complete design handoff for Link3y's frontend MVP. It contains everything needed to build every screen without guessing: the design system, component rules, screen-by-screen interaction specs, feature flag architecture, order state machines, and all reasoning behind decisions.

Six companion JSX prototype files accompany this document. They are the visual reference — run them alongside this document. This document explains the rules; the files show the result.

> **Critical framing:** Link3y is not a student side project. It is being built as a venture-scale campus marketplace, starting with Babcock University as a controlled proof-of-traction environment. Every design decision should reflect operational seriousness, not a casual app. When in doubt, err toward clarity and trust over decoration.

---

## Prototype Files

| File | Screen(s) | Notes |
|------|-----------|-------|
| `link3y-home.jsx` | Student Home | Browse, categories, shop cards |
| `link3y-shop.jsx` | Shop Page | Menu, cart interaction, add/remove items |
| `link3y-checkout-ticket.jsx` | Checkout + Order Ticket | Fulfilment choice, payment, ticket, live status — use tabs to switch |
| `link3y-vendor.jsx` | Vendor Dashboard | Orders tab (live countdown) + Inventory tab |
| `link3y-admin.jsx` | Admin Console | Orders tab + Vendors tab, dark header |
| `link3y-auth.jsx` | Auth Flow | Splash, Sign Up, Log In, Success — use annotation panel to switch screens |

Run any JSX file in CodeSandbox or StackBlitz (paste file contents, it runs immediately). Each file is self-contained with all tokens, data, and styles inline.

---

---

# SECTION 1 — Design System

---

## 1.1 Brand Identity

The aesthetic direction is called **Savanna**. Warm amber brand color, off-white background, clean typography. The intent is to feel distinctly Nigerian without being loud — serious and operational, not a generic food delivery app.

**Design inspiration hierarchy:**
- Linear / Stripe — layout discipline, component restraint, how status and states are displayed
- DoorDash / Glovo — marketplace structure (vendor cards, order flows, status tracking)

The result should look like Linear's design team built a campus marketplace. It should not look like a student project or a generic delivery clone.

---

## 1.2 Color Tokens

Use these exact hex values everywhere. Do not introduce new colors. All tokens are in use across multiple screens and must remain consistent.

| Token | Hex | Usage |
|-------|-----|-------|
| `brand` | `#C17D2F` | Primary actions, active states, headings, links, icon accents, header backgrounds |
| `brandDim` | `#A66A22` | Hover state for all brand-colored elements |
| `brandLight` | `#FDF3E3` | Tinted backgrounds, active card highlights, icon container backgrounds |
| `brandLighter` | `#FEF9F0` | Very light tint for table rows, totals rows |
| `accentText` | `#7A4E18` | Text that sits on brandLight backgrounds |
| `bg` | `#FAF8F4` | App background — warm off-white, not pure white |
| `bgCard` | `#FFFFFF` | Card and surface backgrounds |
| `text` | `#1C1A17` | Primary body text |
| `textMuted` | `#6B6560` | Secondary text, descriptions, captions |
| `textFaint` | `#A8A49E` | Tertiary text, section labels, placeholders |
| `border` | `#EAE7E1` | Default card borders, input borders, dividers |
| `borderStrong` | `#D6D1CA` | Hover borders, stronger dividers |
| `pill` | `#F5ECD8` | Tag / chip background |
| `pillText` | `#7A4E18` | Tag / chip text |

---

## 1.3 Status Colors

These four status colors are fixed and must be used **consistently everywhere**: order state badges, product availability badges, countdown urgency, vendor status indicators. Never swap or substitute them.

| State | Text Color | Background | Usage |
|-------|-----------|------------|-------|
| Available / Open / Complete | `#16A34A` | `#DCFCE7` | Green — positive, active, done |
| Pending / Few left / Warning | `#D97706` | `#FEF3C7` | Amber — attention needed, partial |
| Sold out / Stuck / Error / Urgent | `#DC2626` | `#FEE2E2` | Red — unavailable, urgent, failed |
| Closed / Paused / Inactive | `#71717A` | `#F4F4F5` | Grey — neutral off state |

---

## 1.4 Typography

Two font families only. Both load from Google Fonts. No other fonts.

### Sora — Display font
- **Usage:** Logo wordmark, screen headings, ticket numbers, stat figures in dashboards, vendor names in headers
- **Weights used:** 600 (subheadings), 700 (headings), 800 (hero text, ticket numbers)
- **Import URL:** `https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800`

### DM Sans — Body font
- **Usage:** All body text, labels, buttons, form fields, navigation, descriptions, meta text
- **Weights used:** 400 (body), 500 (medium emphasis), 600 (strong labels, button text)
- **Import URL:** `https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600`

### Font size reference

| Size | Usage |
|------|-------|
| 10–11px | Small labels, badge text, section headers (ALL CAPS) |
| 12px | Secondary body, captions, item notes, form hints |
| 13–14px | Primary body text, list items, button labels (md) |
| 15–16px | Subheadings, button labels (lg), nav labels |
| 18–22px | Section headings, header stats |
| 34px | Splash headline |
| 52–56px | Order ticket number |

---

## 1.5 Spacing, Shape, and Elevation

### Border radius
| Context | Value |
|---------|-------|
| Small elements (badges, icon containers, micro buttons) | `8px` |
| Medium elements (input fields, callout boxes, small cards) | `12–14px` |
| Large cards (shop cards, order cards, ticket) | `16–20px` |
| Phone frame (prototypes only, not production) | `36px` |

### Borders
| Context | Value |
|---------|-------|
| Default card/surface border | `1px solid #EAE7E1` |
| Active input / selected card border | `1.5–2px solid #C17D2F` |
| Vendor order card — pending | `1.5px solid #D97706` |
| Vendor order card — urgent | `1.5px solid #DC2626` |
| Admin order card — stuck | `1.5px solid #DC2626` |
| Admin order card — ready | `1.5px solid #16A34A` |

### Shadows and rings
| Context | Value |
|---------|-------|
| Default card shadow | `0 1px 3px rgba(0,0,0,0.04)` |
| Card hover shadow | `0 8px 24px rgba(0,0,0,0.08)` |
| Shop card hover shadow (amber tint) | `0 10px 28px rgba(193,125,47,0.12)` |
| Primary button shadow | `0 6px 20px rgba(193,125,47,0.32)` |
| Cart bar shadow | `0 8px 28px rgba(193,125,47,0.40)` |
| Active input / selected card ring | `box-shadow: 0 0 0 3px #FDF3E3` alongside border |

### Layout
| Context | Value |
|---------|-------|
| Page horizontal padding (mobile) | `16–18px` |
| Card internal padding | `12–16px` |
| Section gap between cards in a list | `10–12px` |
| Section label spacing above list | `10px` |

---

---

# SECTION 2 — Component Library

Build these as a shared component library. Every component has defined variants — do not introduce new variants without a documented reason.

---

## 2.1 Buttons

### Primary button
```
background: #C17D2F
color: #ffffff
border: none
border-radius: 13px
padding: 14px (full-width) or 9px 18px (inline)
font: DM Sans 600, 15px (full-width) or 14px (inline)
box-shadow: 0 6px 20px rgba(193,125,47,0.32)
transition: background 0.13s, transform 0.1s

hover: background #A66A22
active: transform scale(0.99)
disabled: opacity 0.45, cursor not-allowed, no shadow
```

### Ghost / secondary button
```
background: transparent
color: #6B6560
border: 1.5px solid #EAE7E1
border-radius: 13px
padding: 13px (full-width) or matching inline
font: DM Sans 500, 14px

hover: border-color #D6D1CA, background #ffffff
```

### Success micro button (vendor accept, admin force-complete)
```
background: #DCFCE7
color: #16A34A
border: none
border-radius: 10px
padding: 9px 0 (flex:1) or 5px 10px (inline)
font: DM Sans 600, 13px (flex) or 11px (micro)
```

### Danger micro button (vendor decline, admin cancel)
```
background: #FEE2E2
color: #DC2626
border: none
border-radius: 10px
padding: 9px 0 (flex:1) or 5px 10px (inline)
font: DM Sans 600, 13px (flex) or 11px (micro)
```

### Ghost micro button (admin resend)
```
background: #F4F4F5
color: #71717A
border: none
border-radius: 8px
padding: 5px 10px
font: DM Sans 600, 11px
```

### Text link
```
background: none
border: none
color: #C17D2F
font: DM Sans 600, matching context size
cursor: pointer
hover: color #A66A22
```

### Google OAuth button
```
background: #ffffff
color: #1C1A17
border: 1.5px solid #EAE7E1
border-radius: 13px
padding: 13px
font: DM Sans 500, 14px
display: flex, align-items: center, gap: 10px
Google 'G' SVG icon inline (multicolor, 18x18)
hover: border-color #D6D1CA, box-shadow 0 2px 8px rgba(0,0,0,0.07)
```

---

## 2.2 Status Badges

Pill-shaped inline labels. Used everywhere order states, availability states, or vendor states are displayed.

```
font: DM Sans 700, 10px
letter-spacing: 0.2px
padding: 2px 8px
border-radius: 20px
display: inline-block
```

| Badge label | Background | Text color |
|-------------|-----------|------------|
| Available | `#DCFCE7` | `#16A34A` |
| Few left | `#FEF3C7` | `#D97706` |
| Sold out | `#FEE2E2` | `#DC2626` |
| Paused | `#F4F4F5` | `#71717A` |
| Open | `#DCFCE7` | `#16A34A` |
| Closed | `#F4F4F5` | `#71717A` |
| Pending | `#FEF3C7` | `#D97706` |
| Accepted | `#FDF3E3` | `#C17D2F` |
| Ready ✓ | `#DCFCE7` | `#16A34A` |
| Fulfilled / Collected | `#F4F4F5` | `#71717A` |
| Coming soon | `#FEF3C7` | `#D97706` |
| Stuck Xm | `#FEE2E2` | `#DC2626` |

---

## 2.3 Input Fields

```
width: 100%
padding: 13px 14px
border-radius: 12px
border: 1.5px solid #EAE7E1
background: #ffffff
font: DM Sans, 14px, color #1C1A17
outline: none
transition: border-color 0.15s, box-shadow 0.15s
-webkit-appearance: none (important for iOS)

placeholder color: #A8A49E

focus state:
  border-color: #C17D2F
  box-shadow: 0 0 0 3px #FDF3E3

valid state (email passes Babcock check):
  border-color: #16A34A
  box-shadow: 0 0 0 3px #DCFCE7

invalid state (email fails check, field touched):
  border-color: #DC2626
  box-shadow: 0 0 0 3px #FEE2E2
```

Validation hint text sits below the field, 12px, DM Sans 400:
- Invalid: color `#DC2626`
- Valid: color `#16A34A` with ✓ prefix

---

## 2.4 Toggle Switch

Used in: Vendor inventory (per-item available/paused), Vendor shop open/close, Admin vendor online/offline.

```
Vendor size: 44px wide × 24px tall
Admin size: 38px wide × 21px tall
border-radius: half of height (pill shape)
border: none
cursor: pointer
transition: background 0.2s

ON state:  background #C17D2F (vendor/inventory) or #16A34A (admin vendor control)
OFF state: background #D6D1CA

Thumb (inner circle):
  background: #ffffff
  box-shadow: 0 1px 4px rgba(0,0,0,0.2)
  border-radius: 50%
  Vendor: 18px diameter, top: 3px, left: 3px (off) → left: 23px (on)
  Admin:  15px diameter, top: 3px, left: 3px (off) → left: 20px (on)
  transition: left 0.2s
```

---

## 2.5 Cards

### Shop card (Student Home)
```
background: #ffffff
border: 1px solid #EAE7E1
border-radius: 16px
overflow: hidden
box-shadow: 0 1px 3px rgba(0,0,0,0.04)
cursor: pointer
transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease

hover:
  transform: translateY(-2px)
  box-shadow: 0 10px 28px rgba(193,125,47,0.12)
  border-color: #D6D1CA

active: transform: translateY(0)

Layout: flex row
  Left block: 76–80px wide, flex-shrink 0
    background: #FDF3E3 (open) or #F4F4F5 (closed)
    emoji: 30–32px, centered
    closed overlay: rgba(255,255,255,0.45) over the block
  Right block: flex 1, padding 12px 14px
    Row 1: shop name (Sora 600, 14px) + open/closed badge
    Row 2: description (DM Sans 400, 12px, #6B6560)
    Row 3: meta (zone, response time in brand amber, rating, optional tag chip)
```

### Product row (Shop Page)
```
background: #ffffff
border: 1px solid #EAE7E1
border-radius: 14px
padding: 13px 14px
transition: border-color 0.13s, box-shadow 0.13s

in-cart (active) state:
  border-color: #C17D2F
  box-shadow: 0 0 0 3px #FDF3E3

unavailable state:
  opacity: 0.55
  cursor: default

Layout: flex row, align-items center, gap 12px
  Emoji block: 42×42px, border-radius 11px
    background: #FDF3E3 (available/few), #F4F4F5 (sold/paused)
    emoji: 20px, centered
  Info block: flex 1
    Row 1: name (DM Sans 500, 14px) + status badge (right-aligned)
    Row 2: price (Sora 700, 14px, #C17D2F) + optional note (12px italic #A8A49E)
  Control block: flex-shrink 0
    Not orderable: — (em dash, #A8A49E)
    Orderable, not in cart: add button (see below)
    In cart: qty controller (see below)
```

### Order card (Vendor — pending)
```
border: 1.5px solid #D97706
box-shadow: 0 0 0 3px #FEF3C7
```

### Order card (Vendor — urgent, < 2 min remaining)
```
border: 1.5px solid #DC2626
box-shadow: 0 0 0 3px #FEE2E2
```

### Order card (Admin — stuck)
```
border: 1.5px solid #DC2626
```

### Order card (Admin — ready)
```
border: 1.5px solid #16A34A
```

### Info callout box
```
background: #FDF3E3
border: 1px solid (slightly stronger than border token — use #C5E8DE for teal-adjacent, or a warm version)
border-radius: 12–14px
padding: 11–14px 14–16px
Used for: pickup instructions, delivery info notice, payment notice
```

---

## 2.6 Add Button and Qty Controller

### Add button (+ icon, product not yet in cart)
```
width: 30px, height: 30px
border-radius: 9px
border: none
background: #C17D2F
color: #ffffff
font-size: 19px, font-weight: 300
display: flex, align-items: center, justify-content: center
box-shadow: 0 3px 8px rgba(193,125,47,0.3)
transition: transform 0.1s, background 0.1s
hover: background #A66A22
active: transform scale(0.9)
```

### Qty controller (in-cart state, replaces add button in-place)
```
display: flex, align-items: center, gap: 8px

Minus button:
  30×30px, border-radius 9px
  background: #EAE7E1, color #1C1A17
  active: transform scale(0.9)

Count:
  Sora 700, 15px, min-width 18px, text-align center
  color: #1C1A17

Plus button:
  30×30px, border-radius 9px
  background: #C17D2F, color #ffffff
  active: transform scale(0.9)
```

---

## 2.7 Bottom Navigation Bar (Student screens)

```
position: fixed (or absolute within phone frame)
bottom: 0, left: 0, right: 0
background: rgba(255,255,255,0.95)
backdrop-filter: blur(12px)
border-top: 1px solid #EAE7E1
padding: 10px 0 16px
display: flex, justify-content: space-around

3 tabs: Home, Orders, Support
Each tab: flex column, align-items center, gap 3px
  SVG icon: 20×20px (not emoji — use proper SVG icons)
  Label: DM Sans, 10px
  Active dot: 4×4px circle, background #C17D2F, margin-top 1px

Active state:
  icon stroke/fill: #C17D2F
  label: DM Sans 600, color #C17D2F
  dot: visible

Inactive state:
  icon stroke: #A8A49E
  label: DM Sans 400, color #A8A49E
  dot: hidden
```

---

## 2.8 Tab Bar (Vendor and Admin screens)

```
display: flex
background: #ffffff
border-bottom: 1px solid #EAE7E1

Each tab: flex 1, padding 9px 0
  font: DM Sans, 13px (vendor) or 12px (admin)
  text-align: center
  border: none, cursor: pointer
  border-bottom: 2px solid

Active:
  font-weight: 600, color #C17D2F
  border-bottom-color: #C17D2F

Inactive:
  font-weight: 400, color #6B6560
  border-bottom-color: transparent

Badge (red dot with count):
  Appears on Orders tab when pendingCount > 0 (vendor) or stuckCount > 0 (admin)
  background: #DC2626, color #ffffff
  font: DM Sans 700, 9px
  padding: 1px 5px, border-radius: 10px
  displayed inline after label text
```

---

## 2.9 Section Labels

Used above grouped lists throughout the app.

```
font: DM Sans 600, 11px
color: #A8A49E
letter-spacing: 0.9px
text-transform: uppercase
margin-bottom: 10px
```

---

## 2.10 Tag / Feature Chips

Used on shop cards ("Most ordered", "Fastest response") and the splash screen feature list.

```
background: #F5ECD8
color: #7A4E18
font: DM Sans 600, 10–12px
letter-spacing: 0.2px
padding: 2px 8px (card tags) or 6px 12px (splash chips)
border-radius: 20px
display: inline-flex, align-items: center, gap: 5–6px
```

---

## 2.11 Countdown Timer (Vendor orders)

```
Displayed on pending order cards only
Position: top-right of the order card
Label above: "RESPOND IN" — DM Sans 600, 9px, #A8A49E, letter-spacing 0.8px
Timer: Sora 800, 22px, line-height 1

Normal state (>= 2 minutes): color #D97706
Urgent state (< 2 minutes):
  color #DC2626
  animation: urgentPulse — alternates between #DC2626 and a lighter red, 1s infinite

Format: MM:SS (e.g. 06:23)
Counts down in real time using setInterval(1000)
```

---

---

# SECTION 3 — Screen Specifications

**Screen architecture overview:**

```
Student journey:  Auth → Home → Shop → Checkout → Order Ticket
Vendor:           Auth (separate) → Vendor Dashboard (Orders tab + Inventory tab)
Admin:            Auth (separate) → Admin Console (Orders tab + Vendors tab)
```

Total: 6 screen destinations, 4 taps for the complete student journey.

---

## Screen 1 — Student Home

**Role:** Student  
**File:** `link3y-home.jsx`  
**Purpose:** Entry point for students. Browse all campus shops, filter by category, and tap into a shop to start ordering.

### Layout (top to bottom)
1. Status bar (mock: time left, signal right)
2. Top bar: amber L logo mark (28×28px, radius 8) + "link3y" wordmark (Sora 700, 17px) + notification bell icon (34×34px card, right)
3. Greeting: "Good afternoon, [Name]" (DM Sans 400, 12px, #6B6560) + headline "What do you need right now?" (Sora 800, 22px, #1C1A17, letter-spacing -0.4)
4. Search bar: passive placeholder only — no backend in MVP. Sets visual expectation.
5. Category pills: horizontal scroll row, 7 categories each with icon + label
6. Section label: "OPEN NOW"
7. Open shop cards: vertical list, gap 10px
8. Section label: "CLOSED NOW"
9. Closed shop cards: same component, rendered at reduced opacity
10. Bottom navigation bar (fixed)

### Category pills
- 7 categories: All (✦), Food (🍛), Snacks (🧁), Drinks (🥤), Stationery (📚), Toiletries (🧴), Printing (🖨️)
- Active: `background #C17D2F`, white text, no border, `box-shadow 0 4px 12px rgba(193,125,47,0.3)`
- Inactive: white background, `border 1px solid #EAE7E1`, `color #6B6560`
- Scroll: horizontal, no visible scrollbar
- Filtering is client-side — both open and closed sections filter and re-render on selection
- Empty state: 🔍 emoji + "No shops in this category yet" centered in grey

### Shop card anatomy
- **Left block (76–80px):** emoji centered, `background #FDF3E3` (open) or `#F4F4F5` (closed), closed overlay `rgba(255,255,255,0.45)`
- **Name row:** Sora 600, 14px + Open/Closed badge (top-right, flex space-between)
- **Description:** DM Sans 400, 12px, `#6B6560`, 1.45 line-height, `opacity 0.6` when closed
- **Meta row:** Zone (📍), Response time (⚡ brand amber, DM Sans 600, 11px), Rating (⭐), Tag chip if applicable
- **Hover:** `translateY(-2px)` + amber glow shadow + border to `#D6D1CA`
- **Tap:** navigates to Shop page for that vendor

### Auto-sorting behaviour
Shops automatically split into "Open now" and "Closed now" sections. Open shops always appear first. This happens automatically — no manual sorting required.

---

## Screen 2 — Shop Page

**Role:** Student  
**File:** `link3y-shop.jsx`  
**Purpose:** Browse a vendor's full menu, see product availability, and build an order. There is no separate product detail screen and no separate cart screen. All product info lives on the row; the sticky cart bar leads directly to Checkout.

### Header
- Full-width `#C17D2F` (brand amber) background
- Status bar above: white text at reduced opacity
- Back button: `rgba(255,255,255,0.8)` background, `border 1px solid #EAE7E1`, `backdrop-filter blur(8px)`, "← Back" text
- Shop identity row: emoji in 52×52px rounded square (`rgba(255,255,255,0.2)` bg, `1.5px rgba(255,255,255,0.25)` border) + shop name (Sora 700, 18px, white) + Open badge + response time + rating
- Description: 12px, `rgba(255,255,255,0.7)`, 1.5 line-height
- Info pills row (on amber bg, white-translucent): "📍 Zone X" + "🎟️ Ticket on order"
  - **Do not show a payment method pill.** The "Pay on pickup" concept was explicitly removed. Do not reintroduce it.

### Product sections
- Menu grouped into named sections (e.g. "Rice & Mains", "Proteins (Add-on)", "Drinks")
- Section label above each group: uppercase, 11px, `#A8A49E`
- Gap between sections: 22px

### Product row behaviour
- **Available / Few left:** orderable, add button or qty control shown
- **Sold out / Paused:** not orderable. Row `opacity 0.55`. Control area shows `—` (em dash)
- **In-cart state:** row gets `border-color #C17D2F` + `box-shadow 0 0 0 3px #FDF3E3`. Add button replaced by qty controller in-place.
- **Emoji block background:** `#FDF3E3` when orderable, `#F4F4F5` when not

### Cart bar (sticky)
- Renders only when `cartCount > 0`
- `position: fixed` (or absolute within phone container), `bottom: 16px`, `left: 12px`, `right: 12px`
- `background #C17D2F`, `border-radius 16px`, `box-shadow 0 8px 28px rgba(193,125,47,0.40)`
- Layout: [item count pill | "Review Order" | ₦total]
- Item count pill: `rgba(255,255,255,0.25)` background, Sora 700 13px white text
- Total: Sora 700, 15px, white
- Tap: navigates to Checkout

### Babcock menu rules
- **No chicken, beef, pork, or any meat** — this is a Seventh-day Adventist institution
- Protein options are **eggs only** (fried egg, boiled egg) and **sausages**
- All mock data and seeded menu content must reflect this

---

## Screen 3 — Checkout

**Role:** Student  
**File:** `link3y-checkout-ticket.jsx` (Checkout tab)  
**Purpose:** Review order, choose fulfilment method, confirm and pay. Replaces both a separate cart screen and a separate order confirmation screen.

### Layout (top to bottom)
1. Back link: "← Back to menu" (DM Sans 500, 13px, `#6B6560`)
2. Heading: "Review Order" (Sora 800, 20px) + shop name subtitle
3. Section: "YOUR ITEMS" — order summary surface
4. Section: "HOW DO YOU WANT TO RECEIVE IT?" — **fulfilment selector** (critical, see below)
5. Section: "HOW PICKUP WORKS" — 3-step explainer
6. Amber notice: payment required, vendor fairness explanation
7. Primary CTA: "Confirm & Pay ₦X,XXX →"
8. Ghost CTA: "← Edit order"

### Order summary surface
```
background: #ffffff
border: 1px solid #EAE7E1
border-radius: 16px
overflow: hidden

Per item row:
  Left: emoji (18px) + name (DM Sans 500, 14px) + qty (DM Sans 400, 12px, #A8A49E below name)
  Right: line total (Sora 700, 14px, #C17D2F)
  border-bottom: 1px solid #EAE7E1 between rows

Total row:
  background: #FEF9F0
  "Total" label (DM Sans 600, 14px) + amount (Sora 800, 16px, #C17D2F)
```

### Fulfilment selector — CRITICAL

Two side-by-side cards.

**Pick up card (active by default):**
```
flex: 1
background: #ffffff
border: 2px solid #C17D2F
border-radius: 14px
padding: 13px 14px
box-shadow: 0 0 0 3px #FDF3E3
cursor: pointer

Content:
  🏃 emoji (22px)
  "Pick up" label (DM Sans 700, 13px)
  "Go to the shop when ready" sub (DM Sans 400, 11px, #6B6560)
  "Available" green badge
```

**Delivery card (disabled — DELIVERY_ENABLED=false):**
```
flex: 1
background: #F4F4F5
border: 1.5px solid #EAE7E1
border-radius: 14px
padding: 13px 14px
opacity: 0.75
cursor: not-allowed

Content:
  🛵 emoji (22px)
  "Delivery" label (DM Sans 700, 13px, #6B6560)
  "Runner brings it to you" sub (DM Sans 400, 11px, #A8A49E)
  "Coming soon" amber badge
```

**Below the two cards — delivery explainer:**
```
background: #ffffff
border: 1px solid #EAE7E1
border-radius: 12px
padding: 11px 14px

ℹ️ icon + "Delivery by student runners is launching soon. Runners set their own fee — you'll see the rate and confirm before paying."
font: DM Sans 400, 12px, #6B6560
```

### How pickup works — 3-step explainer
Three icon + text rows inside a surface card:
1. 🎟️ "You'll get a ticket number" / "Generated instantly when you confirm"
2. ⚡ "Vendor has 7 min to accept" / "You'll be notified when they do"
3. 🏃 "Head to the shop when it's ready" / "Show your ticket number to collect"

Each icon in a 36×36px `#FDF3E3` rounded block (radius 10px).

### Payment notice
```
background: #FEF3C7
border: 1px solid #FDE68A
border-radius: 12px
padding: 11px 14px
display: flex, gap: 10px

💳 icon + "Payment is required to confirm your order. This reserves the vendor's time and stock — no-shows affect other students."
font: DM Sans 400, 12px, color #1C1A17
"Payment is required" in bold
```

### Submit button state
- Disabled (opacity 0.45, no shadow, cursor not-allowed) until: order has items + payment method valid
- Enabled: "Confirm & Pay ₦X,XXX →" with full primary button style

---

## Screen 4 — Order Ticket

**Role:** Student  
**File:** `link3y-checkout-ticket.jsx` (Order Ticket tab)  
**Purpose:** The most trust-critical screen in the product. Confirms the order, shows the ticket number large and unmistakable, and tracks order status live. A student should be able to screenshot this and show it at the shop counter.

### Status banner (above ticket)
Renders based on current `orderStatus`. Emoji pulses (CSS animation) when order is in-progress.

| Status | Background | Emoji | Headline | Subline |
|--------|-----------|-------|----------|---------|
| `pending_vendor` | `#FEF3C7` | ⏳ (pulse) | "Waiting for vendor…" | "Vendor has 7 min to respond" |
| `accepted` | `#FDF3E3` | 👨‍🍳 (pulse) | "Vendor is preparing your order" | — |
| `ready_for_pickup` | `#DCFCE7` | ✅ | "Ready! Head to the shop" | — |
| `picked_up` | `#DCFCE7` | 🎉 | "Order complete. Enjoy!" | — |

### The ticket card

**Header block (brand amber background):**
```
background: #C17D2F
padding: 20px 20px 18px

Label: "ORDER TICKET · [Shop Name]"
  DM Sans 700, 10px, rgba(255,255,255,0.65), letter-spacing 1.2px, uppercase, margin-bottom 6px

Ticket number: Sora 800, 56px, #ffffff, letter-spacing -2, line-height 1
  Format: #XXXX (4-digit number, e.g. #5047)

Subline: "Show this number at the shop counter"
  DM Sans 400, 12px, rgba(255,255,255,0.7), margin-top 8px
```

**Tear-line divider:**
```
margin: 0 16px (inset from card edges)
border-top: 2px dashed #EAE7E1

Cutout circles at each end (simulating a physical ticket tear):
  width: 16px, height: 16px, border-radius: 50%
  background: #E8E5DF (matches the outer page bg)
  border: 1px solid #EAE7E1
  position: absolute, top: -8px, left: -24px (and right: -24px)
```

**Body block:**
```
padding: 16px 20px

Meta row:
  Left:  "ORDER ID" label (10px faint) + "LK-XXXX" value (DM Sans 600, 13px)
  Right: "PLACED" label (10px faint) + time value (DM Sans 600, 13px)

Items list:
  Label: "ITEMS" (10px, faint, uppercase, letter-spacing 0.6)
  Per item: emoji + name + "× qty" left | "₦X,XXX" right
  font: DM Sans 400, 13px, color #6B6560

Divider: 1px solid #EAE7E1, padding-top 12px

Total row:
  "Total paid" (DM Sans 600, 14px) | amount (Sora 800, 16px, #C17D2F)
```

**Card entry animation:**
```css
@keyframes ticketIn {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
animation: ticketIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Status timeline

4 steps: Order placed → Vendor accepted → Ready for pickup → Collected

```
Per step: flex row, gap 12px
  Dot: 20×20px circle
    Completed: background #C17D2F, white ✓ checkmark (10px), no border
    Active: background #C17D2F, pulsing animation if not final state
    Pending: background #EAE7E1, empty
  Label: DM Sans, 13px
    Completed: font-weight 600, color #1C1A17
    Active:    font-weight 600, color #1C1A17 + subline (11px, #6B6560 below)
    Pending:   font-weight 400, color #A8A49E

Connector line between steps: 2px wide, 16px tall, margin 2px 0 2px 9px
  Completed (line below a done step): background #C17D2F
  Pending: background #EAE7E1
```

### Help button
```
width: 100%
background: #ffffff
border: 1px solid #EAE7E1
border-radius: 12px
padding: 12px
font: DM Sans 400, 14px, color #6B6560
display: flex, align-items: center, justify-content: center, gap 6px
text: "💬 Need help with this order?"
```
When tapped: opens support flow with `orderId` pre-attached to the request. No manual order lookup.

> **Remove in production:** The "Demo: advance order status" button visible in the prototype is for design testing only. Remove it entirely in the real build.

---

## Screen 5 — Vendor Dashboard

**Role:** Vendor  
**File:** `link3y-vendor.jsx`  
**Purpose:** The vendor's entire operating interface. One screen, two tabs. Orders tab: incoming orders with live countdown, accept/decline/fulfill workflow. Inventory tab: shop open/close + per-item availability toggles.

### Header (brand amber)
```
background: #C17D2F
padding: 8px 16px 18px (below status bar)

Top row:
  Left:  38×38px rounded square emoji + shop name (Sora 700, 15px, white) + status dot (6px circle, green/grey) + "Open"/"Closed" label (11px, rgba(255,255,255,0.75))
  Right: "TODAY'S REVENUE" label (9px, white 60%) + ₦ figure (Sora 800, 18px, white)

Stat pills row (3 pills, flex):
  Each pill: flex 1, background rgba(255,255,255,0.15), border-radius 10px, padding 7px 10px
  Value: Sora 800, 17px, white
  Label: DM Sans 400, 10px, rgba(255,255,255,0.65)
  
  Pills: Pending | Active | Done today
  Pending pill turns red when pendingCount > 0:
    background: rgba(220,38,38,0.2)
    border: 1px solid rgba(220,38,38,0.4)
    value color: #fca5a5
```

### Orders tab

**Active orders section** (pending, accepted, ready) appears first.  
**"Completed today" section** (fulfilled) appears below, with a section label, dimmed to opacity 0.6.

**Order card — fields:**
- Ticket number: Sora 800, 16px (e.g. #5047)
- Status badge (top-right of number row)
- Student name: DM Sans 400, 12px, `#6B6560`
- Items block: `background #FAF8F4`, `border-radius 10px`, `padding 9px 12px` — item name + "× qty" per row
- Student note (if present): DM Sans 400 italic, 12px, `#D97706`, within the items block
- Total: Sora 700, 14px, `#C17D2F`
- Action buttons: flex row below total

**Action buttons by state:**
| Order state | Buttons shown |
|-------------|--------------|
| `pending_vendor` | ✓ Accept (success micro) + ✕ Decline (danger micro) |
| `accepted` | Mark as Ready → (brand light bg, brand color text) |
| `ready_for_pickup` | ✓ Confirm Pickup (success micro) |
| `fulfilled` | "Complete" text label only (12px, green) — no buttons |

**Countdown timer (pending orders only):**
- Top-right of the order card
- Label: "RESPOND IN" — DM Sans 600, 9px, `#A8A49E`, letter-spacing 0.8px
- Timer: Sora 800, 22px, line-height 1
  - `>= 2 min:` color `#D97706`
  - `< 2 min:` color `#DC2626`, `urgentPulse` animation (1s infinite)
- Counts down in real time with `setInterval`
- On expiry (0:00): auto-cancel order + notify student + trigger refund

**Empty state:**
```
text-align: center, padding 40px 20px
🎉 emoji (28px) + "All caught up — no active orders"
color: #A8A49E, font-size 14px
```

### Inventory tab

**Shop open/closed card:**
```
Rendered at top of Inventory tab
Open state: background #DCFCE7, border 1px #BBF7D0
Closed state: background #F4F4F5, border 1px #EAE7E1
padding: 14px 16px, border-radius 14px

Left: "Shop status" (DM Sans 600, 14px) + status line ("Open — students can order" in green, or "Closed — no new orders" in grey)
Right: Toggle switch

Toggling shop CLOSED immediately stops new orders to this vendor on the student side.
```

**Bulk action buttons:**
Two equal-width buttons side by side:
- "Pause all items" — `color #DC2626`, `border 1px solid #EAE7E1`
- "Resume all" — `color #16A34A`, `border 1px solid #EAE7E1`

**Per-item list:**
```
background: #ffffff
border: 1px solid #EAE7E1
border-radius: 14px
overflow: hidden

Per row: flex row, padding 12px 14px, border-bottom 1px solid #EAE7E1 (last row: no border)
  Left: item name (DM Sans 500, 14px) + price (DM Sans 400, 12px, #A8A49E below)
  Right: Available/Paused badge + Toggle switch
  When item is paused: name color drops to #A8A49E
```

Toggling an item to paused immediately changes its status badge to "Paused" and renders it as unavailable on the student Shop page.

---

## Screen 6 — Admin Console

**Role:** Admin / Ops  
**File:** `link3y-admin.jsx`  
**Purpose:** Ops oversight. See all live orders, intervene when orders are stuck, monitor vendor status. This is a control room — it is intentionally visually distinct from the student and vendor screens.

### Header (DARK — intentional)
```
background: #1C1A17 (near-black)

This differentiates the admin screen from all other screens. It signals a different access level.

Top row:
  Left:  L logo mark (26×26px amber square) + "Ops Console" (Sora 700, 15px, white) + "[X]/[Y] vendors online · Babcock Campus" (11px, white 45%)
  Right: "TODAY'S GMV" label (9px, white 40%, uppercase) + ₦ figure (Sora 800, 18px, #C17D2F)
  GMV = gross merchandise value = sum of all fulfilled orders today

Stat row (4 tiles, flex):
  Each: flex 1, background rgba(255,255,255,0.07), border-radius 10px, padding 8px 10px
  border: 1px solid rgba(255,255,255,0.08) default
  Value: Sora 800, 18px
  Label: DM Sans 400, 10px, rgba(255,255,255,0.4)

  Tiles: Live | Stuck | Ready | Done
  Live:  color #ffffff
  Stuck: color #fca5a5, border rgba(220,38,38,0.4) when count > 0
  Ready: color #86efac
  Done:  color rgba(255,255,255,0.5)
```

### Orders tab

**Stuck alert banner:**
Renders automatically when any order has been in `pending_vendor` state past the defined threshold AND `stuckMins >= 5`.

```
background: #FEE2E2
border: 1px solid #FCA5A5
border-radius: 12px
padding: 11px 14px

⚠️ + "[X] order(s) stuck — vendor not responding" (DM Sans 700, 13px, #DC2626)
    + "Intervene manually or resend vendor notification" (DM Sans 400, 11px, #6B6560)
```

**Order card fields:**
- LK-XXXX (Sora 800, 14px) + status badge + optional "Stuck Xm" red badge
- Shop name · Student name (DM Sans 400, 11px, `#6B6560`)
- Total amount (Sora 700, 13px, `#C17D2F`)
- Items summary string (DM Sans 400, 12px, `#A8A49E`)
- Action buttons (only for non-terminal orders)

**Admin action buttons per live order:**
```
Force complete — background #DCFCE7, color #16A34A → moves order to picked_up, triggers no refund
Cancel         — background #FEE2E2, color #DC2626 → moves order to cancelled, triggers refund
Resend         — background #F4F4F5, color #71717A → resends notification to vendor
```

Terminal orders (picked_up, cancelled): `opacity 0.55`, no action buttons shown.

### Vendors tab

Per-vendor row:
- 36×36px emoji block (`#FDF3E3` if open, `#F4F4F5` if closed) + vendor name (DM Sans 600, 13px) + zone + response rate + orders today count + toggle switch
- Response rate colour: `#16A34A` (green) if >= 90%, `#D97706` (amber) if below 90%
- Admin toggle: takes vendor offline immediately. Stops all new orders to that shop.

Note below list: "Toggling a vendor offline immediately stops new orders to their shop" — 11px, `#A8A49E`, centred.

---

## Screen 7 — Auth Flow

**Role:** Student (entry point)  
**File:** `link3y-auth.jsx`  
**Purpose:** Student onboarding — splash, sign up, log in, success. Vendor and admin auth is a separate route (not this screen).

### Babcock email validation rules
```javascript
const BABCOCK_DOMAINS = ["@student.babcock.edu.ng", "@babcock.edu.ng"];
const isBabcockEmail = (email) =>
  BABCOCK_DOMAINS.some(d => email.toLowerCase().trim().endsWith(d));
const isValidEmailShape = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
```

Validation fires:
- **On blur:** first time user leaves the email field
- **On change:** after first blur (live feedback from that point on)

Error messages:
- Not valid shape: "Enter a valid email address"
- Valid shape but wrong domain: "Only Babcock student emails are accepted — e.g. **yourname@student.babcock.edu.ng**"
- Valid Babcock email: "✓ Valid Babcock email" (green)

### Splash screen
- Logo mark: 52×52px `#C17D2F` square, `border-radius 16px`, `box-shadow 0 8px 24px rgba(193,125,47,0.35)`
- Headline: "Campus shops," (Sora 800, 34px, `#1C1A17`) + "ordered fast." (same, but `color #C17D2F`)
- Body: DM Sans 400, 15px, `#6B6560`, max-width 280px
- Feature chips: Fast response, Order tickets, On campus, Babcock only — white bg, border, inline-flex with icon + label
- Background: `radial-gradient(ellipse at 60% 0%, #FDF3E3 0%, transparent 65%)` + secondary soft lower-left glow
- Decorative circles: subtle border rings in top-right (brand + neutral)
- CTAs: "Get started →" (primary full-width) + "Continue with Google" (Google button)
- Below: "Already have an account? Log in" (13px, link)

### Sign up screen
- Back link at top
- Heading: "Create your account" (Sora 800, 22px) + "Only Babcock University student emails are accepted." (13px, muted)
- Google path: "Sign up with Google" Google button → **expands inline panel** (does NOT trigger OAuth immediately)
  - Panel: Google icon + "Sign up with Google" label + explanation text + email input field with live Babcock validation + "Continue with Google →" primary button (only appears once email is valid)
- Divider: "or sign up with email"
- Email/password path fields:
  - Full Name: placeholder "e.g. Obata Onyelukachukwu"
  - Student Email: Babcock validation (live after blur)
  - Password: show/hide toggle (👁️/🙈 icon button, position absolute right: 12px), hint "At least 6 characters", error if < 6 chars while typing
- Submit button: disabled until name > 1 char AND email passes Babcock validation AND password >= 6 chars
- Terms line: 11px, faint — "By signing up you agree to Link3y's Terms of Use and Privacy Policy"
- Bottom: "Already have an account? Log in" link

### Log in screen
- Logo mark at top (42×42px)
- Heading: "Welcome back" (Sora 800, 22px)
- "Continue with Google" Google button (triggers OAuth directly — email already verified from sign-up)
- Divider: "or log in with email"
- Fields: Student Email (Babcock validation live after blur) + Password (show/hide + "Forgot password?" link in label row)
- Submit: disabled until email passes Babcock check AND password >= 6 chars
- Bottom: "Don't have an account? Sign up" link

### Success screen
```
Centred layout, padding 32px 24px

72×72px circle:
  background: #DCFCE7
  border: 2px solid #16A34A
  content: "✓" (32px emoji or text)
  margin-bottom: 20px

New user:   "You're in!" + "Your account is set up. Start browsing shops on campus."
Returning:  "Welcome back!" + "Picking up where you left off."

"Browse shops →" primary button (max-width 280px, centered)
```

---

---

# SECTION 4 — Feature Flags

Feature flags must be implemented as a **config layer from day one** — even if all flags are currently false. This is non-negotiable for the venture-scale roadmap.

> Do not implement flags as scattered hardcoded `if (false)` blocks. Implement as a central config object that all conditional renders reference.

```javascript
const FEATURE_FLAGS = {
  DELIVERY_ENABLED: false,
  PAYMENTS_ENABLED: false,
  UPVOTES_ENABLED: false,
  VENDOR_RATINGS_ENABLED: false,
};
```

| Flag | Current state | What activates when set to `true` |
|------|-------------|-----------------------------------|
| `DELIVERY_ENABLED` | `false` | Delivery card in Checkout becomes selectable; runner fee row added to order total; new order states (`runner_assigned`, `in_transit`, `delivered`) activate; Runner role and dashboard unlock |
| `PAYMENTS_ENABLED` | `false` | Checkout integrates live payment gateway; "Confirm & Pay" triggers real charge; payment state machine activates |
| `UPVOTES_ENABLED` | `false` | Upvote button appears on product rows in Shop page; upvote count visible; trending sort activates on Student Home |
| `VENDOR_RATINGS_ENABLED` | `false` | Star rating prompt appears post-pickup on Ticket screen; rating shown on Shop header and Home cards |

### Delivery flag — what to build ahead of time

Even with `DELIVERY_ENABLED=false`, build and hide the following so the flag can be flipped without a schema migration:

1. **Delivery card in Checkout selector** — visible, greyed, "Coming soon" badge (already designed, already in the prototype)
2. **Runner role in user system** — flag-gated but schema-ready
3. **Order state machine extended** with `runner_assigned`, `in_transit`, `delivered` states
4. **Runner fee field** in order model (nullable, null when delivery is off)
5. **Delivery fee model:** Runners set their own fee. Students see the runner's rate before confirming. Link3y's commission on delivery fees is a monetisation-phase decision — do **not** hardcode a platform cut in the MVP.

---

---

# SECTION 5 — Order & Payment State Machines

These must be implemented exactly as specified. Order state transitions are the core operational logic of the entire platform.

---

## 5.1 Order states (current — pickup only)

| State | Meaning |
|-------|---------|
| `pending_vendor` | Order placed and payment confirmed. Waiting for vendor to accept. Auto-cancels + refunds if no response within timeout. |
| `accepted` | Vendor accepted. Order being prepared. |
| `ready_for_pickup` | Vendor marked ready. Student notified to collect. |
| `picked_up` | Vendor confirmed student collected. **Terminal state.** |
| `expired` | Vendor didn't respond within timeout. Student notified, refund triggered automatically. **Terminal state.** |
| `cancelled` | Manually cancelled (admin) or vendor declined. Refund triggered. **Terminal state.** |

## 5.2 Order states (delivery — when DELIVERY_ENABLED=true)

Additional states that insert between `ready_for_pickup` and delivered:

| State | Meaning |
|-------|---------|
| `runner_assigned` | A runner has accepted the delivery job |
| `in_transit` | Runner collected from vendor, en route to student |
| `delivered` | Runner confirmed delivery. **Terminal state.** |

## 5.3 Payment states

| State | Meaning |
|-------|---------|
| `initiated` | Payment process started |
| `confirmed` | Payment successfully captured. **Only at this point should the order be created.** |
| `failed` | Payment did not complete. No order created. |
| `refunded` | Full refund processed. Triggered by: `expired`, `cancelled`, or admin force-cancel. |

> **Non-negotiable rule:** `confirmed` payment is the gate for order creation. Never create an order in `pending_vendor` state without a prior `confirmed` payment. Implement idempotent order creation — duplicate payment callbacks must not create duplicate orders.

## 5.4 Product availability states

| State | Orderable | Badge | Display |
|-------|-----------|-------|---------|
| `available` | Yes | Green "Available" | Normal opacity |
| `few` | Yes | Amber "Few left" | Normal opacity |
| `sold` | No | Red "Sold out" | Opacity 0.55 |
| `paused` | No | Grey "Paused" | Opacity 0.55 |

---

---

# SECTION 6 — Recommended Tech Stack

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| Framework | Next.js + TypeScript | App Router for screen routing; TypeScript for order state machine type safety |
| Styling | Tailwind CSS | Utility-first, fast to build with, maps cleanly to the design token system |
| Component base | shadcn/ui | Unstyled base components (dialogs, bottom sheets, toasts) that can be themed to Savanna tokens |
| Fonts | Google Fonts | Sora + DM Sans — see Section 1.4 for import URLs |
| Mock data (MVP) | JSON files | Shops, products, orders as static JSON. Local state for cart and order flow during frontend-only phase. |
| Icons | SVG inline | As used in the prototypes. No icon library required. Do not use font-based icons or emoji as navigation icons. |
| Animations | CSS only | Keyframe animations and transitions. No animation library required for MVP. |
| Auth | TBD by backend | Frontend requires: Babcock email domain validation, Google OAuth with Babcock pre-validation step, JWT/session management |
| Payments | Feature-flagged off | Paystack or Flutterwave recommended for Nigerian card support when PAYMENTS_ENABLED=true |
| Notifications | Push + email fallback | Delivery must be logged. Admin Resend button triggers re-delivery without code changes. |

---

---

# SECTION 7 — Babcock University Specific Rules

These constraints must be hardcoded during the campus phase. They are not configurable.

1. **Email domains:** Only `@student.babcock.edu.ng` and `@babcock.edu.ng` are accepted at sign-up and log-in. No exceptions. Enforced on both email/password and Google OAuth paths.

2. **Menu content:** Babcock is a Seventh-day Adventist institution. **No chicken, beef, pork, or any meat products** on any vendor menu at any time. Protein options are limited to eggs (fried, boiled, scrambled) and sausages only. This rule applies to all mock data and all vendor-created menu items.

3. **Currency:** Nigerian Naira (₦) only. Display format: `₦X,XXX` (e.g. ₦1,200). No foreign currency handling.

4. **Delivery fee:** When `DELIVERY_ENABLED=true`, runners set their own delivery fee per trip. Students see the fee before confirming. Link3y's platform commission on delivery fees is a monetisation-phase decision — do not build a commission deduction into the MVP.

5. **Vendor response window:** 7 minutes from order placement. This value is shown in the student-facing UI. Exact auto-cancel timing must be confirmed with the ops team before backend implementation, but the frontend shows "7 min" as the advertised standard.

6. **Campus zones:** Zone A, Zone B, Zone C. Used for location display on shop cards only. No routing, mapping, or distance calculation in MVP.

7. **No delivery at launch:** `DELIVERY_ENABLED=false` at launch. The UI shows the delivery card as "coming soon" — this is intentional and must remain visible.

---

---

# SECTION 8 — Operational Rules for Backend

These were defined in the original product specification. They are documented here so the development team has full context.

## 8.1 Order enforcement
- Payment `confirmed` state is the mandatory gate before creating an order
- Idempotent order creation — duplicate payment callbacks must not create duplicate orders
- Vendor response window: auto-cancel + notify student if no response within timeout; refund triggers immediately on expiry
- Load caps: implement max concurrent orders per vendor per hour; show "Ordering paused due to high demand" rather than letting the queue grow unbounded — controlled pause is better than public crash

## 8.2 Admin override capabilities (required from day one)
- Force-complete any order (moves to `picked_up`)
- Force-cancel any order (moves to `cancelled`, triggers refund)
- Toggle any vendor online/offline
- Resend any notification
- View full order log per order ID

## 8.3 Notification requirements
- Every order state transition triggers a notification to the relevant party
- Notifications must be logged — delivery success/failure recorded per notification
- Redundant channels: in-app primary, email/SMS fallback
- "Resend notification" must be available in admin console without a code change or redeployment
- Assume notifications will fail under load — build redundancy in from the start

## 8.4 Vendor behaviour mitigations
- Auto-take vendor offline after extended inactivity (threshold TBD)
- Nudge reminders to vendors who haven't updated stock
- Vendor UI must be as simple as possible — vendors are often simultaneously managing physical operations

---

---

# SECTION 9 — Animations Reference

All animations used in the prototypes, documented for consistent implementation.

```css
/* Page/screen entry */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.2s ease-out; }
.stagger-1 { animation: fadeIn 0.2s ease-out 0.05s both; }
.stagger-2 { animation: fadeIn 0.2s ease-out 0.10s both; }
.stagger-3 { animation: fadeIn 0.2s ease-out 0.14s both; }

/* Auth screen entry (spring bounce) */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.slide-up { animation: slideUp 0.28s cubic-bezier(0.34, 1.2, 0.64, 1); }

/* Ticket card entry */
@keyframes ticketIn {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.ticket-enter { animation: ticketIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }

/* Status pulse (pending/in-progress states) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
.pulse { animation: pulse 2s ease-in-out infinite; }

/* Countdown urgency (< 2 min remaining) */
@keyframes urgentPulse {
  0%, 100% { color: #DC2626; }
  50% { color: #ff8080; }
}
.urgent-pulse { animation: urgentPulse 1s ease-in-out infinite; }

/* Card hover (applied via class, not keyframe) */
.card-hover {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

/* Button press */
.btn:active { transform: scale(0.97–0.99); }
.qty-btn:active { transform: scale(0.9); }
```

---

---

# SECTION 10 — Pre-Build Checklist

Before development begins, confirm all of the following:

- [ ] All 6 prototype JSX files are accessible and running in a sandbox
- [ ] Sora and DM Sans loading from Google Fonts (check both import URLs)
- [ ] All hex color tokens match Section 1.2 exactly — no approximations
- [ ] Feature flags implemented as a central config object (not scattered conditionals)
- [ ] Order state machine matches Section 5 exactly — all states present in the schema
- [ ] Babcock email validation rejects non-`.babcock.edu.ng` addresses on both auth paths
- [ ] Google OAuth path collects and validates Babcock email BEFORE triggering OAuth
- [ ] Admin console has force-complete, cancel, and resend controls on all live orders
- [ ] Vendor countdown timer is live (real-time setInterval) and triggers urgency state at < 2 minutes
- [ ] Delivery card in Checkout is visible but disabled (`DELIVERY_ENABLED=false`)
- [ ] Payment confirmation is the gate for order creation — order never created before `confirmed` payment
- [ ] "Pay on pickup" copy does not appear anywhere in the product
- [ ] No chicken, beef, or meat products in any seeded menu data
- [ ] All prices in ₦ (Nigerian Naira) format
- [ ] "Demo: advance order status" button removed from production Ticket screen
- [ ] Notification delivery is logged (not fire-and-forget)
- [ ] Admin resend notification works without code change

---

*End of document.*  
*Link3y — Babcock University Campus MVP — March 2026*
