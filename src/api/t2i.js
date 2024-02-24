import { Post } from "./request.js";
import { getServerUrl } from "./common.js";

export async function uploadImage(data) {
  const apiUrl = (await getServerUrl()).t2i_addr;
  return await Post(`${apiUrl}/upload/image`, data);
}

export async function queueT2I(data) {
  const apiUrl = (await getServerUrl()).t2i_addr;
  return await Post(`${apiUrl}/prompt`, data);
}
