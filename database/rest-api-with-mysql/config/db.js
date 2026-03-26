import mysql from "mysql2/promise";
import env from "./env.js";

const db = await mysql.createConnection({
    host: env.database.host,
    user: env.database.user,
    password: env.database.pass,
    database: env.database.name
}).catch(()=>{
    console.error("Couldn't connect to the database");
    process.exit(1);
}).finally(()=>{
    console.log("Connected to the Database");
});

export default db;