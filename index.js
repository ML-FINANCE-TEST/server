const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const userRouter = require("./router/auth");
const coins = require("./router/Coins/coins");
const stats = require("./router/Coins/stats");
const olhc = require("./router/Coins/olhc");
const specific = require("./router/Coins/specificCoins");
const allcoins = require("./router/Coins/allCoins");
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI; 
app.use("/api/users", userRouter); // Mount the userRouter at /api/users
app.use("/api/coins", coins); // Mount the userRouter at /api/users
app.use("/api/stats", stats); // Mount the userRouter at /api/users
app.use("/api/olhc", olhc); // Mount the userRouter at /api/users
app.use("/api/specific", specific); // Mount the userRouter at /api/users
app.use("/api/allcoins", allcoins); // Mount the userRouter at /api/users

app.get("/", (req, res) => {
  res.send("Hello, World people todayyyy!");
});
server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 100000,
  })
  .then(() => console.log("MongoDB connected here and successfully"))
  .catch((error) => console.log("MongoDB connection failed", error));
