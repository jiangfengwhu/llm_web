import { Get } from "./request.js";

// let serverUrl = { t2i_addr: "http://123.123.110.133:8099" };
let serverUrl = null;
let t2iAddr = null;
async function _getServerAddr() {
  return await Get(`/addr`);
}

async function getServerUrl() {
  if (!t2iAddr) {
    const res = await _getServerAddr();
    serverUrl = res.data;
    initSlaveAddr(serverUrl);
  }
  return t2iAddr;
}

function initSlaveAddr(serverConfig) {
  const { t2i_addr } = serverConfig ?? {};
  t2iAddr = t2i_addr ? `http://${t2i_addr}:8099` : null;
}

export { getServerUrl, t2iAddr };
