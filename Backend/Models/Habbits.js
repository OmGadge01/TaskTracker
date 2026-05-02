const mongoose = require("mongoose");

const habbitSchema = new mongoose.Schema({
     name  : String,
     streak : {
        type : Number,
        default : 0
     },
     lastCompletedDate : Date,

} ,{timestamps : true});

module.exports = mongoose.model("habbit" ,habbitSchema)