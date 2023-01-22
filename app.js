const mongoose= require('mongoose')
const express = require('express')
const dotenv=require('dotenv');
const session = require('express-session')
const { UserRouter } = require('./routes/users');
const { memosRouter } = require('./routes/memos');

dotenv.config(); // require('dotenv').config()
//mongodb
mongoose.connect
(process.env.chaine_connection)
.then(()=>console.log("connected to mongodb atlas"))
.catch(err=>console.log(err))

//express
const app=express();

app.use(express.static("./public"))

//middleware to parse json data on body request
app.use(express.json())

// injection du middleware des sessions
app.use(session({
    secret: process.env.secret_session,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly:true }
  }))


app.use('/users',UserRouter)

app.get('/hi',(req,res)=>{
    res.send({message:"hi"});
})

// check authentification (gard / interceptor)
app.use((req,res,next)=>{

    if(!req.session.login)
        return res.status(403).json({message:"you need to login first"})
    next();
})

app.use('/memos',memosRouter)

const port =process.env.port || 3000
app.listen(port, ()=>{
    console.log('server listening on port : ',port)
})