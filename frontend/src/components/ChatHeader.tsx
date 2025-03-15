import { X } from "lucide-react";
import avatarImage from "./../assets/avatar.png"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedUser } from "../store/features/authSlice";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  // const { selectedUser, setSelectedUser } = useChatStore();
  const {chatUsers,selectedUser, onlineUsers} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              {/* <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} /> */}
              <img src={avatarImage} alt="" />
            </div>
          </div>

          {/* User info */}
          <div>
            {/* <h3 className="font-medium">{selectedUser.fullName}</h3> */}
            <h3 className="font-medium">{chatUsers.find(user => user._id === selectedUser)?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        {/* <button onClick={() => setSelectedUser(null)}> */}
        <button onClick={() => dispatch(setSelectedUser(""))}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;