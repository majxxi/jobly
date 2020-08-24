import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://jobly-demo-mt.herokuapp.com";

class JoblyApi {
  static async request(endpoint, params = {}, verb = "get") {
    console.debug("API Call:", endpoint, params, verb);

    const _token = localStorage.getItem('token');

    const data = (verb === "get")
      ? { params: { _token, ...params } } // GET
      : { _token, ...params };           // POST,PATCH


    const req = axios[verb](`${BASE_URL}/${endpoint}`, data);

    try {
      return (await req).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Indiv API routes

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getCompanies(search) {
    let res = await this.request("companies", { search });
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(search) {
    let res = await this.request("jobs", { search });
    return res.jobs;
  }

  static async applyToJob(id) {
    let res = await this.request(`jobs/${id}/apply`, {}, "post");
    return res.message;
  }

  static async login(data) {
    let res = await this.request(`login`, data, "post");
    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`users`, data, "post");
    return res.token;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default JoblyApi;
