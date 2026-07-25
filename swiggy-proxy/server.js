const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();

// Enable CORS so your React frontend can communicate with this proxy
app.use(cors());

// 📌 Reusable Headers: Spoofing an Android device to bypass Swiggy's firewall
const SWIGGY_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",
  Accept: "application/json, text/plain, */*",
  Origin: "https://www.swiggy.com",
  Referer: "https://www.swiggy.com/",
};

// ==========================================
// 1. RESTAURANT LIST ROUTE
// ==========================================
app.get("/api/restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  // 📌 1. Read the incoming User-Agent from the React app/browser
  const clientUserAgent = req.headers["user-agent"] || "";
  const isMobile = /Mobi|Android|iPhone/i.test(clientUserAgent);

  // 📌 2. Pick the appropriate Swiggy URL based on the device
  const url = isMobile
    ? `https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`
    : `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

  // 📌 3. Generate dynamic headers matching the chosen API endpoint
  const dynamicHeaders = {
    "User-Agent": isMobile
      ? "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36" // Mobile Spoof
      : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", // Desktop Spoof
    Accept: "application/json, text/plain, */*",
    Origin: "https://www.swiggy.com",
    Referer: "https://www.swiggy.com/",
  };

  try {
    // Pass the dynamic headers instead of the global SWIGGY_HEADERS
    const response = await fetch(url, { headers: dynamicHeaders });

    if (response.status !== 200) {
      const errorText = await response.text();
      const apiType = isMobile ? "MAPI" : "DAPI";
      console.error(
        `⚠️ Swiggy blocked LIST request (${apiType}). Status: ${response.status}`,
      );
      return res.status(response.status).json({
        error: `Swiggy returned status ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Proxy Server Error (List):", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});
// ==========================================
// 2. RESTAURANT MENU ROUTE
// ==========================================
app.get("/api/menu", async (req, res) => {
  const { lat, lng, resId } = req.query;

  // Using the 'mapi' (Mobile API) endpoint for maximum reliability
  const url = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`;

  try {
    const response = await fetch(url, { headers: SWIGGY_HEADERS });

    if (response.status !== 200) {
      const errorText = await response.text();
      console.error(
        `⚠️ Swiggy blocked MENU request. Status: ${response.status}`,
      );
      return res.status(response.status).json({
        error: `Swiggy returned status ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Proxy Server Error (Menu):", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// ==========================================
// SERVER INITIALIZATION
// ==========================================
const PORT = process.env.PORT || 3001;
// Only listen locally if not running on Vercel serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Proxy running on http://localhost:${PORT}`);
  });
}

module.exports = app; // 👈 Export the Express app
