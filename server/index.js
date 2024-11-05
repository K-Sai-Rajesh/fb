import express from "express";
import cors from "cors";
import { db, jwt } from "./database.cjs";
// import { getData, tablesList } from "./routes/common.js";
// import { format } from "date-fns";
import fileUpload from "express-fileupload";
import path from 'path'
import { tablesList } from "./database.cjs";
import { authMiddleware, isAdmin } from "./middlewares/middlewares.js";
import fs from 'fs'
import { deleteFile, getData, isBase64, runQuery, saveFile } from "./middlewares/functions.js";
import { v4 as uuidv4 } from 'uuid';

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
app.use("/public", express.static('storage/assets'))
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
                    query = `insert into users
                            (
                            first_name,
                            last_name,
                            shop_name,
                            phone,
                            shop_description,
                            start_time,
                            end_time,
                            gst, 
                            email, 
                            user_password,
                            role,
                            status,
                            error,
                            lat,
                            long,
                            category
                            ) VALUES ("firstname","lastname","shopName",7846574857,"shopDescription","9:00","10:00","gst",
                             "futurebazaar@gmail.com", "password","admin", "true", 1000,17.07464,76.03746,"Furniture");`
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
        // console.log(user_data)
        let base64Data = user_data?.picture_file?.split('base64,')[1];
        base64Data += base64Data.replace('+', ' ');
        let binaryData = new Buffer(base64Data, 'base64').toString('binary');

        fs.writeFile(`./storage/assets/profiles/${user_data?.file_name}`, binaryData, "binary", async function (err) {
            if (err)  // writes out file without error, but it's not a valid image
                res.status(403).send({ message: "Registration failed !", isSuccess: false })
            else {
                const query = `
                        insert into users
                        (
                            first_name,
                            last_name,
                            shop_name,
                            phone,
                            shop_description,
                            start_time,
                            end_time,
                            gst, 
                            email, 
                            user_password,
                            role,
                            status,
                            error,
                            lat,
                            long,
                            category,
                            profile_url
                        ) values
                         (
                            "${user_data?.firstname}",
                            "${user_data?.lastname}",
                            "${user_data?.business}",
                            ${user_data?.phonenumber},
                            "",
                            "${user_data?.opensat}",
                            "${user_data?.closeeat}",
                            "${user_data?.gst}",
                            "${user_data?.email}",
                            "${user_data?.password}",
                            "${user_data?.role}",
                            "pending",
                            "${user_data?.coords?.accuracy}",
                            "${user_data?.coords?.latitude}",
                            "${user_data?.coords?.longitude}",
                            "${user_data?.category}",
                            "public/profiles/${user_data?.file_name}"
                         );
                    `
                await runQuery(query, db)
                res.status(200).send({ message: "Registration initialised !", isSuccess: true })
            }
        });


    } catch (e) {
        res.status(500).send({ message: "Registration failed !", isSuccess: false })
    }
})

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = `
                select * 
                from 
                    users 
                where 
                    email="${username}" and
                    user_password="${password}";
            `
        const result = await getData(query, db);
        if (result?.length === 1) {
            if (result[0].role === "admin") {
                const token = jwt.sign(result[0], secret_key);
                const query = `insert into tokens (token) values ("${token}");`
                await runQuery(query, db)
                res.status(200).send({
                    message: "Login Successful !",
                    isSuccess: true,
                    accessToken: token,
                    refreshToken: token,
                    data: result[0],
                });
            } else if (result[0].status === "seller") {
                res.status(200).send({
                    message: "Profile verification is pending !",
                    isSuccess: false,
                });
            } else {
                res.status(200).send({
                    message: "User Doesnot exist's !",
                    isSuccess: false,
                });
            }
        } else res.status(404).send({ message: "User Does not Exist with this credentials !", isSuccess: false });

    } catch (e) {
        res.status(500).send({ message: "User Does not Exist with this credentials !", isSuccess: false });
    }
})

app.get("/api/verify_sellers", authMiddleware, isAdmin, async (req, res) => {
    try {
        const query = `select shop_name,phone,first_name,email,gst,profile_url,id,long,lat,error from users where role="seller";`
        const result = await getData(query, db);
        res.status(200).send({
            message: "Sellers Fetched Successfully !",
            result
        })
    } catch (e) {
        console.error(e)
    }
})

app.post("/api/add_product", authMiddleware, async (req, res) => {
    try {
        const data = req.body;
        const { user } = req;
        const { product_name, product_description, product_stock, product_mrp, product_price, images, product_subcategory, product_category } = data
        const productId = uuidv4();
        const images_array = await Promise.all(images.map(async file => {
            const isSuccess = await saveFile(file.base64, file.name)
            return isSuccess
        }))
        let query = `
                insert into products
                    (name, mrp, cost, stock, description, product_id, seller_id, category, subcategory,long,lat,error)
                values
                    ("${product_name}",${product_mrp} ,${product_price} ,${product_stock} ,"${product_description}","${productId}",${user?.id}, "${product_category}", "${product_subcategory}",${user?.long},${user?.lat},${user?.error});
            `;
        await runQuery(query, db);
        await Promise.all(images_array.map(async file => {
            try {
                query = `
                    insert into product_image_path
                        (path,product_id)
                    values
                        ("${file.path}","${productId}");
                `;
                await runQuery(query, db);
                return true
            } catch (e) {
                console.error(e)
            }
        }))
        res.status(200).send({ isSuccess: true, message: 'Product Created Successfully !' })

    } catch (e) {
        console.log(e)
        res.status(500).send({ isSuccess: false, message: 'Product Created unsuccessfully !' });
    }
})

