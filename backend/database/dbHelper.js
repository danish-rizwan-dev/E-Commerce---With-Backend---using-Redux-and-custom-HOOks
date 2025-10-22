import connection from "./db.js";

async function executeQuery(query, params) {
    return new Promise(function (resolve, reject) {
        connection.query(query, params, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });
}

export default executeQuery;
