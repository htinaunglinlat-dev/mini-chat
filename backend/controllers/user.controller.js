import User from './../models/user.model.js'

export const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = "67cbf205787a828990371e13"
  try{
    const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password")
    res.status(200).json(filteredUsers)
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
  }
}