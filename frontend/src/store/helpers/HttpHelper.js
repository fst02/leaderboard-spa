import axios from 'axios';

let http;

const createAxiosInstance = (context) => {
  const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    timeout: process.env.VUE_APP_HTTP_TIMEOUT,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      console.log(err.response?.data?.error);
      if (['token_expired', 'token_invalid', 'token_not_provided'].includes(err.response?.data?.error)) {
        context.dispatch('auth/signout', null, { root: true });
      }
      throw err;
    },
  );

  return axiosInstance;
};

export default (context) => {
  if (!http) {
    http = createAxiosInstance(context);
  }
  return http;
};
