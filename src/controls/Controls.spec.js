import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Controls from "./Controls";

afterEach(cleanup);

describe("Controls Component", () => {
  it("renders without crashing", () => {
    render(<Controls />);
  });

  it("Open and unlocked, Close button is enabled and lock button disabled", () => {
    const closeMock = jest.fn();
    const lockMock = jest.fn();

    const { getByText } = render(
      <Controls
        closed={false}
        locked={false}
        toggleClosed={closeMock}
        toggleLocked={lockMock}
      />
    );
    const closeBtn = getByText(/close gate/i);
    const lockBtn = getByText(/^lock gate$/i);

    expect(closeBtn.disabled).toBeFalsy();
    expect(lockBtn.disabled).toBeTruthy();

    fireEvent.click(closeBtn);
    expect(closeMock).toBeCalled();

    fireEvent.click(lockBtn);
    expect(lockMock).not.toBeCalled();
  });

  it("Closed and unlocked, both buttons are enabled", () => {
    const closeMock = jest.fn();
    const lockMock = jest.fn();

    const { getByText } = render(
      <Controls
        closed={true}
        locked={false}
        toggleClosed={closeMock}
        toggleLocked={lockMock}
      />
    );
    const closeBtn = getByText(/open gate/i);
    const lockBtn = getByText(/^lock gate$/i);

    expect(closeBtn.disabled).toBeFalsy();
    expect(lockBtn.disabled).toBeFalsy();

    fireEvent.click(closeBtn);
    expect(closeMock).toBeCalled();
    fireEvent.click(lockBtn);
    expect(lockMock).toBeCalled();
  });

  it("Closed toggle button is disabled if the gate is locked", () => {
    const closeMock = jest.fn();
    const lockMock = jest.fn();

    const { getByText } = render(
      <Controls
        closed={true}
        locked={true}
        toggleClosed={closeMock}
        toggleLocked={lockMock}
      />
    );
    const closeBtn = getByText(/open gate/i);
    const lockBtn = getByText(/unlock gate/i);

    expect(closeBtn.disabled).toBeTruthy();
    expect(lockBtn.disabled).toBeFalsy();

    fireEvent.click(closeBtn);
    expect(closeMock).not.toBeCalled();

    fireEvent.click(lockBtn);
    expect(lockMock).toBeCalled();
  });
});
