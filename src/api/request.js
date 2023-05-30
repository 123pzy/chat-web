import instance from "./index.js";
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
    url: "/api/profile/getusername",
    params,
  });
};

// 修改用户名
export const updateUsername = (data) => {
  return instance({
    method: "PUT",
    url: "/api/profile/changeusername",
    data,
  });
};
