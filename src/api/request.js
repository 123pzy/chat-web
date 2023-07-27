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

// 上传个人token
export function UseYourToken(token) {
  return instance({
    method: "POST",
    url: path + "/profile/chat/openaitoken",
    data: token,
  });
}

// 删除个人openAI_token
export function deleteOpenAIToken(token) {
  return instance({
    method: "DELETE",
    url: path + `/profile/deleteOpenAIToken/${token}`,
  });
}

// 调用ChatGPT
export async function haveOwnOpenAItoken(token) {
  console.log('正在判断是否有token');
  const res = await instance({
    url: path + "/profile/haveOpenAIToken/",
    params: token,
  });
  return res.data.openAI_token;
}

// 提前用get请求传递message数组过去
export function sendMessageArray(data) {
  if (data.openAI_token) {
    return instance({
      method: "get",
      url: `http://45.32.91.22:5001/sendMessage?openAI_token=${data.openAI_token}&message=${JSON.stringify(data.message)}`,
    });
  } else {
    return instance({
      method: "get",
      url: `http://45.32.91.22:5001/sendMessage?message=${JSON.stringify(data.message)}`,
    });
  }

}

export const chatEventSource = () => {
  return new EventSource(`http://45.32.91.22:5001/chat`);
};
