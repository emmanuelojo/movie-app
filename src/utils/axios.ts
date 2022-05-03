import Axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return error.response;
    }
  }
);

export default instance;
