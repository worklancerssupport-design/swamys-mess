import { useEffect, useMemo, useRef, useState } from "react";
import { Reorder } from "motion/react";
import { useImageUpload } from "./ImageWidget";

const ENV = import.meta.env;
const HEADERS = {
  Authorization: `Bearer ${ENV.VITE_GITHUB_PAT}`,
  Accept: "application/vnd.github.v3+json",
};
const FILE_URL = `https://api.github.com/repos/${ENV.VITE_GITHUB_OWNER}/${ENV.VITE_GITHUB_REPO}/contents/${ENV.VITE_GITHUB_FILE_PATH}`;

interface Item {
  id: string;
  category: string;
  item: string;
  price: string;
  image_url: string;
}

const uid = () =>
  crypto.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

async function load(): Promise<{ items: Item[]; sha: string } | null> {
  const r = await fetch(`${FILE_URL}?ref=${ENV.VITE_GITHUB_BRANCH}`, { headers: HEADERS });
  if (!r.ok) return null;
  const d = await r.json();
  return { items: JSON.parse(atob(d.content.replace(/\n/g, ""))), sha: d.sha };
}

async function save(items: Item[], sha: string): Promise<string | null> {
  const r = await fetch(FILE_URL, {
    method: "PUT",
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Update menu data via console",
      content: btoa(unescape(encodeURIComponent(JSON.stringify(items, null, 2)))),
      sha,
      branch: ENV.VITE_GITHUB_BRANCH,
    }),
  });
  return r.ok ? ((await r.json()).content.sha as string) : null;
}

