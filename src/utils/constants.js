//this file will include urls which remain constant throughout the app
export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
/*export const LOGO_URL =
  "https://img.freepik.com/premium-vector/food-truck_8251-5.jpg?w=826";*/
export const SEARCH_ICON =
  "https://png.pngtree.com/png-vector/20250307/ourmid/pngtree-search-icon-png-image_15738214.png";
export const MENU_API =
  "https://proxy.cors.sh/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6180771&lng=77.2861288&restaurantId=";
// export const API_OPTIONS = {
//   headers: {
//     "x-cors-api-key": process.env.CORS_PROXY_API_KEY,
//   },
// };
export const API_OPTIONS = {
  headers: {
    "x-cors-api-key": process.env.CORS_PROXY_API_KEY,
    // *** NEW HEADERS TO ADD ***
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    // Swiggy might also check the Referer/Origin header to verify the call is coming from their site context.
    // Try adding a Referer pointing to a valid Swiggy domain.
    Referer: "https://www.swiggy.com/",
  },
};
