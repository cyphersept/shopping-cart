import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import Home from "~/routes/home";
import { Footer } from "~/components/Footer";

// Tests
describe("Display footer", async () => {
  it("Matches snapshot", async () => {
    render(<Footer />);
    screen.debug();
    let text = screen.queryByText("Sign up ");
    console.log(text?.textContent);
    expect(text?.textContent).toMatchSnapshot();
  });
});

// describe("Display homepage correctly", async () => {
//   it("Should display title", async () => {
//     render(<Home />);
//     expect(screen.getByRole("heading").textContent).toMatch(/natural cure/i);
//   });
// });
