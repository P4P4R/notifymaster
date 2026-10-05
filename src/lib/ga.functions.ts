import { createServerFn } from "@tanstack/react-start";

/** GA4 measurement IDs are public; this just exposes the project secret to the page. */
export const getAnalyticsConfig = createServerFn({ method: "GET" }).handler(async () => {
  return { gaId: process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? "" };
});
