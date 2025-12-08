import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true,
});

export const checkAuth = () =>
  api
    .get("/auth/check")
    .then((res) => res.data) // { authorised: true, user: {...} }
    .catch(() => false);
