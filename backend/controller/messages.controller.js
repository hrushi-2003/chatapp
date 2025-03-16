import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.user._id } })
      .select("-password")
      .sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: req.user.user._id, receiverId: id },
        { senderId: id, receiverId: req.user.user._id },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id } = req.params;
    console.log(id);
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const message = await Message.create({
      senderId: req.user.user._id,
      receiverId: id,
      text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }
    return res.status(201).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
