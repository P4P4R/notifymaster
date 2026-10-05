export const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
] as const;

/** Appends tracked params (UTMs/click ids) to the checkout URL without overwriting existing ones. */
export function buildCheckoutUrl(baseUrl: string, params: Record<string, string>): string {
  try {
    const url = new URL(baseUrl);
    for (const key of TRACKED_PARAMS) {
      const value = params[key];
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function isValidCheckoutUrl(url: string) {
  return /^https?:\/\//i.test(url);
}
