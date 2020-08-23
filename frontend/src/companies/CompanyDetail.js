import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import JobCardList from '../jobs/JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 */

function CompanyDetail() {
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);
  console.debug("Company", "handle=", handle, "currentUser=", currentUser);

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompanyAndJobs() {
      const { jobs } = currentUser;
      const c = await JoblyApi.getCompany(handle);

      // grab a set of IDs of jobs applied to
      const jobsIDsAppliedTo = new Set(jobs.map(job => job.id));

      // add key for each job in company if it is applied to ---
      // this let us handle the "apply/applied" button
      c.jobs = c.jobs.map(job => ({
        ...job,
        state: jobsIDsAppliedTo.has(job.id) ? "applied" : null
      }));

      setCompany(c);
    }

    getCompanyAndJobs();
  }, [handle, currentUser]);

  /** save application of job to backend and reload company data */
  async function apply(id) {
    if (company) {
      let message = await JoblyApi.applyToJob(id);
      setCompany(c => ({
        ...c,
        jobs: c.jobs.map(job =>
          job.id === id ? { ...job, state: message } : job
        )
      }));
    }
  }

  if (!company) return <LoadingSpinner />

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4 className="text-capitalize">{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} apply={apply} />
    </div>
  );
}

export default CompanyDetail;
