import { useCallback } from "react";
import { vslConfig } from "@/config/vslConfig";
import { TRACKED_PARAMS, buildCheckoutUrl } from "@/utils/buildCheckoutUrl";

const STORAGE_KEY = "nm_tracking_params";

/** Saves UTMs from the landing URL so they survive internal navigation. */
export function captureTrackingParams() {
  if (typeof window === "undefined") return;
  const search = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of TRACKED_PARAMS) {
    const v = search.get(key);
    if (v) found[key] = v;
  }
  if (Object.keys(found).length) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {
      /* storage unavailable */
    }
  }
}

function readParams(): Record<string, string> {
  const params: Record<string, string> = {};
  try {
    Object.assign(params, JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}"));
  } catch {
    /* ignore */
  }
  const search = new URLSearchParams(window.location.search);
  for (const key of TRACKED_PARAMS) {
    const v = search.get(key);
    if (v) params[key] = v;
  }
  return params;
}

export function useCheckoutUrl() {
  const getUrl = useCallback(() => {
    if (typeof window === "undefined" || !vslConfig.preserveUtms) return vslConfig.checkoutUrl;
    return buildCheckoutUrl(vslConfig.checkoutUrl, readParams());
  }, []);
  return { getUrl };
}
