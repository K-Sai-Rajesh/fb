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
        Register: `
                CREATE TABLE "Register" (
                "firstname"	TEXT NOT NULL,
                "lastname"	TEXT NOT NULL,
                "phone"	REAL NOT NULL,
                "userpassword"	TEXT NOT NULL,
                "email"	TEXT NOT NULL,
                "id"	INTEGER NOT NULL UNIQUE,
                "role"	TEXT NOT NULL,
                "registered"	TEXT NOT NULL,
                "appliedDate"	TEXT,
                "approvedDate"	TEXT,
                "status"	TEXT,
                "shopEndTime"	TEXT NOT NULL,
                "shopStartTime"	TEXT NOT NULL,
                "shopDescription"	TEXT NOT NULL,
                "shopPhoneNumber"	REAL NOT NULL,
                "shopName"	TEXT NOT NULL,
                "gst"	TEXT,
                "error"	REAL,
                "latitude"	REAL,
                "longitude"	REAL,
                "propic"	TEXT,
                "category"	TEXT,
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
