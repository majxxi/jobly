import React from "./node_modules/react";
import { render } from "./node_modules/@testing-library/react";
import { MemoryRouter } from "./node_modules/react-router";
import Home from "./Homepage";
import { UserProvider } from "../testUtils";


it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Home />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider currentUser={null}>
        <Home />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
