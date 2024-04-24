const mongoose = require("mongoose");

// MongoDB connection URI
const uri =
  "mongodb+srv://ikennaibenemee:WqNftip3soFhZAPj@cluster0.l9jqntt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 100000,
  })
  .then(() => console.log("MongoDB connected here and successfully"))
  .catch((error) => console.log("MongoDB connection failed", error));

module.exports = mongoose;
