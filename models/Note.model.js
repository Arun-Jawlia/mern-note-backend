const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title : String,
    note : String,
    category : [],
    userID : String,
})

const NoteModel = mongoose.model("mymernnote", noteSchema)

module.exports = {
    NoteModel
}