import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";
import LoginSignUpForm from '../auth/LoginSignup';

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({login, signup}) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
    );

  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginSignUpForm login={login} signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies" >
          <CompanyList />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs" >
          <JobList />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle" >
          <CompanyDetail />
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
