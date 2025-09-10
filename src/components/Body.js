/*->Body
    ->search space
      ->search-bar
      ->filter button
    ->restaurant details(cards)
        ->image
        ->name
        ->rating etc
*/
//Since we are using Rescard in Body
import resetIcon from "../assets/resetIcon.jpg";
import filterIcon from "../assets/filterIcon.jpg";
import useOnlineStatus from "../utils/useOnlineStatus";
import Shimmer from "./Shimmer";
import ResCard, { isOpen } from "./ResCard";
//useState is named import
//There may be hook file inside react which named export it
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useResList from "../utils/useResList";
import { useSelector } from "react-redux";
//we are now going to fetch API

const Body = () => {
  const newResList = useResList();
  const [dummyResList, setDummyResList] = useState([]);
  const ResOpen = isOpen(ResCard);

  useEffect(() => {
    if (newResList && newResList?.length > 0 && dummyResList?.length === 0) {
      setDummyResList(newResList);
    }
  }, [newResList]);

  const [searchText, setSearchText] = useState("");

  //filters from the list
  const onSearch = (searchText) => {
    const matchingRes = newResList.filter(
      (res) =>
        res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
        res.info.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setDummyResList(matchingRes);
  };

  //using custom hook to display online status
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <div className="about-info justify-items-center font-poppins ">
        <h2>
          Hmmm.... looks like you are offline !! 🍵. Please check your Internet
          Connection.
        </h2>
      </div>
    );
  }

  //conditional rendering
  //shimmer component which shows even before the API fecth data

  return newResList?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="md:pt-[160px] pt-[100px] flex justify-between items-center font-poppins">
        <div className="flex grow justify-center ">
          <input
            className="md:text-base text-[14px] border-1 my-2 px-2.5 py-1 h-13 rounded-lg bg-cyan-200 dark:bg-cyan-700 md:w-2/4 w-full "
            type="text"
            //used to provide a test Id in order to fetch this input while testing
            data-testid="searchInput"
            placeholder="So.... What would you like to have today ?"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            //pressing enter triggers search
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch(searchText);
              }
            }}
          />
          <button
            className="px-2.5 m-2 border-b-1 md:shadow-xl shadow-lg dark:shadow-gray-500 rounded-xl h-13  bg-white dark:bg-gray-400 transition-all ease-in-out duration-200 hover:scale-85"
            onClick={() => {
              onSearch(searchText);
            }}
          >
            🔍
          </button>
          <button
            data-testid="filterBtn"
            className="px-2.5 my-2 border-b-1 md:shadow-xl shadow-lg dark:shadow-gray-500 rounded-xl h-13 bg-white dark:bg-gray-400  transition-all ease-in-out duration-200 hover:scale-85"
            onClick={() => {
              //now filter shows the best out searched
              const filteredList = dummyResList.filter(
                //filter resList with restaurants having ratings over 4 star
                (res) => res.info.avgRating > 4.4
              );
              //pass the filteredList to NewResList
              setDummyResList(filteredList);
            }}
          >
            <img className="w-5" src={filterIcon}></img>
          </button>
          <button
            className="px-2.5 my-2 ml-2 border-b-1 md:shadow-xl shadow-lg dark:shadow-gray-500 rounded-xl h-13 bg-white dark:bg-gray-400  transition-all ease-in-out duration-200 hover:scale-85"
            onClick={() => {
              setDummyResList(newResList);
              setSearchText("");
            }}
            disabled={newResList?.length === dummyResList?.length}
          >
            <img className="w-5" src={resetIcon}></img>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {/**Optional chaining */}
        {dummyResList?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {/**here we are rendering our ResCard
             * We will render our cards according to their isOpen status
             */}
            {restaurant.info.avgRating >= 4 &&
            restaurant.info.sla.deliveryTime <= 30 ? (
              <ResOpen resData={restaurant} />
            ) : (
              <ResCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
