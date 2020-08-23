import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import jobly_title from "./jobly_title.png";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <img className="title" src={jobly_title} alt="title" />
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser
          ? <h2>
              Welcome Back, {currentUser.first_name || currentUser.username}!
            </h2>
          : (
            <p>
              <Link className="btn btn-primary font-weight-bold" to="/login">
                Log in / Sign up
              </Link>
            </p>
          )}
      </div>
    </div>
  );
}

export default Homepage;
