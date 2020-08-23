import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from './JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobList() {
  console.debug("JobList");

  const [jobs, setJobs] = useState(null);

  useEffect(function getAllJobsOnMount() {
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(search) {
    let jobs = await JoblyApi.getJobs(search);
    setJobs(jobs);
  }

  /** Apply for job: save to API and update that job in jobs state. */
  async function apply(id) {
    let message = await JoblyApi.applyToJob(id);
    setJobs(j => j.map(job =>
      job.id === id ? { ...job, state: message } : job
    ));
  }

  if (!jobs) return <LoadingSpinner />;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <Search searchFor={search} />
      {jobs.length
        ? <JobCardList jobs={jobs} apply={apply} />
        : <p className="lead">Sorry, no results were found!</p>
      }
    </div>
  );
}

export default JobList;
