import { writeFile } from "node:fs/promises";
import path from "node:path";

/** Dev-only: the inline text editor POSTs here to write config/content.json. */
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Disabled in production", { status: 403 });
  }
  const content = await req.json();
  await writeFile(
    path.join(process.cwd(), "config", "content.json"),
    JSON.stringify(content, null, 2) + "\n",
    "utf8",
  );
  return Response.json({ ok: true });
}
