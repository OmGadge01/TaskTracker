const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//routes
app.use("/tasks", require("./Routes/taskRoutes"));
app.use("/habits", require("./Routes/habbitRoutes"));

//database connection

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected with MongoDB Database");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
})
.catch(err => console.log(err));

