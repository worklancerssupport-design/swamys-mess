import { useState } from "react";

const ENV = import.meta.env;

export default function Login({ onAuthed }: { onAuthed: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (user !== ENV.VITE_ADMIN_USERNAME || pass !== ENV.VITE_ADMIN_PASSWORD)
      return setErr("Invalid credentials");
    setLoading(true);
    onAuthed();
  }

  return (
    <>
      <style>{`
.login{min-height:100vh;background:linear-gradient(180deg,#fafaf9 0%,#f5f5f4 100%);display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui,-apple-system,sans-serif}
.login-card{width:100%;max-width:380px;background:#fff;border-radius:16px;padding:40px 32px;border:1px solid #e7e5e4;box-shadow:0 1px 2px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.04)}
.login-mark{width:36px;height:36px;border-radius:8px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;margin-bottom:24px;letter-spacing:-.5px}
.login-title{font-size:22px;font-weight:600;color:#0f172a;margin:0;letter-spacing:-.4px}
.login-sub{font-size:13px;color:#78716c;margin:4px 0 28px}
.login-form{display:flex;flex-direction:column;gap:12px}
.login-input{height:42px;padding:0 14px;border:1px solid #e7e5e4;border-radius:10px;font-size:14px;font-family:inherit;background:#fff;color:#0f172a;outline:none;transition:border-color .15s,box-shadow .15s}
.login-input:focus{border-color:#0f172a;box-shadow:0 0 0 3px rgba(15,23,42,.06)}
.login-input::placeholder{color:#a8a29e}
.login-err{font-size:13px;color:#dc2626;background:#fef2f2;padding:10px 12px;border-radius:8px;border:1px solid #fecaca}
.login-btn{height:42px;background:#0f172a;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s;margin-top:4px}
.login-btn:hover:not(:disabled){background:#1e293b}
.login-btn:disabled{opacity:.6;cursor:not-allowed}
      `}</style>
      <div className="login">
        <div className="login-card">
          <div className="login-mark">SM</div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-sub">Sign in to manage your menu</p>
          <form onSubmit={submit} className="login-form">
            <input className="login-input" type="text" placeholder="Username" autoFocus value={user} onChange={(e) => setUser(e.target.value)} />
            <input className="login-input" type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
            {err && <div className="login-err">{err}</div>}
            <button className="login-btn" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
