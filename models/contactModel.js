const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
    firstName: {type: String , required:true},
    lastName: {type: String , required:true},
    email: {type:String , unique: true , required:true},
    phone: {type:String , unique: true , required:true}
})

const userModel = mongoose.model("contacts" , contactSchema);

module.exports = userModel