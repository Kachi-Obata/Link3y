import { useState } from "react";

// ─── SAVANNA TOKENS ───────────────────────────────────────────────────────────
const t = {
  brand: "#C17D2F", brandDim: "#A66A22", brandLight: "#FDF3E3",
  brandLighter: "#FEF9F0", accentText: "#7A4E18",
  bg: "#FAF8F4", bgCard: "#FFFFFF",
  text: "#1C1A17", textMuted: "#6B6560", textFaint: "#A8A49E",
  border: "#EAE7E1", borderStrong: "#D6D1CA",
  statusGreen: "#16A34A", statusGreenBg: "#DCFCE7",
  statusRed: "#DC2626", statusRedBg: "#FEE2E2",
  statusAmber: "#D97706", statusAmberBg: "#FEF3C7",
};

// Valid Babcock email domains
const BABCOCK_DOMAINS = ["@student.babcock.edu.ng", "@babcock.edu.ng"];
const isBabcockEmail = (email) =>
  BABCOCK_DOMAINS.some(d => email.toLowerCase().trim().endsWith(d));
const isValidEmailShape = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { background: #E8E5DF; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .sora { font-family: 'Sora', sans-serif; }
    ::-webkit-scrollbar { display: none; }

    .input-field {
      width: 100%; padding: 13px 14px;
      border-radius: 12px; border: 1.5px solid ${t.border};
      font-family: 'DM Sans', sans-serif; font-size: 14px; color: ${t.text};
      background: ${t.bgCard}; outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      -webkit-appearance: none;
    }
    .input-field::placeholder { color: ${t.textFaint}; }
    .input-field:focus {
      border-color: ${t.brand};
      box-shadow: 0 0 0 3px ${t.brandLight};
    }
    .input-field.valid {
      border-color: ${t.statusGreen};
      box-shadow: 0 0 0 3px ${t.statusGreenBg};
    }
    .input-field.invalid {
      border-color: ${t.statusRed};
      box-shadow: 0 0 0 3px ${t.statusRedBg};
    }

    .primary-btn {
      width: 100%; padding: 14px;
      background: ${t.brand}; color: #fff;
      border: none; border-radius: 13px;
      font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: background 0.13s, transform 0.1s, opacity 0.13s;
      box-shadow: 0 6px 20px rgba(193,125,47,0.32);
    }
    .primary-btn:hover:not(:disabled) { background: ${t.brandDim}; }
    .primary-btn:active:not(:disabled) { transform: scale(0.99); }
    .primary-btn:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }

    .google-btn {
      width: 100%; padding: 13px;
      background: ${t.bgCard}; color: ${t.text};
      border: 1.5px solid ${t.border}; border-radius: 13px;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      cursor: pointer; transition: border-color 0.13s, box-shadow 0.13s;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .google-btn:hover { border-color: ${t.borderStrong}; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }

    .text-link {
      background: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 13px;
      color: ${t.brand}; font-weight: 600; text-decoration: none;
    }
    .text-link:hover { color: ${t.brandDim}; }

    .fade-in { animation: fadeIn 0.22s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .slide-up { animation: slideUp 0.28s cubic-bezier(0.34,1.2,0.64,1); }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .divider {
      display: flex; align-items: center; gap: 10;
    }
    .divider-line {
      flex: 1; height: 1px; background: ${t.border};
    }
  `}</style>
);

// ─── GOOGLE ICON ──────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ─── EMAIL VALIDATION HINT ────────────────────────────────────────────────────
const EmailHint = ({ email, touched }) => {
  if (!touched || !email) return null;
  if (!isValidEmailShape(email)) return (
    <p style={{ fontSize: 12, color: t.statusRed, marginTop: 5 }}>
      Enter a valid email address
    </p>
  );
  if (!isBabcockEmail(email)) return (
    <p style={{ fontSize: 12, color: t.statusRed, marginTop: 5 }}>
      Only Babcock student emails are accepted — e.g. <strong>yourname@student.babcock.edu.ng</strong>
    </p>
  );
  return (
    <p style={{ fontSize: 12, color: t.statusGreen, marginTop: 5 }}>
      ✓ Valid Babcock email
    </p>
  );
};

const emailFieldClass = (email, touched) => {
  if (!touched || !email) return "input-field";
  if (!isValidEmailShape(email) || !isBabcockEmail(email)) return "input-field invalid";
  return "input-field valid";
};

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────────
const SplashScreen = ({ onGetStarted, onLogin }) => (
  <div className="fade-in" style={{
    display: "flex", flexDirection: "column",
    minHeight: 720, position: "relative", overflow: "hidden"
  }}>
    {/* Background pattern */}
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse at 60% 0%, ${t.brandLight} 0%, transparent 65%),
                   radial-gradient(ellipse at 10% 80%, rgba(193,125,47,0.08) 0%, transparent 60%)`,
    }} />

    {/* Decorative circles */}
    <div style={{
      position: "absolute", top: -40, right: -40,
      width: 180, height: 180, borderRadius: "50%",
      border: `1.5px solid ${t.border}`, opacity: 0.6
    }} />
    <div style={{
      position: "absolute", top: 20, right: 20,
      width: 80, height: 80, borderRadius: "50%",
      border: `1.5px solid ${t.brand}`, opacity: 0.2
    }} />

    {/* Content */}
    <div style={{ flex: 1, padding: "60px 24px 32px", display: "flex", flexDirection: "column", position: "relative" }}>

      {/* Logo mark */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          width: 52, height: 52, background: t.brand, borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 8px 24px rgba(193,125,47,0.35)`
        }}>
          <span className="sora" style={{ color: "#fff", fontSize: 26, fontWeight: 800 }}>L</span>
        </div>
      </div>

      {/* Headline */}
      <div style={{ marginBottom: "auto" }}>
        <h1 className="sora" style={{
          fontSize: 34, fontWeight: 800, color: t.text,
          lineHeight: 1.15, letterSpacing: -0.8, marginBottom: 16
        }}>
          Campus shops,<br />
          <span style={{ color: t.brand }}>ordered fast.</span>
        </h1>
        <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.65, maxWidth: 280 }}>
          Browse food, stationery, and essentials from shops on campus. Place an order, get a ticket, pick it up — no queues.
        </p>
      </div>

      {/* Feature chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
        {[
          { icon: "⚡", text: "Fast response" },
          { icon: "🎟️", text: "Order tickets" },
          { icon: "📍", text: "On campus" },
          { icon: "🔒", text: "Babcock only" },
        ].map(chip => (
          <div key={chip.text} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: t.bgCard, border: `1px solid ${t.border}`,
            borderRadius: 20, padding: "6px 12px",
            fontSize: 12, fontWeight: 500, color: t.textMuted
          }}>
            <span style={{ fontSize: 13 }}>{chip.icon}</span>
            {chip.text}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="primary-btn" onClick={onGetStarted}>
          Get started →
        </button>
        <button className="google-btn" onClick={onGetStarted}>
          <GoogleIcon />
          Continue with Google
        </button>
        <p style={{ textAlign: "center", fontSize: 13, color: t.textFaint, marginTop: 4 }}>
          Already have an account?{" "}
          <button className="text-link" onClick={onLogin}>Log in</button>
        </p>
      </div>
    </div>
  </div>
);

// ─── SIGN UP SCREEN ───────────────────────────────────────────────────────────
const SignUpScreen = ({ onLogin, onSuccess }) => {
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
    <div className="slide-up" style={{ padding: "20px 20px 32px", overflowY: "auto", maxHeight: 720 }}>

      {/* Back */}
      <button onClick={onLogin} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 5,
        fontSize: 13, color: t.textMuted, fontFamily: "'DM Sans', sans-serif",
        marginBottom: 24, padding: 0
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 className="sora" style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 5, letterSpacing: -0.3 }}>
          Create your account
        </h2>
        <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
          Only Babcock University student emails are accepted.
        </p>
      </div>

      {/* Google option */}
      {!googleClicked ? (
        <div style={{ marginBottom: 20 }}>
          <button className="google-btn" onClick={() => setGoogleClicked(true)}>
            <GoogleIcon />
            Sign up with Google
          </button>
        </div>
      ) : (
        <div className="slide-up" style={{
          background: t.bgCard, border: `1px solid ${t.border}`,
          borderRadius: 14, padding: "14px 16px", marginBottom: 20
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <GoogleIcon />
            <p style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Sign up with Google</p>
          </div>
          <p style={{ fontSize: 12, color: t.textMuted, marginBottom: 10, lineHeight: 1.5 }}>
            We'll verify your Babcock email before connecting your Google account.
          </p>
          <div style={{ marginBottom: 8 }}>
            <input
              className={emailFieldClass(googleEmail, googleEmailTouched)}
              placeholder="yourname@student.babcock.edu.ng"
              value={googleEmail}
              onChange={e => setGoogleEmail(e.target.value)}
              onBlur={() => setGoogleEmailTouched(true)}
              style={{ width: "100%" }}
            />
            <EmailHint email={googleEmail} touched={googleEmailTouched} />
          </div>
          {googleEmailValid && (
            <button className="primary-btn" style={{ marginTop: 4 }}>
              Continue with Google →
            </button>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="divider" style={{ marginBottom: 20, gap: 10 }}>
        <div className="divider-line" />
        <span style={{ fontSize: 12, color: t.textFaint, whiteSpace: "nowrap" }}>or sign up with email</span>
        <div className="divider-line" />
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>

        {/* Full name */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: "block", marginBottom: 6, letterSpacing: 0.3 }}>
            FULL NAME
          </label>
          <input
            className="input-field"
            placeholder="e.g. Obata Onyelukachukwu"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: "block", marginBottom: 6, letterSpacing: 0.3 }}>
            STUDENT EMAIL
          </label>
          <input
            className={emailFieldClass(email, emailTouched)}
            placeholder="yourname@student.babcock.edu.ng"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            type="email"
          />
          <EmailHint email={email} touched={emailTouched} />
        </div>

        {/* Password */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: "block", marginBottom: 6, letterSpacing: 0.3 }}>
            PASSWORD
          </label>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              placeholder="At least 6 characters"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 44 }}
            />
            <button onClick={() => setShowPassword(!showPassword)} style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: t.textFaint, fontSize: 16, padding: 0, lineHeight: 1
            }}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {password.length > 0 && password.length < 6 && (
            <p style={{ fontSize: 12, color: t.statusRed, marginTop: 5 }}>
              Password must be at least 6 characters
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button className="primary-btn" disabled={!canSubmit} onClick={onSuccess}>
        Create account →
      </button>

      {/* Terms */}
      <p style={{ fontSize: 11, color: t.textFaint, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
        By signing up you agree to Link3y's{" "}
        <button className="text-link" style={{ fontSize: 11 }}>Terms of Use</button>{" "}
        and{" "}
        <button className="text-link" style={{ fontSize: 11 }}>Privacy Policy</button>
      </p>

      {/* Switch to login */}
      <p style={{ textAlign: "center", fontSize: 13, color: t.textFaint, marginTop: 16 }}>
        Already have an account?{" "}
        <button className="text-link" onClick={onLogin}>Log in</button>
      </p>
    </div>
  );
};

// ─── LOG IN SCREEN ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onSignUp, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const emailValid = isValidEmailShape(email) && isBabcockEmail(email);
  const canSubmit = emailValid && password.length >= 6;

  return (
    <div className="slide-up" style={{ padding: "20px 20px 32px", overflowY: "auto", maxHeight: 720 }}>

      {/* Header */}
      <div style={{ marginBottom: 32, paddingTop: 12 }}>
        <div style={{
          width: 42, height: 42, background: t.brand, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20
        }}>
          <span className="sora" style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>L</span>
        </div>
        <h2 className="sora" style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 5, letterSpacing: -0.3 }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 13, color: t.textMuted }}>
          Log in to your Link3y account
        </p>
      </div>

      {/* Google */}
      <div style={{ marginBottom: 20 }}>
        <button className="google-btn">
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      {/* Divider */}
      <div className="divider" style={{ marginBottom: 20, gap: 10 }}>
        <div className="divider-line" />
        <span style={{ fontSize: 12, color: t.textFaint, whiteSpace: "nowrap" }}>or log in with email</span>
        <div className="divider-line" />
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: "block", marginBottom: 6, letterSpacing: 0.3 }}>
            STUDENT EMAIL
          </label>
          <input
            className={emailFieldClass(email, emailTouched)}
            placeholder="yourname@student.babcock.edu.ng"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            type="email"
          />
          <EmailHint email={email} touched={emailTouched} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, letterSpacing: 0.3 }}>
              PASSWORD
            </label>
            <button className="text-link" style={{ fontSize: 12 }}>Forgot password?</button>
          </div>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              placeholder="Your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 44 }}
            />
            <button onClick={() => setShowPassword(!showPassword)} style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: t.textFaint, fontSize: 16, padding: 0, lineHeight: 1
            }}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button className="primary-btn" disabled={!canSubmit} onClick={onSuccess}>
        Log in →
      </button>

      {/* Switch to signup */}
      <p style={{ textAlign: "center", fontSize: 13, color: t.textFaint, marginTop: 20 }}>
        Don't have an account?{" "}
        <button className="text-link" onClick={onSignUp}>Sign up</button>
      </p>
    </div>
  );
};

// ─── SUCCESS STATE ─────────────────────────────────────────────────────────────
const SuccessScreen = ({ isNewUser }) => (
  <div className="fade-in" style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", minHeight: 680, padding: "32px 24px", textAlign: "center"
  }}>
    <div style={{
      width: 72, height: 72, background: t.statusGreenBg, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 32, marginBottom: 20, border: `2px solid ${t.statusGreen}`
    }}>
      ✓
    </div>
    <h2 className="sora" style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 8, letterSpacing: -0.3 }}>
      {isNewUser ? "You're in!" : "Welcome back!"}
    </h2>
    <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.6, marginBottom: 32 }}>
      {isNewUser
        ? "Your account is set up. Start browsing shops on campus."
        : "Picking up where you left off."
      }
    </p>
    <button className="primary-btn" style={{ maxWidth: 280 }}>
      Browse shops →
    </button>
  </div>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AuthFlow() {
  const [screen, setScreen] = useState("splash");

  const screens = {
    splash: <SplashScreen onGetStarted={() => setScreen("signup")} onLogin={() => setScreen("login")} />,
    signup: <SignUpScreen onLogin={() => setScreen("login")} onSuccess={() => setScreen("success_new")} />,
    login:  <LoginScreen onSignUp={() => setScreen("signup")} onSuccess={() => setScreen("success_return")} />,
    success_new:    <SuccessScreen isNewUser={true} />,
    success_return: <SuccessScreen isNewUser={false} />,
  };

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
          <div style={{
            background: screen === "splash" ? t.bg : t.bg,
            padding: "12px 20px 6px", display: "flex", justifyContent: "space-between"
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>9:41</span>
            <span style={{ fontSize: 11, color: t.textFaint }}>●●●● WiFi 🔋</span>
          </div>

          {screens[screen]}
        </div>

        {/* Annotations */}
        <div style={{ maxWidth: 260, paddingTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Screen nav */}
          <div>
            <p className="sora" style={{ fontWeight: 700, fontSize: 15, color: "#1C1A17", marginBottom: 8 }}>
              Auth Flow
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[
                { key: "splash", label: "Splash" },
                { key: "signup", label: "Sign Up" },
                { key: "login",  label: "Log In" },
                { key: "success_new", label: "Success" },
              ].map(s => (
                <button key={s.key} onClick={() => setScreen(s.key)} style={{
                  padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: screen === s.key ? 600 : 400,
                  background: screen === s.key ? "#1C1A17" : "#fff",
                  color: screen === s.key ? "#fff" : "#6B6560",
                  fontFamily: "'DM Sans', sans-serif",
                  border: `1px solid ${screen === s.key ? "#1C1A17" : "#EAE7E1"}`
                }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {[
            { label: "Splash — sets the tone", note: "The first thing a student sees. Headline, feature chips, and two paths: Google or email. The '🔒 Babcock only' chip is doing quiet but important work — it signals exclusivity and trust before they even tap anything." },
            { label: "Email domain validation — live", note: "Try typing a non-Babcock email on the Sign Up or Log In screen. It rejects in real time with a clear message showing the exact format expected. No ambiguity." },
            { label: "Google path — guarded", note: "Clicking 'Sign up with Google' doesn't jump straight to OAuth. It first collects and validates their Babcock email. The Google connection only proceeds after that passes. Same rules, different entry point." },
            { label: "Submit button disabled until valid", note: "The 'Create account' and 'Log in' buttons are greyed out and non-clickable until all fields pass validation. Students can't accidentally submit broken data." },
            { label: "Password visibility toggle", note: "Small eye icon on the password field. Students on mobile especially tend to make typos — this reduces failed login frustration." },
            { label: "Vendor and admin login", note: "Vendor and admin auth uses a separate entry point (not this screen). They log in via a link Antigravity will implement. This screen is students only — keep it clean and focused." },
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
