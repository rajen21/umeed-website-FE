import { appsScriptConfig } from "../config/appsScriptConfig";

export interface AppsScriptResponse {
  success: boolean;
  error?: string;
  sentTo?: string;
  logged?: boolean;
  updated?: boolean;
}

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

async function callViaProxy(
  payload: Record<string, string>,
): Promise<AppsScriptResponse> {
  const response = await fetch(appsScriptConfig.proxyPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: appsScriptConfig.secret, ...payload }),
  });
  return (await response.json()) as AppsScriptResponse;
}

function callViaJsonp(
  payload: Record<string, string>,
): Promise<AppsScriptResponse> {
  return new Promise((resolve, reject) => {
    const callbackName = `umeedAppsScriptCb_${Date.now()}`;
    const script = document.createElement("script");

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      delete window[callbackName];
      script.remove();
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Apps Script request timed out"));
    }, 30000);

    window[callbackName] = (data: AppsScriptResponse) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Failed to reach Apps Script"));
    };

    const searchParams = new URLSearchParams({
      secret: appsScriptConfig.secret,
      ...payload,
      callback: callbackName,
    });
    script.src = `${appsScriptConfig.url}?${searchParams.toString()}`;
    document.body.appendChild(script);
  });
}

export async function callAppsScript(
  payload: Record<string, string>,
): Promise<AppsScriptResponse> {
  if (!appsScriptConfig.url && !appsScriptConfig.proxyPath) {
    return { success: false, error: "Apps Script not configured" };
  }

  const result = appsScriptConfig.proxyPath
    ? await callViaProxy(payload)
    : await callViaJsonp(payload);

  if (!result.success) {
    throw new Error(result.error || "Apps Script request failed");
  }

  return result;
}

/** Non-blocking — never throws to caller */
export async function callAppsScriptSafe(
  payload: Record<string, string>,
): Promise<AppsScriptResponse | null> {
  try {
    return await callAppsScript(payload);
  } catch (error) {
    console.warn("Apps Script call failed:", error);
    return null;
  }
}
