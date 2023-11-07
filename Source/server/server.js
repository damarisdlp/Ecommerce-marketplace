const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5002;

// import route
const loginRoute = require("./routes/record");
const stripeRoute = require("./routes/stripe");
const conversationRoute = require("./routes/record");
const messageRoute = require("./routes/record");
const userRoute = require("./routes/record")

// Set up app configurations
app.use(express.json());
app.use(cors());
app.use("/", loginRoute);
app.use("/", stripeRoute);
app.use("/", conversationRoute);
app.use("/", messageRoute);
app.use("/", userRoute);

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
