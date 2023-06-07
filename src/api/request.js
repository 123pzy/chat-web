import instance from "./index.js";
import { baseURL } from "./config";

const path = import.meta.env.MODE == "development" ? "/api" : "";

// 登录请求
export const loginAxios = (data = {}) => {
  return instance({
    method: "POST",
    url: path + "/login",
    data,
  });
};

// 注册账户请求
export const registerAxios = (data = {}) => {
  return instance({
    method: "POST",
    url: path + "/register",
    data,
  });
};

// chatGPT可用次数减一
export const deleteRemainTimes = (username) => {
  return instance({
    method: "DELETE",
    url: path + `/profile/${username}`,
  });
};

// 获取剩余次数
export const getRemainTimes = (params) => {
  return instance({
    url: path + "/profile/getremaintimes",
    params,
  });
};

// 获取用户名
export const getUsername = (params) => {
  return instance({
    url: path + "/profile/getusername",
    params,
  });
};

// 修改用户名
export const updateUsername = (data) => {
  return instance({
    method: "PUT",
    url: path + "/profile/changeusername",
    data,
  });
};

// 导航守卫
export const judgmentIsLogin = (data) => {
  return instance({
    method: "POST",
    url: path + "/login/islogin",
    data,
  });
};

// chat
// export const chatGPT = (data) => {
//   return instance({
//     method: "POST",
//     url: path + "/chat",
//     data,
//   })
// }
export const chatEventSource = (message) => {
  return new EventSource(
    baseURL.pro + `/chat?chatContentArray=${JSON.stringify(message)}`
  );
}