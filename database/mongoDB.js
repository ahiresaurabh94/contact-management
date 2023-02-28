const mongoose =require("mongoose")

mongoose.set("strictQuery",false)

const db = ()=>{
    return mongoose.connect("mongodb://127.0.0.1/contactManagement").then(()=>{
        
        console.log("CONNECTED TO DB")
    }).catch((e)=>{
        console.log(e.message)
    })
    
}
module.exports=db;