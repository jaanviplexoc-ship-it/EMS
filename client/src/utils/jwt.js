import { JWT_CLAIM_KEYS } from "./constants";

/**
 * Decodes a JWT payload without verifying the signature (verification
 * happens on the server). Good enough to read claims for UI purposes only.
 */
export function decodeToken(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(decoded);
  } catch (err) {
    return null;
  }
}

/**
 * Pulls the fields we care about out of the raw claim payload,
 * falling back gracefully if the backend's claim scheme ever changes.
 */
export function getUserFromToken(token) {
  const payload = decodeToken(token);
  if (!payload) return null;

  return {
    userId: payload[JWT_CLAIM_KEYS.NAME_IDENTIFIER] || payload.sub || null,
    email: payload[JWT_CLAIM_KEYS.EMAIL] || payload.email || null,
    role: payload[JWT_CLAIM_KEYS.ROLE] || payload.role || null,
    exp: payload.exp || null,
  };
}

export function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  const nowInSeconds = Date.now() / 1000;
  return payload.exp < nowInSeconds;
}
