import fs from 'fs'

export function getData(query, db) {
    return new Promise((resolve, reject) => {
        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(row ? row : null);
            }
        });
    });
}

export function runQuery(query, db) {
    return new Promise((resolve, reject) => {
        db.run(query, (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(row ? row : null);
            }
        });
    });
}

export function saveFile(base64, name) {
    return new Promise((resolve, reject) => {
        try {

            let base64Data = base64?.split('base64,')[1];
            base64Data += base64Data.replace('+', ' ');
            let binaryData = new Buffer(base64Data, 'base64').toString('binary');
            fs.writeFile(`./storage/assets/products/${name}`, binaryData, "binary", function (err) {
                if (err)  // writes out file without error, but it's not a valid image
                    reject({ saved: false })
                else
                    resolve({ saved: true, path: `public/products/${name}` })
            });

        } catch (e) {
            console.error(e)
            reject({ saved: false })
        }
    })
}

export function deleteFile(path) {
    return new Promise(async (resolve, reject) => {
        try {
            await fs.rmSync(path)
            resolve({ delete: true })
        } catch (e) {
            console.error(e)
            reject({ delete: false })
        }
    })
}

export function isBase64(str) {
    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (str === '' || str.trim() === '') { return false; }
    try {
        if (base64regex.test(str)) {
            return /^[\x00-\x7F]*$/.test(atob(str));
        } else {
            return false
        }
    } catch (err) {
        // catch
    }
}