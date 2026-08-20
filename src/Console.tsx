import { useState } from "react";
import { Reorder } from "motion/react";

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

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (user !== ENV.VITE_ADMIN_USERNAME || pass !== ENV.VITE_ADMIN_PASSWORD) {
      return setErr("Invalid credentials");
    }
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
    const flat = cats.flatMap((c) => c.items);
    const s = await save(flat, sha);
    setSaving(false);
    if (s) {
      setSha(s);
      flash("Published");
      setTimeout(() => setAuthed(false), 1800);
    } else {
      flash("Publish failed");
    }
  }

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function setCategoryOrder(name: string, next: Item[]) {
    setCats((prev) => prev.map((c) => (c.name === name ? { ...c, items: next } : c)));
  }

  function updateItem(id: string, field: keyof Item, value: string) {
    setCats((prev) =>
      prev.map((c) => ({
        ...c,
        items: c.items.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
      })),
    );
  }

  function removeItem(id: string) {
    setCats((prev) => prev.map((c) => ({ ...c, items: c.items.filter((it) => it.id !== id) })));
  }

  function removeCategory(name: string) {
    if (!confirm(`Delete "${name}" and all its items?`)) return;
    setCats((prev) => prev.filter((c) => c.name !== name));
  }

  function renameCategory(name: string) {
    const next = prompt(`Rename "${name}" to:`, name);
    if (!next || next.trim() === name) return;
    const v = next.trim();
    setCats((prev) =>
      prev.map((c) =>
        c.name === name
          ? { name: v, items: c.items.map((it) => ({ ...it, category: v })) }
          : { ...c, items: c.items.map((it) => (it.category === name ? { ...it, category: v } : it)) },
      ),
    );
  }

  function moveCategory(name: string, dir: -1 | 1) {
    setCats((prev) => {
      const i = prev.findIndex((c) => c.name === name);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function addItem(name: string) {
    const newItem: Item = { id: uid(), category: name, item: "New item", price: "0", image_url: "" };
    setCats((prev) => prev.map((c) => (c.name === name ? { ...c, items: [...c.items, newItem] } : c)));
  }

  function addCategory() {
    const name = prompt("New category name:");
    if (!name) return;
    const v = name.trim();
    setCats((prev) => [
      ...prev,
      {
        name: v,
        items: [{ id: uid(), category: v, item: "New item", price: "0", image_url: "" }],
      },
    ]);
  }

  if (!authed) {
    return (
      <div style={S.login}>
        <form onSubmit={login} style={S.loginCard}>
          <h1 style={S.title}>Swamy's Mess — Admin</h1>
          <input
            style={S.input}
            placeholder="Username"
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            style={S.input}
            placeholder="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {err && <div style={S.err}>{err}</div>}
          <button style={S.btn}>Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div style={S.app}>
      <header style={S.header}>
        <h1 style={S.brand}>Swamy's Mess — Admin</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={S.btn} disabled={saving} onClick={publish}>
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            style={S.ghost}
            onClick={() => {
              setCats([]);
              setAuthed(false);
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main style={S.main}>
        {loading ? (
          <p style={{ color: "#64748b" }}>Loading…</p>
        ) : (
          cats.map((c, ci) => (
            <section key={c.name} style={S.section}>
              <div style={S.sectionHead}>
                <h2 style={S.h2}>
                  {c.name}
                  <span style={S.count}>{c.items.length}</span>
                </h2>
                <div style={{ display: "flex", gap: 2 }}>
                  <button
                    style={{ ...S.iconBtn, opacity: ci === 0 ? 0.3 : 1 }}
                    disabled={ci === 0}
                    onClick={() => moveCategory(c.name, -1)}
                    aria-label="Move category up"
                  >
                    ↑
                  </button>
                  <button
                    style={{ ...S.iconBtn, opacity: ci === cats.length - 1 ? 0.3 : 1 }}
                    disabled={ci === cats.length - 1}
                    onClick={() => moveCategory(c.name, 1)}
                    aria-label="Move category down"
                  >
                    ↓
                  </button>
                  <button
                    style={S.iconBtn}
                    onClick={() => renameCategory(c.name)}
                    aria-label="Rename category"
                  >
                    ✎
                  </button>
                  <button
                    style={{ ...S.iconBtn, color: "#b91c1c" }}
                    onClick={() => removeCategory(c.name)}
                    aria-label="Delete category"
                  >
                    ×
                  </button>
                </div>
              </div>
              <Reorder.Group
                axis="xy"
                values={c.items}
                onReorder={(next) => setCategoryOrder(c.name, next)}
                style={S.grid}
              >
                {c.items.map((it) => (
                  <Card key={it.id} item={it} onUpdate={updateItem} onDelete={removeItem} />
                ))}
                <button onClick={() => addItem(c.name)} style={S.addItem}>
                  + Add item
                </button>
              </Reorder.Group>
            </section>
          ))
        )}
        <button onClick={addCategory} style={S.addCat}>
          + Add category
        </button>
      </main>
      {toast && <div style={S.toast}>{toast}</div>}
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

  function start(field: "name" | "price") {
    setDraft(field === "price" ? item.price : item.item);
    setEdit(field);
  }
  function commit() {
    if (!edit) return;
    const v = draft.trim();
    onUpdate(item.id, edit === "name" ? "item" : "price", edit === "price" ? v || "0" : v);
    setEdit("");
  }
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <Reorder.Item
      value={item}
      style={S.card}
      whileDrag={{ scale: 1.04, zIndex: 10, boxShadow: "0 16px 36px rgba(15,23,42,0.28)" }}
    >
      <div style={S.imgWrap}>
        {item.image_url && !imgErr ? (
          <img
            src={item.image_url}
            alt=""
            draggable={false}
            onError={() => setImgErr(true)}
            style={S.img}
          />
        ) : (
          <div style={S.imgPh}>no image</div>
        )}
      </div>
      <div style={S.body}>
        {edit === "name" ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") setEdit("");
            }}
            onPointerDown={stop}
            style={S.nameInput}
          />
        ) : (
          <div onDoubleClick={() => start("name")} onPointerDown={stop} style={S.name}>
            {item.item || "Untitled"}
          </div>
        )}
        {edit === "price" ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/[^\d.]/g, ""))}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") setEdit("");
            }}
            onPointerDown={stop}
            inputMode="decimal"
            style={S.priceInput}
          />
        ) : (
          <div onDoubleClick={() => start("price")} onPointerDown={stop} style={S.price}>
            <span style={{ fontSize: 13, color: "#64748b", marginRight: 2 }}>₹</span>
            {item.price || "0"}
          </div>
        )}
      </div>
      <button onPointerDown={stop} onClick={() => onDelete(item.id)} style={S.del} aria-label="Delete item">
        ×
      </button>
    </Reorder.Item>
  );
}

