//import { useState } from "react";
import FoodItemList from "./FoodItemList";

const FoodCategory = ({ index, data, showItems, setShowIndex }) => {
  const handleClick = () => {
    // if already expanded accordian is found --> set index to null --> collapse all
    if (showItems) {
      setShowIndex(null); // collapse if already open
    } else {
      // if currently clicked accordian is collapsed, pass that index to parent via showIndex to expand particular accordian using showItems
      setShowIndex(index); // expand the clicked one
    }
  };

  return (
    <div>
      <div className="my-2.5 p-2 shadow-2xl dark:shadow-gray-400 border-black dark:border-white border-b rounded-lg bg-cyan-300 dark:bg-gray-800 ">
        {/* {Header} */}
        <div
          className="flex justify-between font-semibold cursor-pointer md:text-base text-sm"
          onClick={handleClick}
        >
          <span>
            {data.title} ({data.itemCards.length})
          </span>
          {/* Yahan bhayankr catch haiiii.... */}
          <span>{showItems ? "⬆️" : "⬇️"}</span>
        </div>
        {/* {Content} */}
        {/* When showItems is found true for a particualr index, it loads the item list */}
        <div>{showItems && <FoodItemList items={data.itemCards} />}</div>
      </div>
    </div>
  );
};
export default FoodCategory;
