import axios, { AxiosInstance } from "axios";
import { authToken } from "../token/AuthToken";

const baseUrl = "http://localhost:5000/";

export class Axios {
  private static baseUrl: string = baseUrl;
  private static token: string =
    typeof authToken?.get === "function" ? authToken.get() : "";
  private static axiosInstance: AxiosInstance | null = null;
  private constructor() {}

  public static get instance(): AxiosInstance | null {
    if (!this.axiosInstance) {
      this.createInstance();
    }
    return this.axiosInstance;
  }

  private static createInstance() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
    });
  }
}

export default Axios.instance as AxiosInstance;
