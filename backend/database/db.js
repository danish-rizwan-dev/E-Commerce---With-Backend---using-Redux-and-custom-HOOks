import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Danish@123",
  database: "E_COMMERRCE"
});

connection.connect(function (err) {
  if (err) console.log(err);
});

export default connection;

