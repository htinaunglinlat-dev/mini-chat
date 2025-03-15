import User from './../models/user.model.js'
import {successResponse} from './../utils/responseModel.js'

export const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = req.userId
  try{
    const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password -createdAt -updatedAt -email -__v").populate()
    res.status(200).json(successResponse("successfully fetched users", filteredUsers))
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
  }
}