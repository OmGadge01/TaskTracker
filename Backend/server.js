const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/tasks", require("./Routes/taskRoutes"));
app.use("/habits", require("./Routes/habbitRoutes"));

//database connection

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected with MongoDB Database");
  app.listen(5000, () =>console.log("App Running on port 5000"));
})
.catch(err => console.log(err));

