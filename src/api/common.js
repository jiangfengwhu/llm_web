import { Get } from "./request.js";

let serverUrl = { t2i_addr: "http://123.123.110.133:8099" };

async function _getServerAddr() {
  return await Get(`/gateway/addr`);
}

async function getServerUrl() {
  if (!serverUrl) {
    const res = await _getServerAddr();
    console.log(res, "zxzx");
    serverUrl = res.data;
  }
  return serverUrl;
}

export { getServerUrl };
