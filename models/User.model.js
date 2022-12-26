const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email : {type: 'string', required: true},
    password : {type: 'string', required: true},
    name : String,
    age : Number
})

const UserModel = mongoose.model("mernuser", userSchema)

module.exports = {
    UserModel
}