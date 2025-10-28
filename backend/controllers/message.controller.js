import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // we are getting id from the url
    // like this http://localhost:5000/api/messages/send/6900a6feec1f29771a49dffd
    // so here the id is in req.params.id, and we destructure it and then rename the id as
    // receiver id
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
      // find all the conversations where participants array includes the specific
      // sender and reciver id, so now we have all the conversation between this 2 user
      // and then set it to a varibale
    });

    // there is no conversation, we have to create one, and default value of message is
    // [], in message.model.js -> so we need not create a empty message array

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // now we will create the message that user intends to send
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // if message creation is success
    if (newMessage) {
      conversation.messages.push(newMessage._id); //kepping track of message by the id in conversation
    }
    // now return the new created message if everything is fine
    res.status(201).json(newMessage);
    //
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
