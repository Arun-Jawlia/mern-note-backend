const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
require('dotenv').config()


const connection = mongoose.connect(process.env.mongoUrl)
// const connection = mongoose.connect('mongodb://127.0.0.1:27017/mernnotes')


module.exports = {
    connection
}