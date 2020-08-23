import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";


it("matches snapshot", function() {
  let item = { title: "CEO", salary: 1000000, equity: 10 };
  const { asFragment } = render(<JobCard item={item} />);
  expect(asFragment()).toMatchSnapshot();
});
