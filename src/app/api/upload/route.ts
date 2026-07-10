import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Dev-only: the image editor POSTs cropped images (already WebP-encoded by
 * the browser) here; they land in /public/uploads and the returned path goes
 * into content.json. Old files are never deleted automatically.
 */
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Disabled in production", { status: 403 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return new Response("No file", { status: 400 });
  if (file.size > 15 * 1024 * 1024) return new Response("File too large", { status: 400 });

  const ext = file.type === "image/webp" ? "webp" : file.type === "image/png" ? "png" : "jpg";
  const base =
    String(form.get("name") || "image")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40)
      .replace(/^-|-$/g, "") || "image";

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const filename = `${base}-${Date.now()}.${ext}`;
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));
  return Response.json({ path: `/uploads/${filename}` });
}
