// import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import User from "./../models/user.model.js"
import {successResponse, failResponse} from "./../utils/responseModel.js"
import bcrypt from 'bcrypt'
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'


export const signup = async(req, res) => {
  try {
    const { fullName, email, password, profilePic} = req.body

    if(!fullName || !email || !password) {
      res.status(400).json(failResponse("All fields are required."))
    }
    if(password.length < 6) return res.status(400).json(failResponse("password length must be at least 6 characters."))
    
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists) return res.status(400).json(failResponse("Email already exists."))

    // const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic
    })
    console.log(newUser)
    generateTokenAndSetCookie(newUser._id, res)

    console.log('pass 1')
    await newUser.save()
    console.log('pass 1')
    
    return res.status(200).json(successResponse("new user have been successfully created", {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      createAt: newUser.createdAt
    }))
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json(failResponse("Internal Server Error"));
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    console.log({email, password})
    const user = await User.findOne({email}).populate()

    if(!user) return res.status(400).json(failResponse("Invalid Credentials"))

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) return res.status(400).json(failResponse("Invalid Credentials"))

    generateTokenAndSetCookie(user._id, res)

    return res.status(200).json(successResponse("successfully login.", {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt
    }))
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json(failResponse("Internal Server Error"));
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("chatToken")
    return res.status(200).json(successResponse("logged out successfully."))
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json(failResponse("Internal Server Error"));
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if(!user) {
      return res.status(400).json(failResponse("user not found."))
    }

    return res.status(200).json(successResponse("successfully login.", {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt
    }))
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json(failResponse("Internal Server Error"));
  }
}