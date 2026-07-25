import MenuShimmer from "./MenuShimmer";
import { useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import FoodCategory from "./FoodCategory";
import { useState } from "react";
import { CDN_URL } from "../utils/constants";

const ResMenu = () => {
  const { resId } = useParams();
  const resInfo = useResMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  if (resInfo === null) return <MenuShimmer />;

  // 📌 1. Safely handle both data formats (whether resInfo has .data or not)
  const rootData = resInfo?.data || resInfo;
  const cards = rootData?.cards || [];

  // 📌 2. Dynamically find the restaurant info card instead of hardcoding cards[2]
  const restaurantInfoCard = cards.find((c) => c?.card?.card?.info)?.card?.card
    ?.info;

  // 📌 3. Destructure with an empty object default ({}) as a safety net
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    areaName,
    sla,
    cloudinaryImageId,
  } = restaurantInfoCard || {};

  // 📌 4. Extract category cards dynamically
  const reqCards = cards.find((c) => c?.groupedCard);
  const finalCards = reqCards?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const categories = finalCards.filter(
    (cat) =>
      cat.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  );

  return (
    <div className="md:pt-[160px] pt-[90px] my-5 md:mx-[90px]">
      <div className="z-0 md:h-[280px] h-[200px] relative flex justify-center md:mx-[150px] font-poppins font-bold">
        <img
          className="-z-5 absolute h-full w-full overflow-hidden object-cover rounded-lg md:shadow-2xl shadow-xl dark:shadow-gray-400 border-black dark:border-white border-b"
          src={CDN_URL + cloudinaryImageId}
          alt="Restaurant Banner"
        />
        <div className="md:w-1/2 w-3/4 relative md:text-lg text-center my-auto rounded-lg backdrop-blur-md bg-white/40 dark:bg-black/40">
          <h1 className="md:p-2 p-[2px] md:text-5xl text-2xl">{name}</h1>
          <div className="md:text-base text-xs">
            <h3 className="md:p-2 p-[2px]">
              Ratings : {avgRating} ⭐ - {costForTwoMessage}
            </h3>
            <h3 className="md:p-2 p-[2px]">Cuisine : {cuisines?.join(", ")}</h3>
            <h3 className="md:p-2 p-[2px] pb-2">
              Outlet : {areaName} - {sla?.deliveryTime} mins ⏱️
            </h3>
          </div>
        </div>
      </div>

      <div className="font-poppins my-2.5 md:mx-[150px]">
        <div className="justify-items-center md:text-xl text-sm ">
          <h1>Menu</h1>
        </div>
        {categories?.map((category, index) => (
          <FoodCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={setShowIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ResMenu;
