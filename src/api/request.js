import axios from "axios";
const baseURL = import.meta.env.PROD
  ? "http://120.46.72.66/"
  : "http://120.46.72.66/";
const instance = axios.create({
  baseURL,
  timeout: 3000,
});
instance.interceptors.response.use(
  function (response) {
    return response.data ?? { code: "-1", msg: "no data" };
  },
  function (error) {
    return Promise.resolve({ code: "-1", msg: error.response });
  },
);

async function Get(url, options) {
  return instance.get(url, options);
}

async function Post(url, data, options) {
  return instance.post(url, data, options);
}

export { Get, Post };
