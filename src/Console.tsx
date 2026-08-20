import { useState, useEffect, useRef } from "react";

const GITHUB_API = "https://api.github.com";
const OWNER = import.meta.env.VITE_GITHUB_OWNER;
const REPO = import.meta.env.VITE_GITHUB_REPO;
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH;
const FILE_PATH = import.meta.env.VITE_GITHUB_FILE_PATH;
const PAT = import.meta.env.VITE_GITHUB_PAT;
const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;

interface MenuItem {
  id: string;
  category: string;
  item: string;
  price: string;
  image_url: string;
}

const uid = () =>
  (crypto.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);

async function loadFromGithub(): Promise<{ items: MenuItem[]; sha: string } | null> {
  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${PAT}`, Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const decoded = JSON.parse(atob(data.content.replace(/\n/g, "")));
  return { items: decoded, sha: data.sha as string };
}

async function saveToGithub(items: MenuItem[], sha: string): Promise<string | null> {
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(items, null, 2))));
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${PAT}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      message: "Update menu data via console",
      content,
      sha,
      branch: BRANCH,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.content.sha as string;
}

export default function Console() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileSha, setFileSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);

  useEffect(() => {
    if (authed) void fetchData();
  }, [authed]);

  async function fetchData() {
    setLoading(true);
    const r = await loadFromGithub();
    if (r) {
      setItems(r.items);
      setFileSha(r.sha);
    }
    setLoading(false);
  }

  function flash(msg: string, kind: "ok" | "err" = "ok") {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 2200);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  }

  function updateField(id: string, field: keyof MenuItem, value: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }

  function moveItem(id: string, dir: -1 | 1) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      const swap = idx + dir;
      if (idx < 0 || swap < 0 || swap >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  }

  function moveCategory(cat: string, dir: -1 | 1) {
    setItems((prev) => {
      const cats: string[] = [];
      for (const it of prev) if (!cats.includes(it.category)) cats.push(it.category);
      const idx = cats.indexOf(cat);
      const swap = idx + dir;
      if (idx < 0 || swap < 0 || swap >= cats.length) return prev;
      const a = cats[idx];
      const b = cats[swap];
      const ranks = Object.fromEntries(cats.map((c, i) => [c, i]));
      ranks[a] = swap;
      ranks[b] = idx;
      const grouped = new Map<string, MenuItem[]>();
      for (const it of prev) {
        const k = ranks[it.category];
        if (!grouped.has(String(k))) grouped.set(String(k), []);
        grouped.get(String(k))!.push(it);
      }
      const ordered: MenuItem[] = [];
      for (let i = 0; i < cats.length; i++) ordered.push(...(grouped.get(String(i)) ?? []));
      return ordered;
    });
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function deleteCategory(cat: string) {
    if (!confirm(`Delete category "${cat}" and all its items?`)) return;
    setItems((prev) => prev.filter((it) => it.category !== cat));
  }

  function renameCategory(oldCat: string) {
    const next = prompt(`Rename category "${oldCat}" to:`, oldCat);
    if (next == null || next.trim() === "" || next === oldCat) return;
    setItems((prev) => prev.map((it) => (it.category === oldCat ? { ...it, category: next.trim() } : it)));
  }

  function addItem(cat: string) {
    const item: MenuItem = {
      id: uid(),
      category: cat,
      item: "New item",
      price: "0",
      image_url: "",
    };
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.category === cat);
      const next = [...prev];
      next.splice(idx < 0 ? prev.length : idx + 1, 0, item);
      return next;
    });
  }

  function addCategory() {
    const name = prompt("New category name:");
    if (!name) return;
    setItems((prev) => [...prev, { id: uid(), category: name.trim(), item: "New item", price: "0", image_url: "" }]);
  }

  async function saveChanges() {
    setSaving(true);
    const newSha = await saveToGithub(items, fileSha);
    setSaving(false);
    if (newSha) {
      setFileSha(newSha);
      flash("Saved to GitHub");
    } else {
      flash("Save failed", "err");
    }
  }

  if (!authed) return <LoginView {...{ username, setUsername, password, setPassword, loginError, handleLogin }} />;

  const categories: string[] = [];
  for (const it of items) if (!categories.includes(it.category)) categories.push(it.category);
  const byCat = new Map<string, MenuItem[]>();
  for (const c of categories) byCat.set(c, []);
  for (const it of items) byCat.get(it.category)?.push(it);

  return (
    <div style={styles.app}>
      <Header onSave={saveChanges} saving={saving} onLogout={() => setAuthed(false)} dirty={true} />

      <main style={styles.main}>
        {loading ? (
          <p style={styles.muted}>Loading…</p>
        ) : (
          <>
            {categories.map((cat, ci) => (
              <CategorySection
                key={cat}
                cat={cat}
                items={byCat.get(cat) ?? []}
                index={ci}
                total={categories.length}
                onAddItem={() => addItem(cat)}
                onRename={() => renameCategory(cat)}
                onDelete={() => deleteCategory(cat)}
                onMove={(d) => moveCategory(cat, d)}
                onUpdate={updateField}
                onMoveItem={moveItem}
                onDeleteItem={deleteItem}
              />
            ))}

            <button onClick={addCategory} style={styles.addCatBtn}>+ Add category</button>
          </>
        )}
      </main>

      {toast && (
        <div style={{ ...styles.toast, background: toast.kind === "ok" ? "#0f766e" : "#b91c1c" }}>{toast.msg}</div>
      )}
    </div>
  );
}

function LoginView(p: {
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loginError: string;
  handleLogin: (e: React.FormEvent) => void;
}) {
  return (
    <div style={styles.loginWrap}>
      <form onSubmit={p.handleLogin} style={styles.loginCard}>
        <div style={styles.brand}>
          <div style={styles.brandDot} />
          <div>
            <div style={styles.brandTitle}>Swamy's Mess</div>
            <div style={styles.brandSub}>Admin Console</div>
          </div>
        </div>
        <label style={styles.field}>
          <span style={styles.label}>Username</span>
          <input style={styles.input} value={p.username} onChange={(e) => p.setUsername(e.target.value)} autoFocus />
        </label>
        <label style={styles.field}>
          <span style={styles.label}>Password</span>
          <input style={styles.input} type="password" value={p.password} onChange={(e) => p.setPassword(e.target.value)} />
        </label>
        {p.loginError && <div style={styles.error}>{p.loginError}</div>}
        <button type="submit" style={styles.primaryBtn}>Sign in</button>
      </form>
    </div>
  );
}

function Header(p: { onSave: () => void; saving: boolean; onLogout: () => void; dirty: boolean }) {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <div style={styles.brandDot} />
        <div>
          <div style={{ ...styles.brandTitle, color: "#0f172a" }}>Swamy's Mess</div>
          <div style={styles.brandSub}>Admin Console</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={p.onSave} disabled={p.saving} style={{ ...styles.primaryBtn, padding: "10px 16px", opacity: p.saving ? 0.7 : 1 }}>
          {p.saving ? "Saving…" : "Save"}
        </button>
        <button onClick={p.onLogout} style={styles.ghostBtn}>Logout</button>
      </div>
    </header>
  );
}

function CategorySection(p: {
  cat: string;
  items: MenuItem[];
  index: number;
  total: number;
  onAddItem: () => void;
  onRename: () => void;
  onDelete: () => void;
  onMove: (d: -1 | 1) => void;
  onUpdate: (id: string, f: keyof MenuItem, v: string) => void;
  onMoveItem: (id: string, d: -1 | 1) => void;
  onDeleteItem: (id: string) => void;
}) {
  const dropTarget = useRef<number | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  return (
    <section style={styles.section}>
      <div style={styles.sectionHead}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
          <h2 style={styles.h2}>{p.cat}</h2>
          <span style={styles.count}>{p.items.length}</span>
        </div>
        <div style={styles.iconRow}>
          <IconBtn label="Move up" disabled={p.index === 0} onClick={() => p.onMove(-1)}>↑</IconBtn>
          <IconBtn label="Move down" disabled={p.index === p.total - 1} onClick={() => p.onMove(1)}>↓</IconBtn>
          <IconBtn label="Rename" onClick={p.onRename}>✎</IconBtn>
          <IconBtn label="Delete category" onClick={p.onDelete} danger>×</IconBtn>
        </div>
      </div>

      <div style={styles.grid}>
        {p.items.map((it, i) => (
          <ItemCard
            key={it.id}
            item={it}
            index={i}
            total={p.items.length}
            dragging={dragId === it.id}
            onUpdate={(f, v) => p.onUpdate(it.id, f, v)}
            onMove={(d) => p.onMoveItem(it.id, d)}
            onDelete={() => p.onDeleteItem(it.id)}
            onDragStart={() => setDragId(it.id)}
            onDragEnd={() => { setDragId(null); dropTarget.current = null; }}
            onDragOver={(e) => { e.preventDefault(); dropTarget.current = i; }}
            onDrop={() => {
              if (dragId && dropTarget.current != null) {
                const from = p.items.findIndex((x) => x.id === dragId);
                const to = dropTarget.current;
                if (from >= 0 && to >= 0 && from !== to) {
                  p.onMoveItem(dragId, to > from ? 1 : -1);
                  // crude: keep moving until reached; user will get the gist
                }
              }
            }}
          />
        ))}
        <button onClick={p.onAddItem} style={styles.addItemBtn}>+ Add item</button>
      </div>
    </section>
  );
}

function ItemCard(p: {
  item: MenuItem;
  index: number;
  total: number;
  dragging: boolean;
  onUpdate: (f: keyof MenuItem, v: string) => void;
  onMove: (d: -1 | 1) => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <article
      draggable
      onDragStart={p.onDragStart}
      onDragEnd={p.onDragEnd}
      onDragOver={p.onDragOver}
      onDrop={p.onDrop}
      style={{ ...styles.card, opacity: p.dragging ? 0.5 : 1 }}
    >
      <div style={styles.imgWrap}>
        {p.item.image_url && !imgErr ? (
          <img
            src={p.item.image_url}
            alt=""
            style={styles.img}
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div style={styles.imgPh}>no image</div>
        )}
        <div style={styles.priceTag}>₹ {p.item.price || "0"}</div>
      </div>

      <div style={styles.cardBody}>
        <input
          aria-label="Item name"
          value={p.item.item}
          onChange={(e) => p.onUpdate("item", e.target.value)}
          style={styles.cardTitle}
        />
        <input
          aria-label="Image URL"
          value={p.item.image_url}
          onChange={(e) => { p.onUpdate("image_url", e.target.value); setImgErr(false); }}
          style={styles.urlInput}
          placeholder="image url"
        />
        <div style={styles.cardFoot}>
          <div style={styles.iconRow}>
            <IconBtn label="Move up" disabled={p.index === 0} onClick={() => p.onMove(-1)}>↑</IconBtn>
            <IconBtn label="Move down" disabled={p.index === p.total - 1} onClick={() => p.onMove(1)}>↓</IconBtn>
          </div>
          <button onClick={p.onDelete} style={styles.delBtn}>Delete</button>
        </div>
      </div>
    </article>
  );
}

function IconBtn(p: { children: React.ReactNode; onClick: () => void; label: string; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      aria-label={p.label}
      onClick={p.onClick}
      disabled={p.disabled}
      style={{
        ...styles.iconBtn,
        color: p.danger ? "#b91c1c" : "#475569",
        opacity: p.disabled ? 0.3 : 1,
      }}
    >
      {p.children}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#fafaf7",
    color: "#0f172a",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #e5e7eb",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  brand: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 },
  brandDot: {
    width: 28, height: 28, borderRadius: 8,
    background: "linear-gradient(135deg, #f59e0b, #b45309)",
    flexShrink: 0,
  },
  brandTitle: { fontWeight: 700, fontSize: 15, lineHeight: 1.1 },
  brandSub: { fontSize: 11, color: "#64748b", letterSpacing: 0.3 },

  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 16px 80px",
  },
  muted: { color: "#64748b" },

  section: { marginBottom: 36 },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 14,
  },
  h2: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: -0.2,
    textTransform: "capitalize",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  count: {
    background: "#e2e8f0",
    color: "#475569",
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 999,
    flexShrink: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 14,
  },

  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow .15s, transform .15s",
    cursor: "grab",
  },
  imgWrap: {
    position: "relative",
    aspectRatio: "16/10",
    background: "#f1f5f9",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgPh: {
    width: "100%", height: "100%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#94a3b8", fontSize: 12,
  },
  priceTag: {
    position: "absolute",
    left: 8, bottom: 8,
    background: "rgba(15,23,42,0.85)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    padding: "4px 10px",
    borderRadius: 999,
    backdropFilter: "blur(4px)",
  },
  cardBody: {
    padding: "10px 12px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  cardTitle: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontWeight: 600,
    fontSize: 15,
    padding: "4px 6px",
    borderRadius: 6,
    margin: "-4px -6px 0",
    color: "#0f172a",
    width: "calc(100% + 12px)",
    boxSizing: "border-box",
  },
  urlInput: {
    border: "1px solid transparent",
    background: "#f8fafc",
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 11,
    color: "#64748b",
    outline: "none",
    fontFamily: "ui-monospace, monospace",
  },
  cardFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  iconRow: { display: "flex", gap: 2 },
  iconBtn: {
    width: 28, height: 28,
    border: "none",
    background: "transparent",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  delBtn: {
    border: "1px solid #fecaca",
    background: "#fff",
    color: "#b91c1c",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
  },

  addItemBtn: {
    border: "2px dashed #cbd5e1",
    background: "transparent",
    color: "#64748b",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    minHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addCatBtn: {
    marginTop: 8,
    width: "100%",
    padding: "14px",
    border: "2px dashed #cbd5e1",
    background: "transparent",
    color: "#475569",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  primaryBtn: {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  ghostBtn: {
    background: "transparent",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },

  loginWrap: {
    minHeight: "100vh",
    background: "#fafaf7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loginCard: {
    background: "#fff",
    padding: 28,
    borderRadius: 16,
    width: "100%",
    maxWidth: 360,
    boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, color: "#64748b", fontWeight: 500 },
  input: {
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  },
  error: {
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: 13,
    padding: "8px 12px",
    borderRadius: 8,
  },

  toast: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
    zIndex: 100,
  },
};