const S: Record<string, React.CSSProperties> = {
  app: { minHeight: "100vh", background: "#fafaf7", color: "#0f172a", fontFamily: "system-ui, sans-serif" },
  login: {
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
  title: { margin: 0, fontSize: 18, fontWeight: 700 },
  input: {
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  },
  err: { background: "#fef2f2", color: "#b91c1c", fontSize: 13, padding: "8px 12px", borderRadius: 8 },
  btn: {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  ghost: {
    background: "transparent",
    color: "#475569",
    border: "1px solid #e2e8f0",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #e5e7eb",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { margin: 0, fontSize: 16, fontWeight: 700 },
  main: { maxWidth: 1100, margin: "0 auto", padding: "20px 16px 80px" },
  section: { marginBottom: 36 },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 8,
  },
  h2: { margin: 0, fontSize: 22, fontWeight: 700, textTransform: "capitalize", display: "flex", alignItems: "center", gap: 8 },
  count: {
    background: "#e2e8f0",
    color: "#475569",
    fontSize: 12,
    fontWeight: 600,
    padding: "2px 10px",
    borderRadius: 999,
  },
  iconBtn: {
    width: 28,
    height: 28,
    border: "none",
    background: "transparent",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    color: "#475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 14,
  },
  card: {
    background: "#fff",
    border: "1px solid #eef0f3",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    cursor: "grab",
  },
  imgWrap: {
    position: "relative",
    width: "100%",
    height: 180,
    background: "linear-gradient(135deg, #fef3c7, #fde68a)",
    overflow: "hidden",
    flexShrink: 0,
  },
  img: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  imgPh: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a16207",
    fontSize: 12,
    fontWeight: 500,
  },
  body: { padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, flex: 1 },
  name: {
    flex: 3,
    minWidth: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.35,
    cursor: "text",
    padding: "6px 8px",
    borderRadius: 6,
    margin: "-6px -8px",
    touchAction: "manipulation",
    wordBreak: "break-word",
  },
  price: {
    flex: 1,
    minWidth: 0,
    fontSize: 19,
    fontWeight: 700,
    textAlign: "right",
    cursor: "text",
    padding: "6px 8px",
    borderRadius: 6,
    margin: "-6px -8px",
    touchAction: "manipulation",
  },
  nameInput: {
    flex: 3,
    minWidth: 0,
    fontSize: 15,
    padding: "6px 8px",
    border: "1px solid #94a3b8",
    borderRadius: 6,
    outline: "none",
    margin: "-6px -8px",
    fontFamily: "inherit",
    boxShadow: "0 0 0 3px rgba(79,70,229,0.12)",
  },
  priceInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 19,
    fontWeight: 700,
    textAlign: "right",
    padding: "6px 8px",
    border: "1px solid #94a3b8",
    borderRadius: 6,
    outline: "none",
    margin: "-6px -8px",
    fontFamily: "inherit",
    boxShadow: "0 0 0 3px rgba(79,70,229,0.12)",
  },
  del: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    border: "none",
    borderRadius: 8,
    background: "rgba(15,23,42,0.75)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
  },
  addItem: {
    border: "2px dashed #cbd5e1",
    background: "transparent",
    color: "#64748b",
    borderRadius: 14,
    fontSize: 14,
    cursor: "pointer",
    minHeight: 100,
  },
  addCat: {
    width: "100%",
    padding: 14,
    border: "2px dashed #cbd5e1",
    background: "transparent",
    color: "#475569",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  toast: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#0f766e",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 999,
    fontSize: 14,
    boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
    zIndex: 100,
  },
};