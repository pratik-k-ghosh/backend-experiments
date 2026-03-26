// importing all files and libraries
import mongoose from "mongoose";
import env from "./env.js";

// Creating All constants
const db_uri = env.database.uri;

// connecting to db
const db = async () =>{
    await mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.info("Connected with Database");
    }).catch((err)=>{
        console.error({err: err});
    })
}

// Exporting Modules
export default db;