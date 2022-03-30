import axios from "axios";
import { Message } from "element-ui";

let baseURL = "";

if (process.env.NODE_ENV == "development") {
  baseURL = "http://localhost:3006";
} else {
  baseURL = "http://120.25.249.159:3006";
}

const service = axios.create({
  baseURL,
  timeout: 5000,
});

service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    error &&
      Message({
        type: "error",
        message: "网络连接出问题了~",
        showClose: true,
      });
  }
);

export default service;
