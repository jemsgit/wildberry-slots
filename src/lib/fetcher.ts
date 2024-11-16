import axios, { AxiosInstance } from "axios";

class Fetcher {
  instance: AxiosInstance;
  constructor(baseURL: string, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // GET method
  async get(url, params = {}) {
    return this.instance.get(url, { params });
  }

  // POST method
  async post(url, data) {
    return this.instance.post(url, data);
  }

  // PUT method
  async put(url, data) {
    return this.instance.put(url, data);
  }

  // DELETE method
  async delete(url) {
    return this.instance.delete(url);
  }
}

// Create a singleton fetcher instance
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
const fetcher = new Fetcher(baseURL);

export default fetcher;