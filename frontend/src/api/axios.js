import axios from "axios";

const API = axios.create({
  baseURL: "https://api.signart.lk/api"
});

export default API;
