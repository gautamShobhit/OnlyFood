import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import credit from "../assets/credit.jpg";
import cash_on_delivery from "../assets/cash_on_delivery.jpg";
import pay_accept from "../assets/pay_accept.jpg";
import internet_banking from "../assets/internet_banking.jpg";
import money from "../assets/money.jpg";
import { useState } from "react";

const Cart = () => {
  //to read cartv info
  //we will use useSelector hook
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState("");
  const payMethods = [
    { name: "UPI", img: pay_accept },
    { name: "Net Banking", img: internet_banking },
    { name: "Credit Card", img: credit },
    { name: "COD", img: cash_on_delivery },
  ];

  const totalAmount = cartItems.reduce((total, item) => {
    const price =
      item.card.info.price / 100 || item.card.info.defaultPrice / 100 || 0;
    return total + price * item.quantity;
  }, 0);

  return cartItems.length === 0 ? (
    <h1 className="md:pt-40 pt-[100px] p-4 flex justify-center font-poppins text-center md:text-lg text-sm font-semibold  ">
      Hmm... 😖 Nothing in your cart yet. Please Add Items to your Cart first !!
    </h1>
  ) : (
    <div className="md:pt-[160px] pt-[100px] md:w-8/12 m-auto font-poppins ">
      <div className="flex my-5 justify-between">
        <div className="m-2.5 md:text-xl font-semibold">Cart 🛒</div>
        <button
          className="p-2 bg-cyan-300 dark:bg-gray-800 rounded-lg text-sm font-semibold font-poppins  border-b-1 shadow-2xl hover:cursor-pointer"
          onClick={() => {
            //clear list
            dispatch(clearCart());
          }}
        >
          Clear Cart
        </button>
      </div>

      <div className="my-2.5 p-2 shadow-2xl dark:shadow-gray-400 border-b-1 rounded-lg bg-cyan-300 dark:bg-gray-800 md:text-md text-sm">
        {cartItems.map((cartItem) => (
          <div
            data-testid="cartItem"
            key={cartItem.card.info.id}
            className="p-2 mx-2 my-4 border-b-1 shadow-lg dark:shadow-gray-400 rounded-lg flex justify-between bg-cyan-200 dark:bg-cyan-800"
          >
            <div className="md:w-10/12 w-3/4 mr-4">
              <span className="font-semibold">{cartItem.card.info.name}</span>
              <span className="font-semibold pl-1.5">
                - ₹
                {cartItem.card.info.price / 100 ||
                  cartItem.card.info.defaultPrice / 100}
              </span>
              <p className="hidden md:block text-sm">
                {cartItem.card.info.description}
              </p>
            </div>

            <div className="md:w-2/12 w-1/4 flex justify-center">
              <img
                src={CDN_URL + cartItem.card.info.imageId}
                className="rounded-lg m-2 md:h-32 h-fit "
              />
              <div className="md:text-md text-xs md:w-20 w-14 md:h-8 h-6 md:-mt-0 -mt-[6px] bg-cyan-400 dark:bg-gray-800 rounded-lg font-semibold z-10 absolute flex justify-between">
                <button
                  className="border-1 w-1/3 bg-cyan-300 dark:bg-cyan-800 rounded-lg transition-all ease-in-out duration-300 hover:scale-90 hover:cursor-pointer"
                  onClick={() => {
                    //dispatch an action
                    dispatch(removeItem(cartItem));
                  }}
                >
                  -
                </button>
                <h1 className="my-auto">{cartItem.quantity}</h1>
                <button
                  className="border-1 w-1/3 bg-cyan-300 dark:bg-cyan-800 rounded-lg transition-all ease-in-out duration-300 hover:scale-90 hover:cursor-pointer"
                  onClick={() => {
                    //Increase the count
                    dispatch(addItem(cartItem));
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 shadow-2xl dark:shadow-gray-400 border-b-1 rounded-lg bg-cyan-300 dark:bg-gray-800  font-bold md:flex ">
        <div className="md:w-1/2 h-fit p-2 m-2 border-b-1 shadow-lg rounded-lg bg-cyan-200 dark:bg-cyan-900">
          <h1 className="text-center border-0 rounded-lg bg-cyan-300 dark:bg-gray-800  p-2 mb-4">
            Order Summary
          </h1>
          {cartItems.map((cartItem) => (
            <div
              data-testid="cartItem"
              key={cartItem.card.info.id}
              className="flex justify-between md:text-sm text-xs mb-2"
            >
              <span className="md:font-semibold">
                {cartItem.card.info.name} × {cartItem.quantity}
              </span>
              <span className="md:font-semibold pl-1.5">
                ₹
                {(
                  (cartItem.card.info.price / 100 ||
                    cartItem.card.info.defaultPrice / 100) * cartItem.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="text-center border-0 rounded-lg bg-cyan-300 dark:bg-gray-800 p-2 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="md:w-1/2 h-fit p-2 m-2 border-b-1 shadow-lg rounded-lg bg-cyan-200 dark:bg-cyan-900">
          <h1 className="text-center border-0 rounded-lg bg-cyan-300 dark:bg-gray-800 p-2 mb-2">
            Select a Payment Method
          </h1>
          <div className="flex mb-2">
            {/* Map over the payMethods */}
            {payMethods.map((method) => (
              <div
                key={method.name}
                onClick={() => setIsSelected(method.name)}
                className={`rounded-lg bg-cyan-300 dark:bg-gray-800 p-2 m-2 w-1/4 text-center text-sm font-normal transition-all ease-in-out duration-200 ${
                  isSelected === method.name
                    ? "ring-2 ring-black dark:ring-white scale-90"
                    : "border-0"
                }`}
              >
                <img className="p-2" src={method.img} alt="Payment Method" />
                {method.name}
              </div>
            ))}
          </div>

          <button className="flex justify-center border-1 w-full text-center rounded-lg bg-cyan-500 dark:bg-gray-800 p-2 transition-all ease-in-out delay-50 duration-200 hover:bg-cyan-600 hover:dark:bg-cyan-900 hover:cursor-pointer hover:text-white ">
            <h1 className="mx-4">Click to Pay</h1>
            <img className="w-6 h-6" src={money} alt="pay" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
