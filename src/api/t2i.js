import { Get, Post } from "./request.js";
import { getServerUrl } from "./common.js";

export async function uploadImage(data) {
  const { t2i_addr } = await getServerUrl();
  return await Post(`http://${t2i_addr}:8099/upload/image`, data);
}

export async function queueT2I(data) {
  const { t2i_addr } = await getServerUrl();
  return await Post(`http://${t2i_addr}:8099/gapi/queue_prompt`, data);
  // return await Post(`http://localhost:8010/t2i_api/queue_prompt`, data);
}

export async function getTemplates() {
  const { t2i_addr } = await getServerUrl();
  return await Get(`http://${t2i_addr}:8099/gapi/templates`);
}
