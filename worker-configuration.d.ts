// Cloudflare Worker configuration types
interface Env {
  DB: D1Database;
  APIFY_API_TOKEN?: string;
  INSTAGRAM_SESSION_1?: string;
  INSTAGRAM_SESSION_2?: string;
  INSTAGRAM_SESSION_3?: string;
}

declare global {
  const SELF: ServiceWorkerGlobalScope;
}

export {};
