import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore.js";
import "@testing-library/jest-dom";

test("Should load the login button in header component....", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //Query
  const loginBtn = screen.getByRole("button", { name: "Log-in" });
  //Assert
  expect(loginBtn).toBeInTheDocument();
});
test("Should render the cart with 0 items in header component....", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //Query
  //const cartItems = screen.getByText("Cart 🛒 - (0)");
  //Can also use rejex if we don't want to type out full name
  const cartItems = screen.getByText(/Cart/);
  //Assert
  expect(cartItems).toBeInTheDocument();
});
//simulating events
test("Should change the login button on click in header component....", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //Query
  const loginBtn = screen.getByRole("button", { name: "Log-in" });

  fireEvent.click(loginBtn);
  //Above code simulates the click event on login button
  // which changes it to current user
  //const user = screen.getByText("Ronit");
  const user = screen.getByRole("button", { name: /Shobhit/ });
  //Assert
  expect(user).toBeInTheDocument();
});
