import { render, screen } from "@testing-library/react";
import ResCard from "../ResCard";
import MOCK_DATA from "../../__mocks__/mockResData.json";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

it("Should render the ResCard component successfully....", () => {
  //Since our ResCard is takings props to render
  //We need to provide mock props here also
  render(
    <Provider store={appStore}>
      <ResCard resData={MOCK_DATA} />
    </Provider>
  );
  //Query
  const resName = screen.getByText("Burger King");
  //Assert
  expect(resName).toBeInTheDocument();
});
