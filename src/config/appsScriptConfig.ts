// Deploy scripts/volunteer-approval-email.gs and set VITE_APPS_SCRIPT_URL + SECRET.

export const appsScriptConfig = {
  url: import.meta.env.VITE_APPS_SCRIPT_URL || "",
  secret: import.meta.env.VITE_APPS_SCRIPT_SECRET || "",
  // Dev-only proxy (vite.config.ts) — avoids browser CORS to script.google.com
  proxyPath: import.meta.env.VITE_APPS_SCRIPT_PROXY_PATH || "",
};
