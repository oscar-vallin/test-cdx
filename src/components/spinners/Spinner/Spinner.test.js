import React from "react";
import { render } from "@testing-library/react";
import { Spinner as Component } from "./index";

test("Render - Testing Message inside Image", () => {
  const { getByText } = render(<Component />);
  const linkElement = getByText(/Testing/i);
  expect(linkElement).toBeInTheDocument();
});
