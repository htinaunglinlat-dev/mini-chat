// import { useChatStore } from "../store/useChatStore";

// import { useAuthStore } from "./store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";

import {Sidebar, NoChatSelected, ChatContainer} from "../components/index"
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth } from "../store/features/authSlice";
import { useEffect } from "react";
import LoginOrSignup from "../components/LoginOrSignup";

const HomePage = () => {
  // const { selectedUser } = useChatStore();
  // const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const dispatch = useAppDispatch()
  const {status, authUser, chatUsers, selectedUser} = useAppSelector(state => state.auth)
  // const { theme } = useThemeStore();

  console.log("chat-users", { chatUsers });

  useEffect(() => {
    if(!authUser) dispatch(checkAuth())
    // if(errorMessage) toast.error(errorMessage)
  }, [checkAuth]);

  console.log("login user", { authUser });

  // {authUser ? (
  //   // {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
  //   <>
  //     {true ? <NoChatSelected /> : <ChatContainer />}
  //   </>
  // ) : (
  //   <LoginOrSignup />
  // )}
  const RenderChatContainer = () => {
    if(status === "checkingAuth") {
      return <div className="flex flex-1 justify-center items-center"><Loader2 className="size-8 animate-spin mr-3" /> checking auth</div>
    } else if(authUser) {
      if(selectedUser) {
        return <ChatContainer />
      } else {
        return <NoChatSelected />
      }
    } else if(!authUser) {
      return <LoginOrSignup />
    }
  }

  return (
    <div className="h-screen bg-base-200 pt-16 md:pt-0">
      <div className="flex items-center justify-center md:pt-20 md:px-4">
        <div className="bg-base-100 rounded-lg w-full shadow-lg md:max-w-7xl h-[calc(100vh-4rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">

            {/* side bar - left side */}
            <div className="h-full border-r border-base-300 flex flex-col transition-all duration-200">
              {/* Header */}
              {/* <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <span className="font-medium hidden lg:block">Contacts</span>
                </div>
              </div> */}
              {authUser && <Sidebar />}
            </div>

            {/* message box content- right side */}
            {/* <Sidebar /> */}
            <RenderChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;