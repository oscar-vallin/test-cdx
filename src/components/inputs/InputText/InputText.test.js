import React from "react";
import { render } from "@testing-library/react";
import { InputText as Component } from "./index";

test("Render - Testing Message inside InputText", () => {
  const { getByText } = render(<Component placeholder="Testing" />);
  const linkElement = getByText(/Testing/i);
  expect(linkElement).toBeInTheDocument();
});
