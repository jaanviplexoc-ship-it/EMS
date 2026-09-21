import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "./constants";

export function getToken() {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getStoredUser() {
  const raw = sessionStorage.getItem(USER_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setStoredUser(user) {
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearAuth() {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
}
