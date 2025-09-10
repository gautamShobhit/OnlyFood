import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResItems } from "./resSlice";
import { API_OPTIONS } from "./constants.js";
// const useResList = () => {
//   const dispatch = useDispatch();
//   //we use redux store to save the resList
//   const restaurantList = useSelector((store) => store.resList);
//   const fetchData = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         const data = await fetch(
//           //fetch returns a promise
//           "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=" +
//             lat +
//             "&lng=" +
//             lng +
//             "&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
//           API_OPTIONS
//         );
//         const dataJson = await data.json();
//         const cards = dataJson?.data?.cards || [];

//         // Look through cards to find the one with restaurants
//         const restaurantCard = cards.find(
//           (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
//         );

//         const restaurants =
//           restaurantCard?.card?.card?.gridElements?.infoWithStyle
//             ?.restaurants || [];
//         dispatch(addResItems(restaurants));
//       });
//     } else {
//       alert(
//         "Please provide location access so we can find best restaurants near you !!"
//       );
//     }
//   };
//   useEffect(() => {
//     if (!restaurantList || restaurantList?.length === 0) {
//       fetchData();
//       alert(
//         "⚠️ This is a personal project built for learning purposes. Data shown is fetched via public endpoints and may break or become unavailable."
//       );
//     }
//   }, []);
//   return restaurantList;
// };
// export default useResList;

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

  const fetchData = async () => {
    if (!navigator.geolocation) {
      alert(
        "Please provide location access so we can find best restaurants near you !!"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const BASE_URL = /Mobi|Android/i.test(navigator.userAgent)
        ? `https://proxy.cors.sh/https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`
        : `https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

      try {
        const res = await fetch(`${BASE_URL}`, {
          ...API_OPTIONS,
          headers: {
            ...API_OPTIONS.headers,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // force desktop response
          },
        });

        const dataJson = await res.json();

        // Use robust parser
        const restaurants = extractRestaurants(dataJson);

        dispatch(addResItems(restaurants));
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    });
  };

  useEffect(() => {
    if (!restaurantList || restaurantList?.length === 0) {
      fetchData();
      alert(
        "⚠️ This is a personal project built for learning purposes. Data shown is fetched via public endpoints and may break or become unavailable."
      );
    }
  }, []);

  return restaurantList;
};

export default useResList;
