import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router";

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
