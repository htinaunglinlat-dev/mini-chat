import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
import { Loader2, Send } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMessage, sendMessage } from "../store/features/messageSlice";
import { getSocket } from "../socket";

const MessageInput = () => {
  const [text, setText] = useState("");
  const {status} = useAppSelector(state => state.messages)
  const dispatch = useAppDispatch()
  
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text)
    if(!text.trim()) return 
      dispatch(sendMessage(text))
      setText("")
  };

  useEffect(() => {
    const socket = getSocket()
    socket?.on("chat:newMessage", () => {
      console.log('new message arrived')
      dispatch(fetchMessage())
    })

    return () => {
      socket?.off("chat:newMessage")
    }
  })

  return (
    <div className="p-4 w-full">
      {/* {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              // onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )} */}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            // onChange={handleImageChange}
          /> */}
        </div>
        <button
          type="submit"
          className="btn btn-circle p-1 flex justify-center items-center disabled:cursor-not-allowed"
          disabled={!text.trim() || status === "sendingMessage"}
        >
          {status === "sendingMessage" ? (
            <Loader2 className="size-14 p-1 animate-spin" />
          ):(
            <Send className="size-14 p-1" />
          )}
        </button>
      </form>
    </div>
  );
};
export default MessageInput;