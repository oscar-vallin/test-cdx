import React from "react";
import { render } from "@testing-library/react";
import { Button as Component } from "./index";

test("Render - Testing Message inside Button", () => {
  const { getByText } = render(<Component>Testing</Component>);
  const linkElement = getByText(/Testing/i);
  expect(linkElement).toBeInTheDocument();
});
