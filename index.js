import express from "express";
import cors from "cors"
import mongoose from "mongoose"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

mongoose.connect("mongodb+srv://vikaspandey1993:india%401993@cluster0.iltaadg.mongodb.net/myLoginRegisterDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    })
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)


// routes 
app.post("/login", (req, res) => {
    const {email , password} = req.body 
    User.findOne({ email : email} , (err, user)=>{
        if(user){
              if(password === user.password){
                res.send({message : " Login successful" , user : user})
              } else {
                res.send({message : "Password didnot match "})
              }
        }else {
            res.send({ message :"user not registered"})
        }

    })
    })

app.post("/register", (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already Registered " })
        } else {

            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered , please login now " })
                }
            })
        }

   })
})
app.listen(9002, () => {
    console.log("BE started at port 9002")
})

