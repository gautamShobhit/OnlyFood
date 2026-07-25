//this file will include urls which remain constant throughout the app
export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const SEARCH_ICON =
  "https://png.pngtree.com/png-vector/20250307/ourmid/pngtree-search-icon-png-image_15738214.png";

// 📌 Paste your Port 3001 Dev Tunnel URL here (ensure it starts with https://)
const DEV_TUNNEL_PROXY_URL = "https://3b017s64-3001.inc1.devtunnels.ms";

// 📌 Dynamically determine the base backend URL
export const BASE_PROXY_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : DEV_TUNNEL_PROXY_URL;

export const getMenuApiUrl = (lat, lng, restaurantId) => {
  return `${BASE_PROXY_URL}/api/menu?lat=${lat}&lng=${lng}&resId=${restaurantId}`;
};
// You can now completely empty out API_OPTIONS in your React app
export const API_OPTIONS = {};
