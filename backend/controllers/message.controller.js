import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { successResponse } from "../utils/responseModel.js";

export const sendMessage = async (req, res) => {
	const {id: receiverId } = req.params
	const {message} = req.body
	const senderId = req.userId
	console.log("in send message", receiverId, message, senderId)
	try {
		let conversation = await Conversation.findOne({
			participants: {$all: [senderId, receiverId]}
		})

		if(!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId]
			})
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message
		})
		await newMessage.save()
		conversation.messages.push(newMessage._id)
		await conversation.save()

		// performance due to run i parallel
		// await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId)
		if(receiverSocketId) {
			io.to(receiverSocketId).emit("chat:newMessage", {...newMessage, __v: undefined})
		}

		res.status(201).json({
			success: true,
			message: `message has been successfully sent to id:${receiverId}`,
			data: {
				...newMessage._doc,
				__v: undefined
			}
		})

	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	const {id} = req.params
	try {
		const {id: userToChatId} = req.params
		const senderId = req.userId

		const conversation = await Conversation.findOne({
			participants: {$all: [userToChatId, senderId]}
		}).populate()

		if(!conversation) return res.status(200).json({success: true, messages: []})
		
		const messages = await Promise.all(conversation.messages.map((messageId) => Message.findById(messageId).select("-__v").populate()))

		console.log(messages)
		
		res.status(200).json(successResponse("successfully get all the message", messages))
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};