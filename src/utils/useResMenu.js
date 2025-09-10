import { useEffect, useState } from "react";
import { API_OPTIONS, MENU_API } from "./constants.js";
const useResMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId, API_OPTIONS);
    const dataJson = await data.json();
    setResInfo(dataJson.data);
  };
  return resInfo;
};
export default useResMenu;
