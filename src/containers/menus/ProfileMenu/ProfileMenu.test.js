import React from "react";
import { render } from "@testing-library/react";
import { ProfileMenu as Component } from "./index";

test("Render - Testing Message inside Profile Menu", () => {
  const { getByText } = render(<Component />);
  const linkElement = getByText(/Testing/i);
  expect(linkElement).toBeInTheDocument();
});
