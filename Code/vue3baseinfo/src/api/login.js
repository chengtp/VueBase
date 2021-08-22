/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import service from "../utils/request";

/**
 * 登录
 */
export function Login(data) {
  return service.request({ method: "post", url: "/login", data });
}
