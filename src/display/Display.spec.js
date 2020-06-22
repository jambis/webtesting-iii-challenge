import React from "react";
import { render, cleanup } from "@testing-library/react";
import Display from "./Display";

afterEach(cleanup);

describe("Display Component", () => {
  it("renders without crashing", () => {
    render(<Display />);
  });

  it("Text display open and unlocked when closed and locked are false", () => {
    const { queryByText } = render(<Display closed={false} locked={false} />);
    expect(queryByText(/unlocked/i)).toBeTruthy();
    expect(queryByText(/open/i)).toBeTruthy();
  });

  it("Displays text closed and unlocked when closed is true and locked is false", () => {
    const { queryByText } = render(<Display closed={true} locked={false} />);
    expect(queryByText(/unlocked/i)).toBeTruthy();
    expect(queryByText(/closed/i)).toBeTruthy();
  });

  it("Displays text closed and locked when closed and locked are true", () => {
    const { queryByText } = render(<Display closed={true} locked={true} />);
    expect(queryByText(/^locked$/i)).toBeTruthy();
    expect(queryByText(/closed/i)).toBeTruthy();
  });

  it("Divs have classnames green-led when false", () => {
    const { getByText } = render(<Display closed={false} locked={false} />);
    const unlock = getByText(/unlocked/i);
    const open = getByText(/open/i);
    expect(unlock.className).toMatch(/green-led/i);
    expect(open.className).toMatch(/green-led/i);
  });

  it("Divs have classnames red-led when true", () => {
    const { getByText } = render(<Display closed={true} locked={true} />);
    const locked = getByText(/^locked$/i);
    const closed = getByText(/closed/i);
    expect(locked.className).toMatch(/red-led/i);
    expect(closed.className).toMatch(/red-led/i);
  });
});
