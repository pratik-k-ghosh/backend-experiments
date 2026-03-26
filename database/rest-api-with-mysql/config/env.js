import dotenv from "dotenv";
dotenv.config();

const config = {
    dev: {
        database: {
            name: process.env.MYSQL_DB || "DB_name",
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            pass: process.env.MYSQL_PASS
        },
        port: process.env.PORT || 5000,
        loglevel: "debug"
    },
    test: {
        database: {
            name: process.env.MYSQL_DB || "DB_name",
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            pass: process.env.MYSQL_PASS
        },
        port: process.env.PORT || 5000,
        loglevel: "info"
    },
    production: {
        database: {
            name: process.env.MYSQL_DB || "DB_name",
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            pass: process.env.MYSQL_PASS
        },
        port: process.env.PORT || 5000,
        loglevel: "error"
    }
}

const stage = process.env.STAGE || "dev";
export default config[stage];