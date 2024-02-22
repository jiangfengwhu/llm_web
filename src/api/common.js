import { Get } from "./request.js";
const gatewayUrl = import.meta.env.PROD
  ? "http://localhost:3000/"
  : "http://localhost:8081/";
export async function getServerAddr() {
  return await Get(`${gatewayUrl}/addr`);
}
