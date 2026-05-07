import axios from "axios";

const API = axios.create({
  baseURL: "https://api.signart.lk"
});

export default API;