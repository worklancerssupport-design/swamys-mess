import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const port = Number(process.env.PORT) || 3001;

app.use("/*", cors({ origin: clientUrl }));

app.get("/health", (c) => c.json({ status: "ok" }));

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
