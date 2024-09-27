import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
// import { getData, tablesList } from "./routes/common.js";
// import { format } from "date-fns";
import fileUpload from "express-fileupload";
import path from 'path'
import { tablesList } from "./database.cjs";
import { authMiddleware } from "./middlewares/middlewares.js";
import fs from 'fs'
// import { v4 as uuidv4 } from 'uuid';

const app = new express();
const secret_key = "future_bazaar";

const front = [
    '/',
    '/login',
    '/register',
    '/auth',
    '/auth/*',
    '/auth/profile',
    '/seller',
    '/seller/*',
    '/product',
    '/product/*'
]

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(process.cwd(), "build")))
app.use(cors());
app.use("/public", express.static('Data/assets'))
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
}));


app.listen(8080, async () => {
    try {
        console.log("Server is started at port 8080 .");
        db.all("SELECT name FROM sqlite_master WHERE type='table'", async (err, tables) => {
            if (err) console.log(err)
            else {
                let query;
                const Tables = tables.map(table => table.name)
                if (tables.length === 0) {
                    await Promise.all(tablesList.map(async table => {
                        if (!Tables.includes(Object.keys(table)[0])) {
                            query = Object.values(table)[0];
                            await db.exec(query)
                            return true
                        }
                    })
                    );
                    query = `insert into Register (firstname,lastname,shopName,shopPhoneNumber,shopDescription,shopStartTime,shopEndTime,gst,phone, email, userpassword,role,registered,appliedDate,status,error,latitude,longitude,category) VALUES ("firstname","lastname","shopName",7846574857,"shopDescription","9:00","10:00","gst",8756475847,"futurebazaar@gmail.com", "password","admin", "true", "2024-07-07", "Approved",1000,17.07464,76.03746,"Furniture");`
                    await db.run(query)
                } else {
                    tablesList.forEach(async table => {
                        if (!Tables.includes(Object.keys(table)[0])) {
                            let query = Object.values(table)[0];
                            const result = await db.exec(query)
                            console.log(result)
                        }
                    })
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
});

app.post('/api/register', (req, res) => {
    const user_data = req.body;
    try {
        let base64Data = user_data?.picture_file?.split('base64,')[1];
        base64Data += base64Data.replace('+', ' ');
        let binaryData = new Buffer(base64Data, 'base64').toString('binary');

        fs.writeFile(`./storage/assets/${user_data?.file_name}`, binaryData, "binary", function (err) {
            if (err)  // writes out file without error, but it's not a valid image
                res.status(403).send({ message: "Registration failed !", isSuccess: false })
            else
                res.status(200).send({ message: "Registration initialised !", isSuccess: true })
        });

    } catch (e) {
        res.status(500).send({ message: "Registration failed !", isSuccess: false })
    }
})