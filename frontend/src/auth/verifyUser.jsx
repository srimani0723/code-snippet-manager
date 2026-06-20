import api from "./api";

// res.data => { authorised: true, user: {...} }

export const verifyUser = () =>
  api
    .get("/auth/check")
    .then((res) => res.data)
    .catch(() => false);
