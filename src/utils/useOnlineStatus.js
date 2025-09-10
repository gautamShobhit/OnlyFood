import { useEffect, useState } from "react";
const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  //since only want our status to be updated once
  useEffect(() => {
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
  }, []);

  return onlineStatus;
};
export default useOnlineStatus;
