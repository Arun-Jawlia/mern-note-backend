const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const cors = require("cors")
require('dotenv').config()

const {connection} = require("./config/db")
const {UserModel} = require("./models/User.model")
const {notesRouter} = require("./routes/notes.route");
const { authenticate } = require("./middlewares/authentication");
const app = express();

app.use(express.json())
app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.post("/signup", async (req, res) => {
    console.log(req.body)
    const {name,email, password} = req.body;
    const userPresent = await UserModel.findOne({email})
    //TODO
    if(userPresent?.email){
        res.send({"mg":"Try loggin in, already exist"})
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new UserModel({name,email,password:hash})
                await user.save()
                res.send({"msg":"Sign up successfull", user})
            });
           
        }
       catch(err){
            console.log(err)
            res.send({"msg":"Something went wrong, pls try again later"})
       }
    }
    
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token, })
            }
            else{
                res.send({"err":"login failed"})
            }
      })} 
      else{
        res.send({"err":"login failed"})
      }
    }
    catch{
        res.send({"msg":"Something went wrong, please try again later"})
    }
})


app.get("/about", (req, res) => {
    res.send("About us data..")
})


app.use(authenticate)
app.use("/notes", notesRouter)

app.listen(process.env.PORT, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 7002")
})

