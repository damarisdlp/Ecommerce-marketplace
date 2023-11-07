const express = require('express');
const routeMessages = express.Router()
const messageModel = require('../model/messageModel');

//add
routeMessages.post("addMsg", async (req, res) => {

  try {
    const { conversationId, senderId, message, receiverId = ' ' } = req.body;
    if(!senderId || !message) return res.status(400).send('Please fill all required fields')
    if(!conversationId && receiverId){
      const newConversation = new Conversations ({ members: [senderId, receiverId] });
      await newConversation.save();
      const newMessage = new messageModel({ conversationId: newConversation._id, senderId, message});
      await newMessage.save();
      return res.status(200).send('Message sent successfully');
    }else if(!conversationId && !receiverId){
      return res.status(400).send('Please fill all required fields')
    }
    const newMessage = new messageModel({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send('Message sent successfully');
  } catch (err) {
    res.status(500).json(err);
    console.log(error, 'Error')
  }
});

//get

routeMessages.get(":conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    if(!conversationId === 'new') return res.status(200).json([])
    const messages = await messageModel.find({
      conversationId });
      const messageUserData = Promise.all(messages.map(async (message) => {
        const user = await Users.findById(message.senderId);
        return { user: { email: user.email, fullName: user.fullName }, message: message.message }
      }));
    res.status(200).json(await messageUserData);
  } catch (err) {
    res.status(500).json(err);
    console.log(error, 'Error')
  }
});

module.exports = routeMessages;