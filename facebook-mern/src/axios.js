import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  // baseURL: "http://localhost:9000/",
});

export default instance;
