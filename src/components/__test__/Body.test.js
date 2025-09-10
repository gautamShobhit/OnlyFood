import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import MOCK_DATA from "../../__mocks__/mockResListData.json";
import Body from "../Body";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  //This function will mimic fetch funtiopn of browser
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should render Search List for burger search input in Body component successfully...", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Body />
        </Provider>
      </BrowserRouter>
    )
  );

  //Query
  //Checking before search
  const resCardsBefore = screen.getAllByTestId("ResCard");
  expect(resCardsBefore.length).toBe(20);
  //Fetching search button for further use
  const searchBtn = screen.getByRole("button", { name: "🔍" });
  //Fetching input box to change search text
  const searchInput = screen.getByTestId("searchInput");
  //changing search text
  fireEvent.change(searchInput, { target: { value: "burger" } });
  fireEvent.click(searchBtn);
  const resCardsAfter = screen.getAllByTestId("ResCard");
  //After search
  expect(resCardsAfter.length).toBe(2);
});

it("Should filter most relevant restaurants on clicking filter button", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Body />
        </Provider>
      </BrowserRouter>
    )
  );
  //Query
  //Checking before search
  const resCardsBefore = screen.getAllByTestId("ResCard");
  expect(resCardsBefore.length).toBe(20);
  //fetch filter button first
  const filterBtn = screen.getByTestId("filterBtn");
  //click filter button
  fireEvent.click(filterBtn);
  const filteredCards = screen.getAllByTestId("ResCard");
  expect(filteredCards.length).toBe(7);
});
