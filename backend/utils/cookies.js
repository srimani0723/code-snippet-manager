const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 48 * 60 * 60 * 1000,
};

export const setCookie = (res, token) => {
  res.cookie("token", token, cookieOptions);
};

export const clearAuthCookie = (res) => {
  res.clearCookie("token", cookieOptions);
};
