import { io, Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : 'https://mini-chat-app-yvi3.onrender.com';

let socket: Socket | null = null

export const connectToSocket = (userId: string): Socket => {
  if(!socket) {
    socket = io(BASE_URL, {query: {userId}})
  }
  console.log("socket connected", socket.connected)
  if(!socket.connected) {
    console.log("socket is connected.")
    socket.connect()
    // socket.on('getOnlineUsers', (userIds) => {
    //   console.log("userIds", userIds)
    // })
  }
  return socket
}

export const getSocket = () => socket
export const disconnect = () => {
  if(socket && socket.connected === true) {
    socket.disconnect()
    socket = null
  }
}