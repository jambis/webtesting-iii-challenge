import React from "react";
import { render, cleanup } from "@testing-library/react";
import Dashboard from "./Dashboard";

afterEach(cleanup);

describe("Dashboard component", () => {
  it("renders without crashing", () => {
    render(<Dashboard />);
  });

  it("Default state is open and unlocked", () => {
    const { queryByText } = render(<Dashboard />);

    expect(queryByText(/open/i)).toBeTruthy();
    expect(queryByText(/unlocked/i)).toBeTruthy();
  });
});
