import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    secure: process.env.NODE_ENV === 'production', // true if in production
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });

  // Store the token in res.locals for immediate use within the same request cycle
  res.locals.token = token;

  return token; // Return the token if needed for immediate use
};

export default generateTokenAndSetCookies;
