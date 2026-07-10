"use client";

import { useEffect, useRef, useState } from "react";
import { PencilLine, Trash2, Copy, Download, Check, ImagePlus, Shapes } from "lucide-react";
import { ImageCropper } from "./ImageCropper";
import { iconMap } from "@/lib/icons";
import type { SiteContent } from "@/lib/types";

type Path = (string | number)[];
type Entry = { path: Path; value: string };

/** Flatten every string value in content.json to [path, value] pairs. */
function collectStrings(node: unknown, path: Path, out: Entry[]) {
  if (typeof node === "string") {
    out.push({ path, value: node });
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => collectStrings(v, [...path, i], out));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) collectStrings(v, [...path, k], out);
  }
}

function setDeep(obj: SiteContent, path: Path, value: string): SiteContent {
  const clone = structuredClone(obj);
  let cur = clone as Record<string | number, unknown>;
  for (const key of path.slice(0, -1)) cur = cur[key] as Record<string | number, unknown>;
  cur[path[path.length - 1]] = value;
  return clone;
}

/** Sections render some strings wrapped in curly quotes — strip them before matching. */
const normalize = (s: string) => s.trim().replace(/^[“”"']+|[“”"']+$/g, "").trim();

interface Menu {
  x: number;
  y: number;
  el: HTMLElement;
  entry: Entry;
  kind: "text" | "image" | "icon";
  aspect: number;
}

/**
 * Dev-only inline editor. Right-click text for Edit/Delete, right-click any
 * image for Replace/Remove — Replace opens a crop dialog and saves the result
 * as WebP into /public/uploads, writing the new path into content.json.
 * Double-click still edits text directly. All changes persist through the
 * dev-only API routes; production ships none of this.
 *
 * ponytail: elements are matched to JSON by their text/src value, so if the
 * exact same string appears twice in content.json, the first path wins.
 */
interface ContentEditorProps {
  initial: SiteContent;
  /** Demo mode: apply changes to parent state instead of writing content.json via the dev API. */
  onChange?: (content: SiteContent) => void;
}

export function ContentEditor({ initial, onChange }: ContentEditorProps) {
  const contentRef = useRef(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [crop, setCrop] = useState<{ file: File; aspect: number; entry: Entry } | null>(null);
  const [iconPick, setIconPick] = useState<{ path: Path; current: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const pendingImage = useRef<{ entry: Entry; aspect: number } | null>(null);

  const persist = async (next: SiteContent) => {
    contentRef.current = next;
    if (onChange) {
      onChange(next);
      setStatus("saved");
      return;
    }
    setStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  };

  const allEntries = () => {
    const entries: Entry[] = [];
    collectStrings(contentRef.current, [], entries);
    return entries;
  };

  const findText = (el: HTMLElement): Entry | null => {
    const text = normalize(el.textContent ?? "");
    if (!text) return null;
    return allEntries().find((x) => normalize(x.value) === text) ?? null;
  };

  /** Icon components carry data-icon in dev — map the click back to the JSON "icon" field. */
  const findIcon = (el: HTMLElement): { el: HTMLElement; entry: Entry } | null => {
    const svg = el.closest("[data-icon]") as HTMLElement | null;
    const name = svg?.getAttribute("data-icon");
    if (!svg || !name) return null;
    const entry = allEntries().find((x) => x.path[x.path.length - 1] === "icon" && x.value === name);
    return entry ? { el: svg, entry } : null;
  };

  /** SmartImage wrappers carry data-src in dev — map the click back to the JSON field. */
  const findImage = (el: HTMLElement): { el: HTMLElement; entry: Entry; aspect: number } | null => {
    const wrap = el.closest("[data-src]") as HTMLElement | null;
    const src = wrap?.getAttribute("data-src");
    if (!wrap || !src) return null;
    const entry = allEntries().find((x) => x.value === src);
    if (!entry) return null;
    return { el: wrap, entry, aspect: wrap.offsetWidth / Math.max(1, wrap.offsetHeight) };
  };

  const startEditing = (el: HTMLElement, entry: Entry) => {
    const original = el.textContent ?? "";
    el.setAttribute("contenteditable", "plaintext-only");
    if (!el.isContentEditable) el.setAttribute("contenteditable", "true");
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);

    const finish = (commit: boolean) => {
      el.removeAttribute("contenteditable");
      el.removeEventListener("blur", onBlur);
      el.removeEventListener("keydown", onKey);
      const next = (el.textContent ?? "").trim();
      if (!commit || !next || next === entry.value) {
        el.textContent = original;
        return;
      }
      persist(setDeep(contentRef.current, entry.path, next));
    };
    const onBlur = () => finish(true);
    const onKey = (ke: KeyboardEvent) => {
      if (ke.key === "Enter" && !ke.shiftKey) {
        ke.preventDefault();
        el.blur();
      } else if (ke.key === "Escape") {
        ke.preventDefault();
        finish(false);
      }
    };
    el.addEventListener("blur", onBlur);
    el.addEventListener("keydown", onKey);
  };

  const deleteEntry = (entry: Entry, el: HTMLElement) => {
    const next = structuredClone(contentRef.current);
    const parent = entry.path
      .slice(0, -1)
      .reduce((o, k) => (o as Record<string | number, unknown>)[k], next as unknown) as Record<string | number, unknown>;
    const last = entry.path[entry.path.length - 1];
    if (Array.isArray(parent) && typeof last === "number") {
      parent.splice(last, 1); // list item (badge, keyword) — remove it entirely
    } else {
      parent[last] = ""; // object field — empty string hides the element
    }
    el.textContent = ""; // instant feedback; the dev reload re-renders properly
    persist(next as SiteContent);
  };

  const uploadImage = async (blob: Blob, entry: Entry) => {
    if (onChange) {
      // Demo mode: no server to upload to — a blob URL previews for this session.
      await persist(setDeep(contentRef.current, entry.path, URL.createObjectURL(blob)));
      return;
    }
    setStatus("saving");
    try {
      const fd = new FormData();
      fd.append("file", blob, blob.type === "image/webp" ? "image.webp" : "image.jpg");
      fd.append("name", entry.path.join("-"));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { path } = await res.json();
      await persist(setDeep(contentRef.current, entry.path, path));
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const onDblClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || el.isContentEditable || el.closest("[data-dev-ui]")) return;
      const entry = findText(el);
      if (!entry) return;
      e.preventDefault();
      startEditing(el, entry);
    };
    const onContextMenu = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || el.isContentEditable || el.closest("[data-dev-ui]")) return;
      const icon = findIcon(el);
      if (icon) {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY, kind: "icon", aspect: 1, ...icon });
        return;
      }
      const image = findImage(el);
      if (image) {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY, kind: "image", ...image });
        return;
      }
      const entry = findText(el);
      if (!entry) return; // normal browser menu everywhere else
      e.preventDefault();
      setMenu({ x: e.clientX, y: e.clientY, el, entry, kind: "text", aspect: 1 });
    };
    document.addEventListener("dblclick", onDblClick);
    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.removeEventListener("dblclick", onDblClick);
      document.removeEventListener("contextmenu", onContextMenu);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close the context menu on outside click, scroll, or Escape.
  useEffect(() => {
    if (!menu) return;
    const close = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("[data-ctx-menu]")) return;
      setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", close);
    document.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const json = () => JSON.stringify(contentRef.current, null, 2);

  const copyJson = async () => {
    await navigator.clipboard.writeText(json());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadJson = () => {
    const url = URL.createObjectURL(new Blob([json()], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const menuItem = "flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-100";

  return (
    <>
      {menu && (
        <div
          data-dev-ui
          data-ctx-menu
          className="fixed z-[110] w-44 overflow-hidden rounded-md border border-gray-200 bg-white py-1 text-sm text-gray-900 shadow-xl"
          style={{ left: Math.min(menu.x, window.innerWidth - 190), top: Math.min(menu.y, window.innerHeight - 90) }}
        >
          {menu.kind === "icon" ? (
            <button
              type="button"
              onClick={() => {
                setIconPick({ path: menu.entry.path, current: menu.entry.value });
                setMenu(null);
              }}
              className={menuItem}
            >
              <Shapes className="h-3.5 w-3.5" aria-hidden="true" />
              Change icon
            </button>
          ) : menu.kind === "image" ? (
            <>
              <button
                type="button"
                onClick={() => {
                  pendingImage.current = { entry: menu.entry, aspect: menu.aspect };
                  setMenu(null);
                  fileInput.current?.click();
                }}
                className={menuItem}
              >
                <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                Replace image
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenu(null);
                  deleteEntry(menu.entry, menu.el);
                }}
                className={`${menuItem} text-red-600 hover:bg-red-50`}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove image
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setMenu(null);
                  startEditing(menu.el, menu.entry);
                }}
                className={menuItem}
              >
                <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
                Edit text
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenu(null);
                  deleteEntry(menu.entry, menu.el);
                }}
                className={`${menuItem} text-red-600 hover:bg-red-50`}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Delete
              </button>
            </>
          )}
        </div>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        data-dev-ui
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file && pendingImage.current) setCrop({ file, ...pendingImage.current });
        }}
      />
      {iconPick && (
        <div
          data-dev-ui
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4"
          onClick={(e) => e.target === e.currentTarget && setIconPick(null)}
        >
          <div className="max-h-[70vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-4 text-gray-900 shadow-2xl">
            <h2 className="mb-3 text-sm font-bold">Choose an icon</h2>
            <div className="grid grid-cols-7 gap-1">
              {Object.entries(iconMap).map(([name, Cmp]) => (
                <button
                  key={name}
                  type="button"
                  title={name}
                  aria-label={name}
                  onClick={() => {
                    persist(setDeep(contentRef.current, iconPick.path, name));
                    setIconPick(null);
                  }}
                  className={
                    name === iconPick.current
                      ? "flex h-11 items-center justify-center rounded-md bg-gray-900 text-white"
                      : "flex h-11 items-center justify-center rounded-md hover:bg-gray-100"
                  }
                >
                  <Cmp className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIconPick(null)}
              className="mt-3 w-full rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {crop && (
        <ImageCropper
          file={crop.file}
          aspect={crop.aspect}
          onCancel={() => setCrop(null)}
          onDone={(blob) => {
            const { entry } = crop;
            setCrop(null);
            uploadImage(blob, entry);
          }}
        />
      )}
      <div
        data-dev-ui
        className="fixed bottom-4 left-4 z-[100] flex items-center gap-1 rounded-full bg-gray-900 py-1 pr-1 pl-3 text-white shadow-lg"
      >
        <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="px-1 text-xs" role="status">
          {status === "saving" ? "Saving…" : status === "error" ? "Save failed" : "Right-click text, images, or icons"}
        </span>
        <button
          type="button"
          onClick={copyJson}
          title="Copy content.json"
          aria-label="Copy content.json"
          className="rounded-full p-1.5 hover:bg-white/15"
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={downloadJson}
          title="Download content.json"
          aria-label="Download content.json"
          className="rounded-full p-1.5 hover:bg-white/15"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
