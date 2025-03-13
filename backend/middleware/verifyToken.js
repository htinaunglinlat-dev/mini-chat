import jwt, {decode} from "jsonwebtoken"
import { failResponse } from "../utils/responseModel.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.chatToken
  if(!token) {
    return res.status(401).json(failResponse("no token provided."))
  }
  try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) {
      return res.status(401).json(failResponse("invalid token"))
    }
    req.userId = decodedToken.userId
    next()
  } catch (error) {
    console.log(`Error in verify token: ${error.message}`)
    return res.status(500).json(failResponse("Internal Server Error."))
  }
}