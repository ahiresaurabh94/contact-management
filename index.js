const express =require('express')
const app =express()

const dotenv =require('dotenv')
dotenv.config()

var cors = require('cors')
app.use(cors())

const body=require('body-parser')
app.use(body.json())

const DataBase=require('./database/mongoDB')
const contactRoute = require("./routes/contactRoute")

app.use('/' , contactRoute)

// app.use(express.json({limit:"5mb"}))

app.listen(process.env.PORT,async ()=>{
    await DataBase()
    console.log("Port Connected")
})