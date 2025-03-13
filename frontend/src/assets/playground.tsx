// import { useEffect, useRef, useState } from "react";
// import { SendHorizontal, Settings2, X } from "lucide-react";
// import { ProfileBox, TextBox } from "./components/components.ts";


// import * as motion from 'motion/react-client'
// import { AnimatePresence } from "motion/react";
// import { socket } from "./socket";
// import { useAppDispatch, useAppSelector } from "./store/hooks";
// import { fetchMessage } from "./store/features/messageSlice";

export default function ChatApp() {
  const {messages} = useAppSelector(state => state.messages)
  const dispatch = useAppDispatch()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [message, setMessage] = useState('')

  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null)
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    socket.emit('chat:send-message', "67cbf205787a828990371e13", "67cbf2c5cc184f2670213640", message)
    setMessage('')
  }

  useEffect(() => {
    dispatch(fetchMessage({userId: "67cbf205787a828990371e13"}))
    function onConnect() {
      console.log('socket is connected', socket.id)
      setIsConnected(true)
    }
    function onDisconnect() {
      setIsConnected(false)
      console.log('socket is disconnected')
    }
    function onMessageDelivered(data: {success: false, message: string}) {
      console.log('message successfully delivered event', data.success, data.message)
      dispatch(fetchMessage({userId: "67cbf205787a828990371e13"}))
      // console.log(data)
    }
    function onError(error: string) {
      console.error('socket error', error)
    }
    
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('chat:delivered', onMessageDelivered)
    socket.on('chat:error', onError)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('chat:delivered', onMessageDelivered)
      socket.off('chat:error', onError)
    }
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const focusHandler = () => {
    // console.log('fire')
    inputRef.current?.focus();
  }; 
  return (
    <div className="h-screen w-full bg-slate-300 grid md:grid-cols-7">

      {/* user section */}
      <div className="h-screen bg-blue-500 md:col-span-2">

        {/* user profile box */}
        <div className="w-full bg-blue-700 flex flex-rows justify-between items-center gap-3 px-3 text-white relative">
          <div className="flex flex-row justify-center items-center gap-3">
            <img src="https://dummyjson.com/icon/emilys/128" alt="profile" className="size-14 rounded-3xl mx-auto my-5 border-4 border-sky-300"/>
            <div className="font-bold text-slate-200">Htin Aung Lin lat</div>
          </div>
          <button title="setting" onClick={() => setIsOpenSetting(!isOpenSetting)}>
            {isOpenSetting ? 
              <X fill="red" className="size-12 text-red-500 cursor-pointer border-2 border-indigo-500 p-2 rounded-full hover:border-2 hover:border-red-500 transition duration-300"/> :
              <Settings2 fill="blue" className="size-12 cursor-pointer border-2 border-indigo-500 p-2 rounded-full hover:border-2 hover:border-indigo-300 transition duration-300"/>
            }
            </button>

          {/* setting dialog box */}
          <AnimatePresence>
          {isOpenSetting && 
          <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -5}}
          transition={{duration: 0.3}}
          className="absolute top-full right-0 w-fit bg-white flex flex-col text-slate-500 font-bold rounded-md overflow-hidden shadow-lg">
            <button className="p-2 border-b ho border-b-slate-700 hover:text-white hover:bg-blue-400 cursor-pointer transition">Log out</button>
            <button className="p-2 border-b ho border-b-slate-700 hover:text-white hover:bg-blue-400 cursor-pointer transition">Change Users</button>
          </motion.div> }
          </AnimatePresence>
        </div>

        {/* other users box */}
        <div className="flex flex-col gap-3 p-5">      
          {/* {profile.map((user, index) => <ProfileBox {...user} key={index} />)} */}
        </div>
      </div>


      {/* content section */}
      <div className="h-screen md:col-span-5 relative">
        <div className="bg-blue-400 h-full p-10 flex flex-col gap-3 overflow-y-scroll pb-30" ref={chatRef}>

          {messages.map((message, index) => <TextBox content={message.content} time="13 seconds age" key={index} alignContent={index % 2 === 0 ? "left" : "right"} />)}

        </div>
        
        {/* input section */}
        <div className="absolute w-full left-0 bottom-0 h-fit bg-transparent flex justify-center items-center">
          <form onClick={focusHandler} onSubmit={submitHandler} className="flex justify-between items-center h-full px-10 w-5/6 mx-auto p-3 bg-slate-600 rounded-lg shadow-lg mb-5">
            <input ref={inputRef} value={message} onChange={(e) => setMessage(e.currentTarget.value)} placeholder="Type a message..." className="min-w-52 w-1/2 max-w-72 font-bold focus:outline-0 text-white placeholder:text-slate-300 self-center"/>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer self-end"><SendHorizontal /></button>
          </form>
        </div>
      </div>
    </div>
  );
}