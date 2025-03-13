import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.cookie("chatToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // prevent from XSS attacks (cross-site scripting)
    samSite: "strict", // CSRF attacks (cross-site request forgery attack)
    // secure: process.env.NODE_ENV !== "development",
    secure: false
  })
  return token
}