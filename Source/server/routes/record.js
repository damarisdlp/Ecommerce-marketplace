const express = require("express");
 
const recordRoutes = express.Router();
 
// connect to the database
const dbo = require("../db/conn");
 
// convert the id from string to ObjectId for the _id
const { ObjectId } = require("mongodb");
 
 
// get a list of all users
recordRoutes.route("/users").get(async function (req, res) {
    let db_connect = dbo.getDb();
    try {
      const result = await db_connect
        .collection("userProfileData")
        .find()
        .toArray();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

 
// get a user by id
recordRoutes.route("/users/:id").get(async function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 try {
  const result = await db_connect
    .collection("userProfileData")
    .find(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
    .toArray();
    res.json(result);
} catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}
});
 
// create a new user
recordRoutes.route("/users/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
    lynchpin : req.body.lynchpin,
    name: req.body.name,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    group: req.body.group,
    position: req.body.position,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    creationDate: req.body.creationDate,
    thumb: req.body.thumb,
    verified : req.body.verified,
    rating : req.body.rating,
    address : req.body.address,
    profilePics: req.body.profilePics,
 };
 
 db_connect
    .collection("userProfileData")
    .insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});
 
// update a user by id
recordRoutes.route("/users/update/:id").post(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    group: req.body.group,
    position: req.body.position,
    creationDate: req.body.creationDate,
   },
 };
 db_connect
    .collection("userProfileData")
    .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        console.log("1 document updated");
        res.json(result);
    });
});
 
// delete a user
recordRoutes.route("/users/delete/:id").delete((req, res) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 db_connect
    .collection("userProfileData")
    .deleteOne(myquery, function (err, result) {
        if (err) throw err;
        console.log("1 document deleted");
        res.json(result);
    });
});
 
// create a new item
recordRoutes.route("/item/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    description: req.body.description,
    cost: req.body.cost,
    visible: req.body.visible,
    inCart: req.body.inCart,
    reserved: req.body.reserved,
    category: req.body.category,
    rating: req.body.rating,
    numRatings: req.body.numRatings,
    badge: req.body.badge,
    imgSrc: req.body.imgSrc,
    images: req.body.images,
    details: req.body.details,
    location: req.body.location,
    lynchpin: req.body.lynchpin,
 };
 db_connect
    .collection("listingsCurrent")
    .insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// get a list of all rental listings
recordRoutes.route('/items').get(async function (req, res) {
  let db_connect = dbo.getDb();
  try {
    const result = await db_connect
      .collection('listingsCurrent')
      .find()
      .toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// get a list of all shopping carts
recordRoutes.route('/shoppingCart').get(async function (req, res) {
  let db_connect = dbo.getDb();
  try {
    const result = await db_connect
      .collection('shoppingCart')
      .find()
      .toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// create a new shopping cart
recordRoutes.route("/shoppingCart/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
    lynchpin: req.body.lynchpin,
    cartItemIds: req.body.cartItemIds,
 };
 db_connect
    .collection("shoppingCart")
    .insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// update a shopping cart by id
recordRoutes.route("/shoppingCart/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      lynchpin: req.body.lynchpin,
      cartItemIds: req.body.cartItemIds,
    },
  };
  db_connect
     .collection("shoppingCart")
     .updateOne(myquery, newvalues, function (err, result) {
         if (err) throw err;
         console.log("1 document updated");
         res.json(result);
     });
 });

 // create a new conversation
 recordRoutes.route("/conversations").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myObj = {
    receiverId: req.body.receiverId,
    senderId: req.body.senderId,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    };
  db_connect
    .collection("conversations")
    .insertOne(myObj, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//get conv of a user
recordRoutes.route("/conversations/:userId").get(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { receiverId: req.params.userId };
    try {
      const result = await db_connect
        .collection("conversations")
        .find(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        })
       .toArray();
       res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

// get a list of all conversations
recordRoutes.route("/conversations").get(async function (req, res) {
  let db_connect = dbo.getDb();
  try {
    const result = await db_connect
      .collection("conversations")
      .find()
      .toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

 // create a new message
 recordRoutes.route("/messages").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myObj = {
    conversationId: req.body.conversationId,
    senderId: req.body.senderId,
    message: req.body.message,
    sentAt: req.body.sentAt,
    };
  db_connect
    .collection("messages")
    .insertOne(myObj, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//get message of a user based on conversation id
recordRoutes.route("/messages/:convoId").get(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { conversationId: req.params.convoId };
    try {
      const result = await db_connect
        .collection("messages")
        .find(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        })
        .toArray();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

// get a list of all messages
recordRoutes.route("/messages").get(async function (req, res) {
  let db_connect = dbo.getDb();
  try {
    const result = await db_connect
      .collection("messages")
      .find()
      .toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = recordRoutes;
