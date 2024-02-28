const express = require("express");
const PORT = 5000;
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://roy1228:${process.env.DB_PW}@cluster0.007ntnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const products = require("./src/routes/products");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", products);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
