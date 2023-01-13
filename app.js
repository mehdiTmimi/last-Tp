const mongoose= require('mongoose')
const express = require('express')
const dotenv=require('dotenv');
const { UserRouter } = require('./routes/users');
dotenv.config(); // require('dotenv').config()
//mongodb
mongoose.connect
(process.env.chaine_connection)
.then(()=>console.log("connected to mongodb atlas"))
.catch(err=>console.log(err))

//express
const app=express();
//middleware to parse json data on body request
app.use(express.json())

app.use('/users',UserRouter)
app.get('/',(req,res)=>{
    res.send("hi");
})

const port =process.env.port || 3000
app.listen(port, ()=>{
    console.log('server listening on port : ',port)
})