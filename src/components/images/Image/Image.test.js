import React from "react";
import { render } from "@testing-library/react";
import { Image as Component } from "./index";

test("Render - Testing Message inside Image", () => {
  const { getByText } = render(
    <Component name="logo" alt="Testing">
      Testing
    </Component>
  );
  const linkElement = getByText(/Testing/i);
  expect(linkElement).toBeInTheDocument();
});
