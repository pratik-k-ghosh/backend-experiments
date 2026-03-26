// importing files and libraries
import env from "./config/env.js";
import express from "express";
import db from "./config/db.js";
import userRouter from "./routes/userRoute.js";

// Creating Constants
const app = express();
const port = env.port || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
db();
app.use('/api/user', userRouter);

// Routing all Pages
app.post("/", (req, res)=>{
    res.status(200).json({page: "Home"});
})

// Listening to the Server
try{
    app.listen(port, ()=>{console.log(`Server is running at Port: ${port}`)})
}catch(err){
    console.error({err: err});
}