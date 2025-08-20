// src/middleware.ts
export { auth as middleware } from "@/auth";

// Protect only app routes that require auth.
// We'll secure /incidents, /postmortems, /settings today.
// (Public pages like / and /changelog remain open.)
export const config = {
    matcher: ["/incidents/:path*", "/postmortems/:path*", "/settings/:path*"],
};
