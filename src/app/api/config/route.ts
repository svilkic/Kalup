import { writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Dev-only: the config sidebar POSTs here to write config/config.json.
 * The dev server hot-reloads on the file change, so edits preview live.
 * Disabled in production — the deployed site is static and read-only.
 */
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Disabled in production", { status: 403 });
  }
  const config = await req.json();
  await writeFile(
    path.join(process.cwd(), "config", "config.json"),
    JSON.stringify(config, null, 2) + "\n",
    "utf8",
  );
  return Response.json({ ok: true });
}
