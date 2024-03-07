import { Get, Post } from "./request.js";
import { t2iAddr } from "./common.js";

export async function uploadImage(data) {
  return await Post(`${t2iAddr}/upload/image`, data);
}
export async function getQueues() {
  return await Get(`${t2iAddr}/queue`);
}
export async function queueT2I(data) {
  return await Post(`${t2iAddr}/gapi/queue_prompt`, data);
}

export async function getTemplates() {
  return await Get(`${t2iAddr}/gapi/templates`);
}

export async function getHome() {
  return await Get(`${t2iAddr}/gapi/home`);
}
