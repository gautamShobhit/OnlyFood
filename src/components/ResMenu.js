import MenuShimmer from "./MenuShimmer";
import { useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import FoodCategory from "./FoodCategory";
import { useState } from "react";
import { CDN_URL } from "../utils/constants";

const ResMenu = () => {
  const { resId } = useParams();
  //Custom hook which handles other tasks
  //Below, this hook is responsible for getting
  //the data to resMenu for displaying it
  const resInfo = useResMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

  if (resInfo === null) return <MenuShimmer />;
  //Destructuring
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    areaName,
    sla,
    cloudinaryImageId,
  } = resInfo?.cards[2]?.card?.card?.info;

  //Defensive Destructuring
  // const menuCards =
  //   resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  // const itemCards = menuCards?.itemCards;
  //derives different categpries for food items

  //Swiggy API changes it's structure with the display size also
  //Hence we need to dynamically fetch relevant data from the API data

  const cards = resInfo?.cards || [];
  const reqCards = cards.find((c) => c?.groupedCard);
  const finalCards = reqCards?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const categories = finalCards.filter(
    (cat) =>
      cat.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="md:pt-38 pt-[90px] my-5 md:mx-[90px]">
      <div className="z-0 md:h-[280px] h-[200px] relative flex justify-center md:mx-[150px] font-poppins  font-bold">
        <img
          className="-z-5 absolute h-full w-full overflow-hidden object-cover rounded-lg md:shadow-2xl shadow-xl dark:shadow-gray-400 border-b-1"
          src={CDN_URL + cloudinaryImageId}
          alt="Restaurant Banner"
        />
        <div className="md:w-1/2 w-3/4 relative md:text-lg text-center my-auto rounded-lg backdrop-blur-md bg-white/40  dark:bg-black/40">
          <h1 className="md:p-2 p-[2px] md:text-5xl text-2xl">{name}</h1>
          <div className="md:text-base text-xs">
            <h3 className="md:p-2 p-[2px]">
              Ratings : {avgRating} ⭐ - {costForTwoMessage}
            </h3>
            <h3 className="md:p-2  p-[2px]">Cuisine : {cuisines.join(", ")}</h3>
            <h3 className="md:p-2 p-[2px] pb-2">
              Outlet : {areaName} - {sla?.deliveryTime} mins ⏱️
            </h3>
          </div>
        </div>
      </div>

      <div className="font-poppins  my-2.5 md:mx-[150px]">
        <div className="justify-items-center md:text-xl text-sm ">
          <h1>Menu</h1>
        </div>
        {categories?.map((category, index) => (
          <FoodCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            // Lifting State-Up -->
            // showItems is used to mark expanded status of an accordian
            // An accordian is expanded when --> showItems for a particular index is marked true
            // Index to be expanded is provided by showIndex
            // Hence Parent controls child lists
            showItems={index === showIndex ? true : false}
            setShowIndex={setShowIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
export default ResMenu;
