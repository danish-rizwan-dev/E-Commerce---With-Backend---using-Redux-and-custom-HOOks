import express from "express";
const app = express();
import constants from './constants.js';
import cors from "cors";
import bodyParser from "body-parser";
import { AuthMiddleware } from "./middlewares/authMiddleware.js";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(AuthMiddleware);
import authRouter from "./routes/auth.js"
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cartItems.js";

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use('/cartItems', cartRouter);

app.listen(constants.PORT, () => console.log("Server Started on Port : " + constants.PORT));
