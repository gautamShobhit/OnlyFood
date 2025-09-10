import Contact from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Contact component Test Cases", () => {
  test("Loading Contact component.....", () => {
    //Rendering the component
    render(<Contact />);
    //Ouerying
    //testing whether heading loads or not
    const heading = screen.getByRole("heading");
    //Assertion
    expect(heading).toBeInTheDocument();
  });

  it("Loading button in Contact component.....", () => {
    render(<Contact />);
    //testing whether button loads or not
    const button = screen.getByText("Submit");
    expect(button).toBeInTheDocument();
  });

  it("Loading placeholder of input in Contact component.....", () => {
    render(<Contact />);
    //testing whether input loads or not
    const input = screen.getByPlaceholderText("Your Name");
    expect(input).toBeInTheDocument();
  });

  test("Checking whether we have 2 input boxes on webpage or not", () => {
    render(<Contact />);

    const inputBoxes = screen.getAllByRole("textbox");
    //here inputBoxes becomes a list containing all input
    expect(inputBoxes.length).toBe(2);
    //can also use a 'not'
    //expect(inputBoxes.length).not.toBe(<any value other than 2>);
  });
});
