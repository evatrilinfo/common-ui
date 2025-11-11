// cookieUtils.js
export const COOKIE_NAME = "selectedCity";
const DEFAULT_DAYS = 30;

export function setCityCookie(cityData, days = DEFAULT_DAYS) {
  try {
    const encoded = encodeURIComponent(JSON.stringify(cityData));
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    // If you're using HTTPS and want cross-site usage ensure SameSite=None; Secure
    document.cookie = `${COOKIE_NAME}=${encoded}; path=/; domain=.evatril.com; expires=${expires}; SameSite=None; Secure`;
  } catch (e) {
    console.error("setCityCookie error:", e);
  }
}

export function getCityCookie() {
  try {
    const cookies = document.cookie.split(";").map(c => c.trim());
    const found = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`));
    if (!found) return null;
    return JSON.parse(decodeURIComponent(found.split("=")[1]));
  } catch (e) {
    console.error("getCityCookie error:", e);
    return null;
  }
}
