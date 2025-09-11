import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
const FoodItemList = ({ items }) => {
  //console.log(items);
  const dispatch = useDispatch();
  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 mx-2 my-4 border-black dark:border-white border-b shadow-lg dark:shadow-gray-400 rounded-lg flex md:justify-between bg-cyan-200 dark:bg-cyan-800 md:text-base text-xs"
        >
          <div className="md:w-10/12 w-3/4 mr-4">
            <span className="font-semibold md:text-lg">
              {item.card.info.name}
            </span>
            <span className="font-semibold pl-1.5">
              - ₹
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </span>
            <p className="hidden md:block md:text-sm text-[10px] pt-[5px] ">
              {item.card.info.description}
            </p>
            <button
              className="mt-1 absolute block md:hidden z-10 p-2 bg-cyan-400 dark:bg-gray-800 rounded-lg md:text-xs text-[11px] font-semibold  transition-all ease-in-out duration-300 hover:scale-90 hover:cursor-pointer"
              onClick={() => {
                //dispatch an action
                dispatch(addItem(item));
              }}
            >
              Add to Cart
            </button>
          </div>
          <div className="md:w-2/12 w-1/4 flex justify-center">
            <button
              className="hidden md:block md:-mt-0 -mt-[6px] z-10 md:p-2 p-[3px] bg-cyan-400 dark:bg-gray-800 rounded-lg md:text-xs text-[8px] font-semibold absolute transition-all ease-in-out duration-300 hover:scale-90 hover:cursor-pointer  "
              onClick={() => {
                //dispatch an action
                dispatch(addItem(item));
              }}
            >
              Add ➕
            </button>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="rounded-lg m-2 md:h-32 h-fit"
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FoodItemList;
