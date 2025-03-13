// import { useChatStore } from "../store/useChatStore";

// import { useAuthStore } from "./store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";

import {Sidebar, NoChatSelected, ChatContainer} from "../components/index"
import { Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth } from "../store/features/authSlice";
import { useEffect } from "react";
import LoginOrSignup from "../components/LoginOrSignup";

const HomePage = () => {
  // const { selectedUser } = useChatStore();
  // const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const dispatch = useAppDispatch()
  const {isLoading, authUser, errorMessage, onlineUsers} = useAppSelector(state => state.auth)
  // const { theme } = useThemeStore();

  console.log("online-users", { onlineUsers });

  useEffect(() => {
    dispatch(checkAuth())
  }, [checkAuth]);

  console.log("login user", { authUser });

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center md:pt-20 md:px-4">
        <div className="bg-base-100 rounded-lg w-full shadow-lg md:max-w-7xl h-screen lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">

            {/* side bar - left side */}
            <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
              {/* Header */}
              <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <span className="font-medium hidden lg:block">Contacts</span>
                </div>
              </div>
              {authUser && <Sidebar />}
            </div>

            {/* message box content- right side */}
            {/* <Sidebar /> */}
            {authUser ? (
              // {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              <>
                {true ? <NoChatSelected /> : <ChatContainer />}
              </>
            ) : (
              <LoginOrSignup />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;