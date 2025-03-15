import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUsers, setOnlineUsers, setSelectedUser } from "../store/features/authSlice";
import avatarImage from "./../assets/avatar.png"
import { getSocket } from "../socket";

const Sidebar = () => {
  const { selectedUser ,status, chatUsers: users, onlineUsers, isSocketConnected } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  
  // const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  // const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    dispatch(getUsers())
    // if(isSocketConnected) {
      const socket = getSocket()
      socket?.on('getOnlineUsers', (userIds) => {
        console.log("userIds", userIds)
        dispatch(setOnlineUsers(Array.isArray(userIds) ? userIds : []))
      })
    // }
    return () => {
      socket?.off("getOnlineUsers")
    }
  }, [getUsers, isSocketConnected]);

  console.log("onlineUsers", onlineUsers)
  // const filteredUsers = showOnlineOnly
  //   ? users.filter((user) => onlineUsers.includes(user._id))
  //   : users;

  // if (isUsersLoading) return <SidebarSkeleton />;
  if(status === "fetchingUsers") return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          {/* <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label> */}
          <h1>Active Users :</h1>
          <span className={`text-base ${onlineUsers.length ? 'text-green-500' : 'text-zinc-500'}`}>(
            {onlineUsers.length ? onlineUsers.length-1 : 0} online
          )</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user._id))}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                title={user.fullName}
                src={avatarImage}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              { Array.isArray(onlineUsers) ? onlineUsers?.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              ) : ""}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="text-left min-w-0 hidden lg:block">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;