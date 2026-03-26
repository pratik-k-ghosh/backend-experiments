import dotenv from "dotenv";
dotenv.config();

const config = {
    dev: {
        database: {
            uri: process.env.DB_URI || "Database Uri"
        },
        api: {
            key: process.env.API_KEY || "API Key"
        },
        xyz: "debug",
        port: process.env.PORT
    },
    test: {
        database: {
            uri: process.env.DB_URI || "Database Uri"
        },
        api: {
            key: process.env.API_KEY || "API Key"
        },
        xyz: "debug",
        port: process.env.PORT
    },
    production: {
        database: {
            uri: process.env.DB_URI || "Database Uri"
        },
        api: {
            key: process.env.API_KEY || "API Key"
        },
        xyz: "error",
        port: process.env.PORT
    }
}

const mode = process.env.MODE || "dev";
export default config[mode];