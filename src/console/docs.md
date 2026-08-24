# Console — Data Lifecycle

## Objects

### `Item` (types.ts)
```ts
{ id: string, category: string, item: string, price: string, image_url: string }
```
- `id` — UUID via `crypto.randomUUID()`, generated on creation, never changes.
- `category` — group key; determines which section an item belongs to.
- `item` — display name (e.g. "Masala Dosa").
- `price` — string, not number (e.g. "60").
- `image_url` — Cloudinary `secure_url` with `q_auto,f_auto` transforms applied on upload.

### `cats` (ConsolePage state)
```ts
{ name: string; items: Item[] }[]
```
Grouped view of items. Derived from the flat `Item[]` on load, flattened back on save. This is the **working copy** — all edits happen here in memory.

### `sha` (ConsolePage state)
Git SHA of the current `data.json` blob on GitHub. Required by the GitHub API for optimistic concurrency — the PUT fails if SHA doesn't match the latest commit, preventing blind overwrites.

## Data Flow

```
GitHub (data.json)
  │
  │  load() → GET /repos/.../contents/data.json
  │           base64-decode content → JSON.parse → Item[]
  │
  ▼
cats (grouped in-memory state)
  │
  │  Admin edits: add/rename/delete categories, add/edit/delete/reorder items
  │  All mutations go through setCats() — React state updates
  │
  │  publish() → cats.flatMap(c => c.items) → JSON.stringify → base64
  │              PUT /repos/.../contents/data.json { sha, content, message }
  │              GitHub returns new SHA → update sha state
  │
  ▼
GitHub (data.json updated)
  │
  │  Static site fetches from GitHub raw CDN → renders menu
  ▼
Users see updated menu
```

## Lifecycle Stages

### 1. Auth
`Login.tsx` compares input against `VITE_ADMIN_USERNAME` / `VITE_ADMIN_PASSWORD` from `.env`. On match, calls `onAuthed()`.

### 2. Load
`load()` fetches `data.json` from GitHub API (branch-aware). Decodes base64 → parses JSON → groups items by `category` field into `cats`. Stores the response `sha`.

### 3. Edit (in-memory only)
All mutations are local React state updates on `cats`:

| Action | Handler | What changes |
|--------|---------|-------------|
| Add category | `addCategory()` | Appends `{ name, items: [defaultItem] }` to `cats` |
| Rename category | `renameCategory()` | Updates `name` on the group + `category` field on all its items |
| Delete category | `removeCategory()` | Filters group out of `cats` |
| Add item | `addItem()` | Pushes new `Item` (with `uid()`) into a category's `items` |
| Edit item field | `updateItem()` | Patches `item`, `price`, or `image_url` by `id` |
| Delete item | `removeItem()` | Filters item out by `id` |
| Reorder items | `setCategoryItems()` | Replaces a category's `items` array (via Framer Motion `Reorder`) |
| Reorder categories | `reorderCats()` | Reorders `cats` array by name list (sidebar drag) |

### 4. Image Upload
`ImageWidget.tsx` lazy-loads the Cloudinary Upload Widget script. On upload success, transforms the URL (`/upload/` → `/upload/q_auto,f_auto/`) and passes it to `onUpdate(item.id, "image_url", url)`.

### 5. Publish
`publish()` flattens `cats` → `cats.flatMap(c => c.items)`, serializes to JSON, base64-encodes, and PUTs to GitHub with the current `sha`. On success, updates `sha` and shows a toast. After 1.8s, auto-logs out (clears `cats` and `authed`), forcing a fresh load next time.

### 6. Logout
Clears `cats` and sets `authed = false`. Unsaved edits are discarded — only published data persists.

## Key Invariants

- **`sha` is the version lock.** Every save must include the latest SHA. If someone else commits first, the save fails (returns `null`).
- **`category` field on Item must match the group's `name`.** Renaming a category patches all its items' `category` field to keep them in sync.
- **`id` is immutable.** Generated once via `uid()`, used as the React key and the lookup key for all item operations.
- **Draft state is ephemeral.** Nothing is persisted until `publish()` succeeds. Logout or page refresh loses all unsaved changes.
