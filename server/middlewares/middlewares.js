import { db, jwt } from "../database.cjs";
import { getData } from "./functions.js";
const secret_key = "future_bazaar";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        let query = `select * from tokens where token="${token}";`;
        const result = await getData(query, db);
        if (result?.length > 0) {
            if (!token) return res.status(403).send("Access denied.");
            const decoded = jwt.verify(token, secret_key);
            req.user = decoded;
            next();
        } else {
            res.status(403).send("Invalid token ! Please Login.");
        }
    } catch (error) {
        res.status(400).send("Invalid token ! Please Login.");
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const { user } = req;
        if (user.role === 'admin')
            next();
        else
            res.status(403).send("Invalid Access !");
    } catch (error) {
        res.status(400).send("Invalid Access");
    }
};

export const isApproved = async (req, res, next) => {
    try {
        const { user } = req;
        let query = `select status from Register where id="${user?.id}"`
        let result = await getData(query, db)
        if (result[0].status === 'Approved') {
            next();
            return
        }
        res.status(403).send("Invalid Access !");
    } catch (error) {
        res.status(400).send("Invalid Access");
    }
}