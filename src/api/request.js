import axios from "axios";
const baseURL = import.meta.env.PROD
  ? "http://localhost:3000/"
  : "http://localhost:8080/";
const instance = axios.create({
  baseURL,
  timeout: 3000,
});
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.resolve({ code: "-1", msg: error.toString() });
  },
);

async function Get(url, options) {
  return instance.get(url, options);
}

async function Post(url, data, options) {
  return instance.post(url, data, options);
}

export { Get, Post };
