const express = require("express");
const routeConvos = express();
const Conversations = require("../model/conversationModel");
const recordRoutes = require("./record");
const dbo = require("../db/conn");
const { ObjectId } = require("mongodb");



//new conv
routeConvos.post("conversations", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(200).send("Conversation created successfully");
  } catch (err) {
    console.log(error, "Error");
  }
});

//get conv of a user
routeConvos.get("conversations/:userId", async (req, res) => {
  try {
    const userId = Conversations._id
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });
    const conversationUserData = Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await Users.findById(receiverId);
        return {
          user: { email: user.email, fullName: user.fullName },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(await conversationUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a conversation by id
routeConvos.route('conversations/:id').get(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  db_connect
     .collection("conversations")
     .findOne(myquery, function (err, result) {
         if (err) throw err;
         res.json("unable", result);
     });
 });

module.exports = routeConvos;

/*const express = require("express");
const routeConvos = express.Router();
const dbo = require("../db/conn");
const { ObjectId } = require("mongodb");

//new conv
routeConvos.route("conversations").post(function (req, res) {
  let db_conect = dbo.getDb();
  let myObj = {
    lynchpin: req.body.lynchpin,
  };
  db_connect
    .collection("conversations")
    .insertOne(myObj, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//get conv of a user
routeConvos.route("conversations/:userId").post(function (req, res) {
  let db_conect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.userId) };
  db_connect
    .collection("convesations")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = routeConvos;*/
