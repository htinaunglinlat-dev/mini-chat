import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import User from './../models/user.model.js'

const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ['POST', 'GET']
  }
})
// redis

const userSocketMap = new Map(); // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId)
}

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id)

  const userId = socket.handshake.query.userId
  if(userId) userSocketMap.set(userId, socket.id)

  // io.emit() is used to send events to all the connected clients
  console.log("userSocketMap", userSocketMap)
  io.emit("getOnlineUsers", [...userSocketMap.keys()])

  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id)
    userSocketMap.delete(userId)
    io.emit("getOnlineUsers", userSocketMap.keys())
  })
})

export { app, io, httpServer}
 