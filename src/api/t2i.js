import { Get, Post } from "./request.js";
import { getServerUrl } from "./common.js";

export async function uploadImage(data) {
  const t2iAddr = await getT2IAddr();
  return await Post(`${t2iAddr}/upload/image`, data);
}
export async function getQueues() {
  const t2iAddr = await getT2IAddr();
  return await Get(`${t2iAddr}/queue`);
}
export async function queueT2I(data) {
  const t2iAddr = await getT2IAddr();
  return await Post(`${t2iAddr}/gapi/queue_prompt`, data);
}

export async function getTemplates() {
  const t2iAddr = await getT2IAddr();
  return await Get(`${t2iAddr}/gapi/templates`);
}

export async function getT2IAddr() {
  const { t2i_addr } = await getServerUrl();
  return `http://${t2i_addr}:8099`;
}