app.delete("/api/delete_product", authMiddleware, async (req, res) => {
    try {
        const product_id = req.query.product_id;
        let query = `
                select * from product_image_path
                where 
                    product_id="${product_id}";
            `
        const images_data = await getData(query, db)
        await Promise.all(images_data.map(async file => {
            const isSuccess = await deleteFile(`./storage/assets/${file.path?.split('public')[1]}`)
            return isSuccess
        }))
        query = `delete from products where product_id="${product_id}";`;
        await runQuery(query, db);
        query = `delete from product_image_path where product_id="${product_id}";`;
        await runQuery(query, db)
        res.status(200).send({ isSuccess: true, message: 'Product Deleted Successfully !' })
    } catch (e) {
        console.error(e)
        res.status(500).send({ isSuccess: false, message: 'Product Deletion Unsuccessfully !' })
    }
})

app.post("/api/update_product", authMiddleware, async (req, res) => {
    try {
        const data = req.body;
        const { user } = req;
        const { product_name, product_description, product_stock, product_mrp, product_price, images, product_id, product_subcategory, product_category } = data

        let query = `
                update 
                    products
                set
                    name="${product_name}",
                    mrp=${product_mrp},
                    cost=${product_price},
                    stock=${product_stock},
                    description="${product_description}",
                    category="${product_category}",
                    subcategory="${product_subcategory}"
                where
                    product_id="${product_id}";
            `;
        if (!images[0]?.base64?.includes('http')) {
            await runQuery(query, db);
            query = `
                select * from product_image_path
                where 
                    product_id="${product_id}";
            `
            const images_data = await getData(query, db)
            await Promise.all(images_data.map(async file => {
                const isSuccess = await deleteFile(`./storage/assets/${file.path?.split('public')[1]}`)
                return isSuccess
            }))
            query = `
                    delete from 
                        product_image_path
                    where 
                        product_id="${product_id}";
                `
            await runQuery(query, db);
            const images_array = await Promise.all(images.map(async file => {
                const isSuccess = await saveFile(file.base64, file.name)
                return isSuccess
            }))
            await Promise.all(images_array.map(async file => {
                try {
                    query = `
                        insert into product_image_path
                            (path,product_id)
                        values
                            ("${file.path}","${product_id}");
                    `;
                    await runQuery(query, db);
                    return true
                } catch (e) {
                    console.error(e)
                }
            }))
            res.status(200).send({ isSuccess: true, message: 'Product Updated Successfully !' })
        } else {
            await runQuery(query, db);
            res.status(200).send({ isSuccess: true, message: 'Product Updated Successfully !' })
        }

    } catch (e) {
        console.log(e)
        res.status(500).send({ isSuccess: false, message: 'Product Updated unsuccessfully !' });
    }
})

app.get("/api/get_products", authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        let query = `select * from products where seller_id=${user?.id};`;
        const products = await getData(query, db);
        res.status(200).send({ isSuccess: true, message: 'Products Fetched Successfully !', products })

    } catch (e) {
        console.log(e)
        res.status(500).send({ isSuccess: false, message: 'Products Fetch unsuccessfully !' });
    }
})

app.get("/api/get_product_images", async (req, res) => {
    try {
        const { user } = req;
        const product_id = req.query.product_id;
        let query = `select * from product_image_path where product_id="${product_id}";`;
        const product_images = await getData(query, db);
        res.status(200).send({ isSuccess: true, message: 'Product Images Fetched Successfully !', product_images })

    } catch (e) {
        console.log(e)
        res.status(500).send({ isSuccess: false, message: 'Product Images Fetch unsuccessfully !' });
    }
})

app.get('/api/categories', async (req, res) => {
    try {
        let query = `select * from categories;`;
        const categories = await getData(query, db)
        res.status(200).send({ isSuccess: true, message: "Categories Fetched Successfully !", categories })
    } catch (e) {
        console.error(e)
    }
})

app.get('/api/get_sub_categories', async (req, res) => {
    try {
        const category = req.query.category;
        let query = `select * from subcategory where category="${category}";`;
        const subcategories = await getData(query, db)
        res.status(200).send({ isSuccess: true, message: "Sub categories Fetched Successfully !", subcategories })
    } catch (e) {
        console.error(e)
        res.status(500).send({ isSuccess: false, message: "Sub categories Fetching unSuccessfully !" })
    }
})

app.get('/api/get_products_by_sub_categories', async (req, res) => {
    try {
        const sub_category = req.query.sub_category;
        let query = `select * from products where subcategory="${sub_category}";`;
        const products = await getData(query, db)
        res.status(200).send({ isSuccess: true, message: "Products Fetched Successfully !", products })
    } catch (e) {
        console.error(e)
        res.status(500).send({ isSuccess: false, message: "Products Fetching unSuccessfully !" })
    }
})
app.get('/api/get_sellers', async (req, res) => {
    try {
        const limit = req.query.limit;
        let query = `select first_name, shop_name, last_name, email, lat, long, error, phone, profile_url, shop_description, category, start_time, end_time, gst, id from users where role="seller" limit ${limit};`;
        const sellers = await getData(query, db)
        res.status(200).send({ isSuccess: true, message: "Products Fetched Successfully !", sellers })
    } catch (e) {
        console.error(e)
        res.status(500).send({ isSuccess: false, message: "Products Fetching unSuccessfully !" })
    }
});
