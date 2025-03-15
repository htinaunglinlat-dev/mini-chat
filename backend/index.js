import { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import path from "path"
import cookieParser from 'cookie-parser'

// routes
import userRoutes from './routes/user.route.js'
import messageRoutes from './routes/message.route.js'
import authRoutes from './routes/auth.route.js'

import {connectDB} from './db/connectDB.js'
import {app, httpServer} from './socket/socket.js'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
// D:\__NCC__\web-socket\mini-chat-application\backend

const __dirname2 = path.resolve()
// D:\__NCC__\web-socket\mini-chat-application

const PORT = process.env.PORT || 3000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser()) // to enable to use cookies and token

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// for deployment
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

httpServer.listen(PORT, () => {
  connectDB()
  console.log(`Server is listening at http://localhost:${PORT}`)
})


