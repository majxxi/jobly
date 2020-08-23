import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";


it("matches snapshot with logo", function () {
  const { asFragment } = render(
    <CompanyCard
      handle="rithm"
      name="Rithm School"
      description="Become an exceptional developer in 16 weeks."
      logo_url="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function () {
  const { asFragment } = render(
    <CompanyCard
      handle="algo"
      name="Algo School"
      description="Become a mediocre developer in 160 weeks."
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
