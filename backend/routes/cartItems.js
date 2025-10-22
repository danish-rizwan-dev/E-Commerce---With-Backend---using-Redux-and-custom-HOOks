import express from "express";
const Router = express.Router();
import executeQuery from "../database/dbHelper.js";

Router.post("/", async (req, res) => {
  const userId = req.userId;
  const { productId, count } = req.body;

  try {
    const productData = await executeQuery(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    if (productData.length === 0) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    const cartProduct = await executeQuery(
      "SELECT * FROM CartList WHERE product_id = ? AND user_id = ?",
      [productId, userId]
    );

    if (cartProduct.length === 0) {
      if (count <= 0) {
        return res.status(400).json({ success: false, error: "Invalid quantity" });
      }

      await executeQuery(
        "INSERT INTO CartList (product_id, quantity, user_id) VALUES (?, ?, ?)",
        [productId, count, userId]
      );

      return res.json({ success: true, data: { productId, quantity: count } });
    } else {
      const currentQuantity = cartProduct[0].quantity;
      const newQuantity = currentQuantity + count;

      if (newQuantity <= 0) {
        await executeQuery(
          "DELETE FROM CartList WHERE product_id = ? AND user_id = ?",
          [productId, userId]
        );

        return res.json({ success: true, data: { productId, quantity: 0 } });
      }

      await executeQuery(
        "UPDATE CartList SET quantity = ? WHERE product_id = ? AND user_id = ?",
        [newQuantity, productId, userId]
      );

      return res.json({ success: true, data: { productId, quantity: newQuantity } });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});



Router.get("/", async (req, res) => {
  const userId = req.userId;

  console.log("User ID from token:", userId);

  if (!userId) {
    return res.status(401).send({ success: false, error: "Unauthorized" });
  }
  try {
    const cartItems = await executeQuery(
      `SELECT p.id, p.name, p.price, p.image, c.quantity
       FROM products p
       JOIN CartList c ON p.id = c.product_id
       WHERE c.user_id = ?`,
      [userId]
    );

    res.status(200).send({ success: true, data: cartItems });
  } catch (error) {
    console.log("Failed to fetch cart items:", error);
    res.status(500).send({ success: false, error: "Failed to fetch cart items" });
  }
});

export default Router;
