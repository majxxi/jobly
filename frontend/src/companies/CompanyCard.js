import React from "react";
import { Link } from "react-router-dom";

import defaultLogo from "./default-logo.png";
import "./CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 */

function CompanyCard({ name, description, logo_url, handle }) {
  console.debug("CompanyCard", logo_url);

  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize">{name}</span>
          <img src={logo_url || defaultLogo} alt={`${name} Logo`} />
        </h6>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
