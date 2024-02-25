import { Get } from "./request.js";

// let serverUrl = { t2i_addr: "http://123.123.110.133:8099" };
let serverUrl = null;
async function _getServerAddr() {
  return await Get(`/addr`);
}

async function getServerUrl() {
  if (!serverUrl) {
    const res = await _getServerAddr();
    serverUrl = res.data;
  }
  return serverUrl;
}

export { getServerUrl };
