import axios from "axios";
import { BASE_URL } from "./api";

const axiosIntense = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosIntense;
