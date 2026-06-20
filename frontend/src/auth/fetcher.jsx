import api from "../auth/api";

export const fetcher = async ({ url, method = "GET", data, headers }) => {
  const response = await api({
    url,
    method,
    data,
    headers: {
      ...api.defaults.headers,
      ...headers,
    },
  });
  return response.data;
};
