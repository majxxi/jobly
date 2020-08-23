import React, { useState, useCallback } from "react";
import "./SearchForm.css";
import { debounce } from 'lodash';

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm);
  }

  /** Update form fields with debouncing */
  const delayedQuery = useCallback(debounce(q => searchFor(q), 1000, {trailing:true}), []);
  
  function handleChange(event){
    setSearchTerm(event.target.value);
    delayedQuery(event.target.value);
  };

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="searchTerm"
          placeholder="Enter search term.."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
