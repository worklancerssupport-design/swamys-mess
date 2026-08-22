import { useState } from "react";
import { Reorder } from "motion/react";
import { useImageUpload } from "./ImageWidget";
import type { Item } from "../types";

export default function ItemCard({
  item,
  onUpdate,
  onDelete,
  showDescription,
}: {
  item: Item;
  onUpdate: (id: string, field: keyof Item, value: string) => void;
  onDelete: (id: string) => void;
  showDescription?: boolean;
}) {
  const [edit, setEdit] = useState<"" | "name" | "price" | "description">("");
  const [draft, setDraft] = useState("");
  const [imgErr, setImgErr] = useState(false);
  const openWidget = useImageUpload();

  function start(field: "name" | "price" | "description") {
    if (field === "price") setDraft(item.price);
    else if (field === "description") setDraft(item.description);
    else setDraft(item.item);
    setEdit(field);
  }
  function commit() {
    if (!edit) return;
    const fieldMap: Record<string, keyof Item> = { name: "item", price: "price", description: "description" };
    onUpdate(item.id, fieldMap[edit], edit === "price" ? draft.trim() || "0" : draft.trim());
    setEdit("");
  }
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <>
      <style>{`
.card{background:#fff;border:1px solid #eef0f3;border-radius:16px;overflow:hidden;position:relative;display:flex;flex-direction:column;cursor:grab}
.card-img{position:relative;width:100%;height:180px;background:linear-gradient(135deg,#fef3c7,#fde68a);overflow:hidden;flex-shrink:0}
.card-img-el{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.card-img-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#a16207;font-size:12px;font-weight:500}
.card-body{padding:12px 14px;display:flex;align-items:center;gap:12px;flex:1}
.card-body.vstack{flex-direction:column;align-items:stretch;gap:4px}
.card-name{flex:3;min-width:0;font-size:15px;font-weight:500;line-height:1.35;cursor:text;padding:6px 8px;border-radius:6px;margin:-6px -8px;touch-action:manipulation;word-break:break-word}
.card-body.vstack .card-name{flex:none;margin:-6px -8px -2px}
.card-price{flex:1;min-width:0;font-size:19px;font-weight:700;text-align:right;cursor:text;padding:6px 8px;border-radius:6px;margin:-6px -8px;touch-action:manipulation}
.rupee{font-size:13px;color:#64748b;margin-right:2px}
.card-desc{font-size:13px;color:#64748b;line-height:1.4;cursor:text;padding:6px 8px;border-radius:6px;margin:-2px -8px -6px;touch-action:manipulation;word-break:break-word}
.desc-input{width:100%;font-size:13px;padding:6px 8px;margin:-2px -8px -6px;resize:vertical;min-height:40px;line-height:1.4;font-family:inherit}
.card-input{border:1px solid #94a3b8;border-radius:6px;outline:none;font-family:inherit;box-shadow:0 0 0 3px rgba(79,70,229,.12)}
.name-input{flex:3;min-width:0;font-size:15px;padding:6px 8px;margin:-6px -8px}
.price-input{flex:1;min-width:0;font-size:19px;font-weight:700;text-align:right;padding:6px 8px;margin:-6px -8px}
.card-del{position:absolute;top:8px;right:8px;width:28px;height:28px;border:none;border-radius:8px;background:rgba(15,23,42,.75);color:#fff;cursor:pointer;font-size:16px;line-height:1}
.card-edit{position:absolute;top:8px;left:8px;width:28px;height:28px;border:none;border-radius:8px;background:rgba(15,23,42,.75);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.card-edit:hover{background:rgba(15,23,42,.9)}
      `}</style>
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
        <div className={`card-body${showDescription ? " vstack" : ""}`}>
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
          {showDescription ? (
            edit === "description" ? (
              <textarea
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) (e.target as HTMLTextAreaElement).blur(); if (e.key === "Escape") setEdit(""); }}
                onPointerDown={stop}
                className="card-input desc-input"
              />
            ) : (
              <div onDoubleClick={() => start("description")} onPointerDown={stop} className="card-desc">{item.description || "No description"}</div>
            )
          ) : (
            edit === "price" ? (
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
            )
          )}
        </div>
        <button onPointerDown={stop} onClick={() => onDelete(item.id)} className="card-del" aria-label="Delete item">×</button>
      </Reorder.Item>
    </>
  );
}
