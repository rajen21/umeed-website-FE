import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage } from "http";

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });
}

function appsScriptProxy(appsScriptUrl: string): Plugin {
  return {
    name: "apps-script-proxy",
    configureServer(server) {
      server.middlewares.use("/apps-script", async (req, res) => {
        if (!appsScriptUrl) {
          res.statusCode = 503;
          res.end(
            JSON.stringify({
              success: false,
              error: "Apps Script URL not configured",
            }),
          );
          return;
        }

        try {
          const query = req.url?.includes("?")
            ? req.url.slice(req.url.indexOf("?"))
            : "";
          const targetUrl = `${appsScriptUrl}${query}`;

          if (req.method === "POST") {
            const body = await readRequestBody(req);
            const response = await fetch(targetUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body,
              redirect: "follow",
            });
            const text = await response.text();
            res.statusCode = response.status;
            res.setHeader(
              "Content-Type",
              response.headers.get("content-type") || "application/json",
            );
            res.end(text);
            return;
          }

          const response = await fetch(targetUrl, { redirect: "follow" });
          const text = await response.text();
          res.statusCode = response.status;
          res.setHeader(
            "Content-Type",
            response.headers.get("content-type") || "application/json",
          );
          res.end(text);
        } catch (error) {
          res.statusCode = 502;
          res.end(
            JSON.stringify({
              success: false,
              error:
                error instanceof Error ? error.message : "Proxy request failed",
            }),
          );
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const appsScriptUrl = env.VITE_APPS_SCRIPT_URL;

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      ...(appsScriptUrl ? [appsScriptProxy(appsScriptUrl)] : []),
    ],
    server: {
      port: 3000,
      host: "::",
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
        "/uploads": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  };
});
