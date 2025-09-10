/*->Header
    ->logo
    ->nav items(home, about, cart details)
*/
//import { LOGO_URL } from "../utils/constants";
import appLogo from "../assets/appLogo.jpg";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import CustomizedSwitches from "./CustomizedSwitches";
//import down from "../assets/down.jpg";

const Header = () => {
  //js var does not work with react since any change in them is not reflected on webpage
  //let btnName = "Log-in"; --> can't trigger react to re-render

  const [btnName, setBtnName] = useState("Log-in");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const favItems = useSelector((store) => store.favRest.items);
  const [isShowMore, setIsShowMore] = useState(false);
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <div className="md:text-base text-xs left-1/2 -translate-x-1/2 fixed top-1 backdrop-blur-sm shadow-lg dark:shadow-gray-500 z-50 flex md:w-[99%] w-[99%] justify-between border-b-1 rounded-lg items-center bg-cyan-500/40 font-poppins  ">
      <div className="logo-container">
        <Link to="/">
          <img
            className="md:w-[120px] w-[75px] rounded-xl p-[5px] transition-all delay-100 ease-in-out duration-300 hover:scale-95 "
            src={appLogo}
            alt="Company Logo"
          />
        </Link>
      </div>
      <div className="font-semibold ">
        <ul className="flex ">
          <li className="hidden md:block md:p-3 md:m-[15px]  border-1 rounded-2xl bg-white dark:bg-black md:text-base text-[10px]">
            Online Status :{onlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="md:p-3 p-2 md:m-[15px] mr-2 border-1 rounded-2xl bg-white dark:bg-black md:text-base text-[10px] transition-all ease-in-out duration-300 hover:scale-90">
            <Link to="/">Home 🏠</Link>
          </li>
          <li className="hidden md:block md:p-3 md:m-[15px] border-1 rounded-2xl bg-white dark:bg-black md:text-base text-[12px] transition-all ease-in-out duration-300 hover:scale-90">
            <Link to="/about">About Us 👤</Link>
          </li>
          <li className="hidden md:block md:p-3 md:m-[15px] border-1 rounded-2xl bg-white dark:bg-black md:text-base text-[12px] transition-all ease-in-out duration-300 hover:scale-90">
            <Link to="/contact">Contact Us ☎️</Link>
          </li>
          <li className="md:p-3 p-2 md:m-[15px] mr-2 border-1 rounded-2xl bg-white dark:bg-black md:text-base text-[10px] transition-all ease-in-out duration-300 hover:scale-90">
            <Link to="/favourites">Favourites 🩷 - ({favItems.length})</Link>
          </li>
          <li className="md:p-3 p-2 md:m-[15px]  border-1 rounded-2xl bg-white dark:bg-black md:text-base text-[10px] transition-all ease-in-out duration-300 hover:scale-90">
            <Link to="/cart">Cart 🛒 - ({cartItems.length})</Link>
          </li>
          <div className="absolute right-0 top-0 md:-mr-0 -mr-4 -mt-1 md:-mt-0">
            <CustomizedSwitches />
          </div>
          <button
            className="relative mx-3 my-auto md:hidden flex flex-col justify-between w-4 h-3 group"
            onClick={() => {
              toggleShowMore();
            }}
          >
            {/* {isShowMore ? "⬆️" : "⬇️"} */}
            {/* Line 1 */}
            <span
              className={`h-[1px] bg-black dark:bg-white rounded transition-all duration-300 ${
                isShowMore ? "-rotate-45 translate-y-[5px]" : ""
              }`}
            ></span>
            {/* Line 2 */}
            <span
              className={`h-[1px] bg-black dark:bg-white rounded transition-all duration-300 ${
                isShowMore ? "opacity-0" : ""
              }`}
            ></span>
            {/* Line 3 */}
            <span
              className={`h-[1px] bg-black dark:bg-white rounded transition-all duration-300 ${
                isShowMore ? "rotate-45 -translate-y-[6px]" : ""
              }`}
            ></span>
          </button>
        </ul>

        <div
          className={`px-2 absolute right-0 mt-[2px] w-[112px] bg-white dark:bg-black rounded-2xl border-1 overflow-hidden transform transition-all duration-300 origin-top-right text-[10px] ${
            isShowMore ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <ul className=" ">
            <li className="my-2 border-1 p-2 rounded-2xl">
              <Link to="/contact">Contact Us ☎️</Link>
            </li>
            <li className="my-2 border-1 p-2 rounded-2xl">
              <Link to="/about">About Us 👤</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

//before importing, we need to export the header file
export default Header;
