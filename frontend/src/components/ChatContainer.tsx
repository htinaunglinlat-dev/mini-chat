// import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMessage } from "../store/features/messageSlice";
// import avatarImage from "./../assets/avatar.png"
import { MessageCircle } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, status} = useAppSelector(state => state.messages)
  const {authUser} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  // const {
  //   messages,
  //   getMessages,
  //   isMessagesLoading,
  //   selectedUser,
  //   subscribeToMessages,
  //   unsubscribeFromMessages,
  // } = useChatStore();
  // const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  console.log('messages', messages)
  useEffect(() => {
    dispatch(fetchMessage())
  }, [])
  // useEffect(() => {
  //   getMessages(selectedUser._id);

  //   subscribeToMessages();

  //   return () => unsubscribeFromMessages();
  // }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // if (isMessagesLoading) {
  if(status === 'fetchingMessages' && !messages) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center mt-20 gap-5">
            <div className="w-fit bg-primary/10 flex justify-center items-center h-fit p-2 rounded-lg">
              <MessageCircle className="size-14 text-primary"/>
            </div>
            <p>Send messages with friends.</p>
          </div>
        ) : (
          <>
            {
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
                  ref={messageEndRef}
                >
                  <div className=" chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img
                        // src={
                        //   message.senderId === authUser?._id
                        //     ? authUser.profilePic || "/avatar.png"
                        //     : selectedUser?.profilePic || "/avatar.png"
                        // }
                        src={"https://thumbs.dreamstime.com/b/surprised-girl-gift-box-her-hands-d-render-291577881.jpg"}
                        alt="profile pic"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <time className="text-xs opacity-50 ml-1">
                      {`${message.createdAt.split("T")[1].slice(0,5)} - ${message.createdAt.split("T")[0]}`}
                    </time>
                  </div>
                  <div className="chat-bubble flex flex-col"> {message.message}
                    {/* {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )} */}
                  </div>
                </div>
              ))
            }
          </>
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;

/*
 {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    // src={
                    //   message.senderId === authUser?._id
                    //     ? authUser.profilePic || "/avatar.png"
                    //     : selectedUser?.profilePic || "/avatar.png"
                    // }
                    src={avatarImage}
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  12:24:45
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col"> {message.message}
                {/* {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )} 
              </div>
            </div>
          ))}}
        )

 */