import express from "express";
const Router = express.Router();
import executeQuery from "../database/dbHelper.js";

Router.get("/", async (req, res) => {
  const { category } = req.query;
  const { id } = req.query;
  console.log("Category", category);
  console.log("id:", id);

  try {
    let data = [];
    if (category === "All") {
      data = await executeQuery("SELECT * FROM products");
    } else if (id) {
      data = await executeQuery('SELECT * FROM products where id = ?', [id]);
      console.log(data);
      return res.send({ success: true, data: data });
    }
    else {
      data = await executeQuery('SELECT * FROM products where category = ?', [category]);
    }
    res.send({ success: true, data: data });
  } catch (error) {
    // console.log("Failed to fetch products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});

export default Router;
