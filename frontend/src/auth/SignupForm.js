import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routed as /signup
 */


function SignupForm({ signup }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		first_name: "",
		last_name: "",
		email: "",
	});
	const [formErrors, setFormErrors] = useState([]);

	console.debug(
		"SignupForm",
		"signup=", typeof signup,
		"formData=", formData,
		"formErrors=", formErrors,
	);

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await signup(formData);
		if (result.success) {
			return <Redirect to="/companies" />
		} else {
			setFormErrors(result.errors);
		}
	}

	/** Update form data field */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({ ...data, [name]: value }));
	}

	return (
		<div className="SignupForm">
			<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
				<h2 className="mb-3">Sign Up</h2>
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Username</label>
								<input
									name="username"
									className="form-control"
									value={formData.username}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									name="password"
									className="form-control"
									value={formData.password}
									onChange={handleChange}
								/>
							</div>

							<div className="form-group">
								<label>First name</label>
								<input
									name="first_name"
									className="form-control"
									value={formData.first_name}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Last name</label>
								<input
									name="last_name"
									className="form-control"
									value={formData.last_name}
									onChange={handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									name="email"
									className="form-control"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>

							{formErrors.length
								? <Alert type="danger" messages={formErrors} />
								: null
							}

							<button
								type="submit"
								className="btn btn-primary float-right"
								onSubmit={handleSubmit}
							>
								Submit
            </button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;