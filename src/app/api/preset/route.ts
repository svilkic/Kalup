import { copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Dev-only: applies a preset by copying config/presets/<name>/{config,content}.json
 * over the live config files. The sidebar reloads the page afterwards.
 */
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Disabled in production", { status: 403 });
  }
  const { name } = await req.json();
  if (typeof name !== "string" || !/^[a-z-]+$/.test(name)) {
    return new Response("Invalid preset name", { status: 400 });
  }
  const dir = path.join(process.cwd(), "config", "presets", name);
  if (!existsSync(path.join(dir, "config.json")) || !existsSync(path.join(dir, "content.json"))) {
    return new Response("Unknown preset", { status: 404 });
  }
  const live = path.join(process.cwd(), "config");
  await copyFile(path.join(dir, "config.json"), path.join(live, "config.json"));
  await copyFile(path.join(dir, "content.json"), path.join(live, "content.json"));
  return Response.json({ ok: true });
}
