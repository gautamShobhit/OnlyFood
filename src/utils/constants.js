//this file will include urls which remain constant throughout the app
export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
/*export const LOGO_URL =
  "https://img.freepik.com/premium-vector/food-truck_8251-5.jpg?w=826";*/
export const SEARCH_ICON =
  "https://png.pngtree.com/png-vector/20250307/ourmid/pngtree-search-icon-png-image_15738214.png";
export const MENU_API =
  "https://proxy.cors.sh/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6180771&lng=77.2861288&restaurantId=";
export const API_OPTIONS = {
  headers: {
    "x-cors-api-key": process.env.CORS_PROXY_API_KEY,
  },
};
