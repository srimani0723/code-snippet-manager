export const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 48 * 60 * 60 * 1000, // 48 hours in milliseconds
  });
};
