# JOBLY

Jobly is a job searching app built with a React frontend, Express backend, and PostgreSQL database.

Users can sign up or log in, browse through a list of companies and their listed positions, and apply by clicking a button on the appropriate card. After initial
authentication through sign up or log in, a token will be assigned to a user that will allow them to access routes to jobs and companies. Authentication and 
authorization are implemented with JWT package. Search component has a debounce/throttle function for dynamic rendering of results.
