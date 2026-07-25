import { useEffect, useState } from "react";
import { API_OPTIONS, getMenuApiUrl } from "./constants.js";
import { useSelector } from "react-redux";

const useResMenu = (resId) => {
  const { lat, lng } = useSelector((store) => store.location);
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    // 1. Only fetch if coordinates are valid
    if (lat && lng) {
      fetchData(lat, lng);
    }
  }, [lat, lng]); // 2. Re-run if coordinates update

  const fetchData = async (lat, lng) => {
    try {
      // 1. Pass the exact same headers that worked for your list API
      const response = await fetch(getMenuApiUrl(lat, lng, resId), {
        ...API_OPTIONS,
        headers: {
          ...API_OPTIONS?.headers,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Force desktop spoofing
        },
      });

      // 2. Check for strict 200 OK
      if (response.status !== 200) {
        // If it's 202 or anything else, read it as text so it doesn't crash, then log it
        const textResponse = await response.text();
        console.error(
          `API Failed. Status: ${response.status}. Response:`,
          textResponse,
        );
        return; // Exit early
      }

      // 3. If it is 200, it's safe to parse as JSON
      const dataJson = await response.json();
      setResInfo(dataJson?.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  return resInfo;
};

export default useResMenu;
