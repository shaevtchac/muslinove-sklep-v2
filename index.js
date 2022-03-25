const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const tpayRoute = require("./routes/tpay");
const imagesRoute = require("./routes/images");
const cors = require("cors");
const fileUpload = require("express-fileupload");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful..."))
  .catch((err) => console.log(err));
app.use(cors());
app.use(fileUpload());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/tpay", tpayRoute);
app.use("/api/images", imagesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(express.static("admin/build"));
  const path = require("path");
  app.get("/admin*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "admin", "build", "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