export default function Console() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [cats, setCats] = useState<{ name: string; items: Item[] }[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [active, setActive] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const sideNames = useMemo(() => cats.map((c) => c.name), [cats]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const tick = () => {
      const secs = el.querySelectorAll<HTMLElement>("[data-section]");
      let best = "";
      let bestTop = Infinity;
      secs.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= 120 && r.top > -r.height + 60 && r.top < bestTop) {
          bestTop = r.top;
          best = s.dataset.section || "";
        }
      });
      setActive(best);
    };
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (user !== ENV.VITE_ADMIN_USERNAME || pass !== ENV.VITE_ADMIN_PASSWORD) return setErr("Invalid credentials");
    setAuthed(true);
    setLoading(true);
    const r = await load();
    if (r) {
      const map = new Map<string, Item[]>();
      for (const it of r.items) {
        if (!map.has(it.category)) map.set(it.category, []);
        map.get(it.category)!.push(it);
      }
      setCats(Array.from(map, ([name, items]) => ({ name, items })));
      setSha(r.sha);
    }
    setLoading(false);
  }

  async function publish() {
    setSaving(true);
    const s = await save(cats.flatMap((c) => c.items), sha);
    setSaving(false);
    if (s) {
      setSha(s);
      flash("Published");
      setTimeout(() => setAuthed(false), 1800);
    } else flash("Publish failed");
  }

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function setCategoryItems(name: string, next: Item[]) {
    setCats((p) => p.map((c) => (c.name === name ? { ...c, items: next } : c)));
  }

  function reorderCats(next: string[]) {
    setCats((p) => {
      const m = new Map(p.map((c) => [c.name, c]));
      return next.map((n) => m.get(n)!);
    });
  }

  function jumpTo(name: string) {
    setActive(name);
    document.getElementById(`sec-${CSS.escape(name)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  }

  function updateItem(id: string, field: keyof Item, value: string) {
    setCats((p) => p.map((c) => ({ ...c, items: c.items.map((it) => (it.id === id ? { ...it, [field]: value } : it)) })));
  }

  function removeItem(id: string) {
    setCats((p) => p.map((c) => ({ ...c, items: c.items.filter((it) => it.id !== id) })));
  }

  function removeCategory(name: string) {
    if (!confirm(`Delete "${name}" and all its items?`)) return;
    setCats((p) => p.filter((c) => c.name !== name));
  }

  function renameCategory(name: string) {
    const next = prompt(`Rename "${name}" to:`, name);
    if (!next || next.trim() === name) return;
    const v = next.trim();
    setCats((p) =>
      p.map((c) =>
        c.name === name
          ? { name: v, items: c.items.map((it) => ({ ...it, category: v })) }
          : { ...c, items: c.items.map((it) => (it.category === name ? { ...it, category: v } : it)) },
      ),
    );
  }

  function addItem(name: string) {
    const it: Item = { id: uid(), category: name, item: "New item", price: "0", image_url: "" };
    setCats((p) => p.map((c) => (c.name === name ? { ...c, items: [...c.items, it] } : c)));
  }

  function addCategory() {
    const name = prompt("New category name:");
    if (!name) return;
    const v = name.trim();
    setCats((p) => [...p, { name: v, items: [{ id: uid(), category: v, item: "New item", price: "0", image_url: "" }] }]);
  }

  if (!authed) {
    return (
      <>
        <Styles />
        <div className="login">
          <div className="login-card">
            <div className="login-mark">SM</div>
            <h1 className="login-title">Welcome back</h1>
            <p className="login-sub">Sign in to manage your menu</p>
            <form onSubmit={login} className="login-form">
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

  return (
    <div className="app">
      <Styles />
      <header className="header">
        <div className="header-left">
          <button className="burger" onClick={() => setNavOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <h1 className="brand">Swamy's Mess — Admin</h1>
        </div>
        <div className="header-right">
          <button className="btn" disabled={saving} onClick={publish}>{saving ? "Saving…" : "Save"}</button>
          <button className="ghost" onClick={() => { setCats([]); setAuthed(false); }}>Logout</button>
        </div>
      </header>
      <div className={`backdrop ${navOpen ? "open" : ""}`} onClick={() => setNavOpen(false)} />
      <div className="layout">
        <aside className={`sidebar ${navOpen ? "open" : ""}`}>
          <div className="side-head">Categories <span className="side-head-n">{cats.length}</span></div>
          {cats.length === 0 ? (
            <div className="side-empty">No categories yet</div>
          ) : (
            <Reorder.Group axis="y" values={sideNames} onReorder={reorderCats} className="side-list">
              {cats.map((c) => (
                <Reorder.Item
                  key={c.name}
                  value={c.name}
                  onClick={() => jumpTo(c.name)}
                  whileDrag={{ scale: 1.03, boxShadow: "0 8px 20px rgba(15,23,42,0.18)" }}
                  className={`side-row${active === c.name ? " active" : ""}`}
                >
                  <span className="side-name">{c.name}</span>
                  <span className="side-count">{c.items.length}</span>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
          <button onClick={addCategory} className="side-add">+ Add category</button>
        </aside>
        <div className="content">
          <main className="main" ref={mainRef}>
            {loading ? (
              <p className="muted">Loading…</p>
            ) : (
              cats.map((c) => (
                <section key={c.name} data-section={c.name} id={`sec-${CSS.escape(c.name)}`} className="section">
                  <div className="section-head">
                    <h2 className="h2">{c.name}<span className="count">{c.items.length}</span></h2>
                    <div className="row">
                      <button className="icon-btn" onClick={() => renameCategory(c.name)} aria-label="Rename">✎</button>
                      <button className="icon-btn danger" onClick={() => removeCategory(c.name)} aria-label="Delete">×</button>
                    </div>
                  </div>
                  <Reorder.Group axis="xy" values={c.items} onReorder={(next) => setCategoryItems(c.name, next)} className="grid">
                    {c.items.map((it) => (
                      <Card key={it.id} item={it} onUpdate={updateItem} onDelete={removeItem} />
                    ))}
                    <button onClick={() => addItem(c.name)} className="add-item">+ Add item</button>
                  </Reorder.Group>
                </section>
              ))
            )}
          </main>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Card({
  item,
  onUpdate,
  onDelete,
}: {
  item: Item;
  onUpdate: (id: string, field: keyof Item, value: string) => void;
  onDelete: (id: string) => void;
}) {
  const [edit, setEdit] = useState<"" | "name" | "price">("");
  const [draft, setDraft] = useState("");
  const [imgErr, setImgErr] = useState(false);
  const openWidget = useImageUpload();

  function start(field: "name" | "price") {
    setDraft(field === "price" ? item.price : item.item);
    setEdit(field);
  }
  function commit() {
    if (!edit) return;
    onUpdate(item.id, edit === "name" ? "item" : "price", edit === "price" ? draft.trim() || "0" : draft.trim());
    setEdit("");
  }
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <Reorder.Item
      value={item}
      className="card"
      whileDrag={{ scale: 1.04, zIndex: 10, boxShadow: "0 16px 36px rgba(15,23,42,0.28)" }}
    >
      <div className="card-img">
        {item.image_url && !imgErr ? (
          <img src={item.image_url} alt="" draggable={false} onError={() => setImgErr(true)} className="card-img-el" />
        ) : (
          <div className="card-img-ph">no image</div>
        )}
        <button onPointerDown={stop} onClick={() => openWidget((url) => onUpdate(item.id, "image_url", url))} className="card-edit" aria-label="Edit image">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>
      <div className="card-body">
        {edit === "name" ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") setEdit(""); }}
            onPointerDown={stop}
            className="card-input name-input"
          />
        ) : (
          <div onDoubleClick={() => start("name")} onPointerDown={stop} className="card-name">{item.item || "Untitled"}</div>
        )}
        {edit === "price" ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/[^\d.]/g, ""))}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") setEdit(""); }}
            onPointerDown={stop}
            inputMode="decimal"
            className="card-input price-input"
          />
        ) : (
          <div onDoubleClick={() => start("price")} onPointerDown={stop} className="card-price">
            <span className="rupee">₹</span>{item.price || "0"}
          </div>
        )}
      </div>
      <button onPointerDown={stop} onClick={() => onDelete(item.id)} className="card-del" aria-label="Delete item">×</button>
    </Reorder.Item>
  );
}

function Styles() {
  return (
    <style>{`
*{box-sizing:border-box;margin:0;padding:0}
.app{min-height:100vh;background:#fafaf7;color:#0f172a;font-family:system-ui,-apple-system,sans-serif}
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
.btn{background:#0f172a;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}
.ghost{background:transparent;color:#475569;border:1px solid #e2e8f0;padding:10px 14px;border-radius:8px;font-size:14px;cursor:pointer}
.muted{color:#64748b}
.header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.9);backdrop-filter:blur(8px);border-bottom:1px solid #e5e7eb;padding:12px 20px;display:flex;justify-content:space-between;align-items:center}
.header-left{display:flex;align-items:center;gap:10px}
.header-right{display:flex;gap:8px}
.brand{margin:0;font-size:16px;font-weight:700}
.burger{display:none;align-items:center;justify-content:center;width:36px;height:36px;border:none;background:transparent;border-radius:8px;cursor:pointer;color:#0f172a}
.burger:hover{background:#f1f5f9}
.layout{display:flex}
.sidebar{position:sticky;top:60px;align-self:flex-start;width:240px;flex-shrink:0;border-right:1px solid #e5e7eb;background:#fff;padding:18px 12px;height:calc(100vh - 60px);overflow-y:auto}
.content{flex:1;min-width:0}
.backdrop{display:none}
.side-head{font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:#94a3b8;padding:0 10px 10px;display:flex;align-items:center;gap:8px}
.side-head-n{background:#f1f5f9;color:#64748b;padding:2px 8px;border-radius:999px;font-size:10px}
.side-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.side-row{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:8px;cursor:grab;color:#334155;font-size:14px;font-weight:500;user-select:none;transition:background .15s,color .15s}
.side-row:hover{background:#f8fafc}
.side-row.active{background:#0f172a;color:#fff}
.side-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}
.side-count{background:rgba(148,163,184,.2);color:inherit;padding:1px 8px;border-radius:999px;font-size:11px;font-weight:600;flex-shrink:0;margin-left:8px}
.side-empty{padding:20px 12px;text-align:center;color:#94a3b8;font-size:13px}
.side-add{width:100%;margin-top:16px;padding:10px 12px;border:1px dashed #cbd5e1;background:transparent;color:#475569;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer}
.main{max-width:1100px;margin:0 auto;padding:20px 16px 80px}
.section{margin-bottom:36px}
.section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;gap:8px}
.h2{margin:0;font-size:22px;font-weight:700;text-transform:capitalize;display:flex;align-items:center;gap:8px}
.count{background:#e2e8f0;color:#475569;font-size:12px;font-weight:600;padding:2px 10px;border-radius:999px}
.row{display:flex;gap:2px}
.icon-btn{width:28px;height:28px;border:none;background:transparent;border-radius:6px;cursor:pointer;font-size:14px;color:#475569;display:flex;align-items:center;justify-content:center}
.icon-btn:hover{background:#f1f5f9}
.icon-btn.danger{color:#b91c1c}
.icon-btn.danger:hover{background:#fef2f2}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.card{background:#fff;border:1px solid #eef0f3;border-radius:16px;overflow:hidden;position:relative;display:flex;flex-direction:column;cursor:grab}
.card-img{position:relative;width:100%;height:180px;background:linear-gradient(135deg,#fef3c7,#fde68a);overflow:hidden;flex-shrink:0}
.card-img-el{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.card-img-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#a16207;font-size:12px;font-weight:500}
.card-body{padding:12px 14px;display:flex;align-items:center;gap:12px;flex:1}
.card-name{flex:3;min-width:0;font-size:15px;font-weight:500;line-height:1.35;cursor:text;padding:6px 8px;border-radius:6px;margin:-6px -8px;touch-action:manipulation;word-break:break-word}
.card-price{flex:1;min-width:0;font-size:19px;font-weight:700;text-align:right;cursor:text;padding:6px 8px;border-radius:6px;margin:-6px -8px;touch-action:manipulation}
.rupee{font-size:13px;color:#64748b;margin-right:2px}
.card-input{border:1px solid #94a3b8;border-radius:6px;outline:none;font-family:inherit;box-shadow:0 0 0 3px rgba(79,70,229,.12)}
.name-input{flex:3;min-width:0;font-size:15px;padding:6px 8px;margin:-6px -8px}
.price-input{flex:1;min-width:0;font-size:19px;font-weight:700;text-align:right;padding:6px 8px;margin:-6px -8px}
.card-del{position:absolute;top:8px;right:8px;width:28px;height:28px;border:none;border-radius:8px;background:rgba(15,23,42,.75);color:#fff;cursor:pointer;font-size:16px;line-height:1}
.card-edit{position:absolute;top:8px;left:8px;width:28px;height:28px;border:none;border-radius:8px;background:rgba(15,23,42,.75);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.card-edit:hover{background:rgba(15,23,42,.9)}
.add-item{border:2px dashed #cbd5e1;background:transparent;color:#64748b;border-radius:14px;font-size:14px;cursor:pointer;min-height:100px}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#0f766e;color:#fff;padding:10px 18px;border-radius:999px;font-size:14px;box-shadow:0 6px 24px rgba(0,0,0,.2);z-index:100}
@media(max-width:768px){
  .burger{display:flex}
  .sidebar{position:fixed;top:0;left:0;bottom:0;height:100vh;width:280px;z-index:100;transform:translateX(-100%);transition:transform .25s cubic-bezier(.4,0,.2,1);box-shadow:2px 0 16px rgba(15,23,42,.08)}
  .sidebar.open{transform:translateX(0)}
  .backdrop.open{display:block;position:fixed;inset:0;background:rgba(15,23,42,.35);z-index:99;backdrop-filter:blur(2px)}
}
    `}</style>
  );
}
