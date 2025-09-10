import { BrowserRouter, json } from "react-router-dom";
import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ResMenu from "../ResMenu";
import MOCK_DATA from "../../__mocks__/mockResMenuData.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import Header from "../Header";
import Cart from "../Cart";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should render restaurant menu successfully....", async () => {
  //render
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <ResMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  //fetch add button from the screen
  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(16);
});

it("Should render add buttons in item list...", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <ResMenu />
        </Provider>
      </BrowserRouter>
    );
  });
  const addBtns = screen.getAllByRole("button", { name: "Add ➕" });
  expect(addBtns.length).toBe(16);
});

it("Should change number of cart items in header...", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ResMenu />
        </Provider>
      </BrowserRouter>
    );
  });
  expect(screen.getByText("Cart 🛒 - (0)")).toBeInTheDocument();
  //clicking on first add button
  const addBtns = screen.getAllByRole("button", { name: "Add ➕" });
  fireEvent.click(addBtns[0]);
  //this updates cart items in header
  expect(screen.getByText("Cart 🛒 - (1)")).toBeInTheDocument();
});

it("Should cross check cart items...", async () => {
  //render
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });
  //checking whether cart has those items or not
  expect(screen.getAllByTestId("cartItem").length).toBe(1);
});

it("Should clear cart after clicking clear btn", async () => {
  //render
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ResMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });
  //adding items to cart
  fireEvent.click(screen.getAllByRole("button", { name: "Add ➕" })[0]);
  fireEvent.click(screen.getAllByRole("button", { name: "Add ➕" })[1]);
  expect(screen.getAllByTestId("cartItem").length).toBe(2);
  //clearing cart
  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));
  //since cart is cleared, no items in cart hence can't check using test id cartItem
  expect(screen.getByText("Cart 🛒 - (0)")).toBeInTheDocument();
});
