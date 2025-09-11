import { useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
const FavRes = () => {
  const favItems = useSelector((store) => store.favRest.items);

  return favItems.length === 0 ? (
    <h1 className="md:pt-40 pt-[100px] p-4 flex justify-center font-poppins text-center md:text-lg text-sm font-semibold ">
      You don't have any favourites yet 🙄 !!
    </h1>
  ) : (
    <div className="md:pt-[160px] pt-[100px] flex flex-wrap justify-center">
      {favItems.map((favItem) => (
        //<Link to={"/restaurant/" + favItem?.info.id}>
        <div
          key={favItem?.info.id}
          className="flex w-[420px] flex-wrap m-[15px] p-2 border-black dark:border-white border-b md:shadow-2xl shadow-lg dark:shadow-gray-400 rounded-lg font-poppins  transition-all duration-300 delay-100 ease-in-out hover:cursor-pointer bg-cyan-100 dark:bg-gray-800 hover:scale-105"
        >
          <div className="w-5/12">
            <img
              className="z-0 rounded-lg"
              src={CDN_URL + favItem?.info.cloudinaryImageId}
              alt="Dish Image"
            />
          </div>

          <div className="w-7/12 pl-2">
            <h2 className="py-2 font-bold md:text-xl text-sm">
              {favItem?.info.name}
            </h2>
            <div className="md:text-base text-xs">
              <h4>Cuisine: {favItem?.info.cuisines.join(", ")}</h4>
              <h4>Ratings: {favItem?.info.avgRating} ⭐</h4>
              <h4>Delivery Time: {favItem?.info.sla?.deliveryTime}mins ⏱️</h4>
            </div>
          </div>
        </div>
        //</Link>
      ))}
    </div>
  );
};
export default FavRes;
