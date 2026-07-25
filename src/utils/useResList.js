import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResItems } from "./resSlice";
import { API_OPTIONS } from "./constants.js";
import { setLocation } from "./locationSlice.js";
import { BASE_PROXY_URL } from "./constants.js";
const useResList = () => {
  const dispatch = useDispatch();
  const restaurantList = useSelector((store) => store.resList);

  // 📌 A parser that extracts restaurants regardless of structure
  const extractRestaurants = (dataJson) => {
    const cards = dataJson?.data?.cards || [];

    for (let card of cards) {
      const grid = card?.card?.card?.gridElements?.infoWithStyle;
      if (grid?.restaurants) {
        return grid.restaurants;
      }
    }

    return [];
  };

  // Inside useResList.js
  // Assuming BASE_PROXY_URL is imported from constants.js (e.g., http://localhost:3001)

  const fetchData = async () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser. Using default location.",
      );
      fetchRestaurantsFromAPI(28.6180771, 77.2861288); // Default to Delhi
      return;
    }

    navigator.geolocation.getCurrentPosition(
      // 📌 1. SUCCESS: Phone got the location
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetchRestaurantsFromAPI(lat, lng);
      },
      // 📌 2. ERROR / TIMEOUT: Phone failed to get location
      (error) => {
        console.warn(
          `Location Error: ${error.message}. Falling back to default location.`,
        );
        fetchRestaurantsFromAPI(28.6180771, 77.2861288); // Default to Delhi
      },
      // 📌 3. OPTIONS: Tell the phone to try harder
      {
        enableHighAccuracy: true, // Forces phone to use GPS, not just cell towers
        timeout: 10000, // Wait max 10 seconds
        maximumAge: 0, // Don't use a cached location
      },
    );
  };

  // 📌 4. Abstracted the actual API call to avoid repeating code
  const fetchRestaurantsFromAPI = async (lat, lng) => {
    // Save to Redux so the Menu can use it later
    dispatch(setLocation({ lat, lng }));

    try {
      const fetchUrl = `${BASE_PROXY_URL}/api/restaurants?lat=${lat}&lng=${lng}`;
      const res = await fetch(fetchUrl);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const dataJson = await res.json();
      const restaurants = extractRestaurants(dataJson);
      dispatch(addResItems(restaurants));
    } catch (err) {
      console.error("Error fetching restaurants:", err.message);
    }
  };
  useEffect(() => {
    if (!restaurantList || restaurantList?.length === 0) {
      fetchData();
      alert(
        "⚠️ This is a personal project built for learning purposes. Data shown is fetched via public endpoints and may break or become unavailable.",
      );
    }
  }, []);

  return restaurantList;
};

export default useResList;
