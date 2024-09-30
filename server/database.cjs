const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");

const db = new sqlite3.Database("storage/database.sqlite3");

const tablesList = [
    {
        tokens: `CREATE TABLE "tokens" (
                    "token"	TEXT NOT NULL,
                    "id"	INTEGER NOT NULL UNIQUE,
                    PRIMARY KEY("id" AUTOINCREMENT)
                );`
    },
    {
        products: `
                CREATE TABLE "products" (
                    "title"	TEXT NOT NULL,
                    "description"	TEXT,
                    "stock"	REAL NOT NULL,
                    "mrp"	REAL NOT NULL,
                    "discount"	REAL NOT NULL,
                    "discountedPrice"	REAL NOT NULL,
                    "category"	TEXT NOT NULL,
                    "subcategory"	TEXT NOT NULL,
                    "owner"	TEXT NOT NULL,
                    "path"	TEXT NOT NULL,
                    "size"	REAL NOT NULL,
                    "id"	INTEGER NOT NULL UNIQUE,
                    "productId"	TEXT NOT NULL,
                    "shop"	TEXT,
                    "longitude"	REAL,
                    "latitude"	REAL,
                    "error"	REAL,
                    PRIMARY KEY("id" AUTOINCREMENT)
                );
        `
    },
    {
        views: `
            CREATE TABLE "views" (
                "id"	INTEGER NOT NULL UNIQUE,
                "viewed"	TEXT NOT NULL,
                "owner"	TEXT NOT NULL,
                "type"	TEXT NOT NULL,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `
    },
    {
        users: `
            CREATE TABLE "users" (
                "id"	INTEGER NOT NULL UNIQUE,
                "first_name"	TEXT,
                "last_name"	TEXT,
                "phone"	REAL,
                "user_password"	TEXT,
                "email"	TEXT,
                "long"	TEXT,
                "lat"	TEXT,
                "status"	INTEGER,
                "shop_name"	TEXT,
                "role"	TEXT,
                "gst"	TEXT,
                "category"	TEXT,
                "error"	TEXT,
                "shop_description"	TEXT,
                "start_time"	TEXT,
                "end_time"	TEXT,
                "profile_url"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `
    },
    {
        categories: `
            CREATE TABLE "categories" (
                "id"	INTEGER NOT NULL UNIQUE,
                "title"	TEXT NOT NULL UNIQUE,
                "url"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `
    },
    {
        subcategory: `
                CREATE TABLE "subcategory" (
                "id"	INTEGER NOT NULL UNIQUE,
                "category"	TEXT NOT NULL,
                "subcategory"	TEXT NOT NULL UNIQUE,
                "url"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `
    }
]

module.exports = { db, jwt, tablesList };
