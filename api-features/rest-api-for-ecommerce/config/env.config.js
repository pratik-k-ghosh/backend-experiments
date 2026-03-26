import dotenv from "dotenv";
dotenv.config();

const config = {
    "dev": {
        "db": {
            "uri": process.env.DB_URI || "Database URI"
        },
        "api": {
            "key": process.env.API_KEY || "API Key"
        },
        "xyz": "debug",
        "port": process.env.PORT || 5000,
        "slugg": process.env.SLUGG || 4
    },
    "test": {
        "db": {
            "uri": process.env.DB_URI || "Database URI"
        },
        "api": {
            "key": process.env.API_KEY || "API Key"
        },
        "xyz": "debug",
        "port": process.env.PORT || 5000,
        "slugg": process.env.SLUGG || 5
    },
    "production": {
        "db": {
            "uri": process.env.DB_URI || "Database URI"
        },
        "api": {
            "key": process.env.API_KEY || "API Key"
        },
        "xyz": "error",
        "port": process.env.PORT || 5000,
        "slugg": process.env.SLUGG || 5
    }
}

const stage = process.env.STAGE || "dev";
export default config[stage];