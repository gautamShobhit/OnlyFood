/*since we are going to need multiple cards, 
we create seperate component for that to make it dynamic*/
import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addFavRes } from "../utils/favSlice";
const ResCard = (props) => {
  const dispatch = useDispatch();
  const { resData } = props;
  //destructuring the prop
  const { name, cuisines, avgRating, cloudinaryImageId, sla } = resData?.info;
  return (
    <div
      data-testid="ResCard"
      className="md:w-[220px] w-[170] flex-wrap md:m-[15px] m-2 p-2 border-black dark:border-white border-b md:shadow-xl shadow-lg dark:shadow-gray-500 rounded-lg font-poppins  transition-all duration-300 delay-100 ease-in-out hover:cursor-pointer bg-cyan-100 dark:bg-gray-800 hover:scale-105"
    >
      <img
        className="z-0 rounded-lg transition-all duration-300 delay-100 ease-in-out hover:scale-90"
        src={CDN_URL + cloudinaryImageId}
        alt="Dish Image"
      />
      <div className="flex justify-between">
        <h2 className="w-4/5 py-2 font-bold md:text-xl text-sm">{name}</h2>
        <button
          className={`w-1/5 md:text-xl transition-all ease-in-out duration-200 hover:scale-110 hover:-translate-y-1 hover:cursor-pointer hover:rotate-12`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(addFavRes(resData));
          }}
        >
          🩷
        </button>
      </div>
      <div className="md:text-base text-xs">
        <h4>Cuisine: {cuisines.join(", ")}</h4>
        <h4>Ratings: {avgRating} ⭐</h4>
        <h4>Delivery Time: {sla?.deliveryTime}mins ⏱️</h4>
      </div>
    </div>
  );
};

//Higher Order Component -->

export const isOpen = (ResCard) => {
  //returns enhanced component
  return (props) => {
    //This function returns dome jsx
    return (
      <div className="relative">
        <label className="z-10 p-2 bg-cyan-300 dark:bg-gray-600 rounded-lg md:text-sm text-xs font-semibold font-poppins  absolute border-black border dark:border-white ">
          Promoted👍
        </label>
        <ResCard {...props} />
      </div>
    );
  };
};

export default ResCard;
