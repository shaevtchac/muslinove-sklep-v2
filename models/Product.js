const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Nowy produkt" },
    desc: { type: String, default: "Wpisz opis produktu" },
    images: { type: Array },
    categories: { type: Array },
    color: { type: String },
    price: { type: Number, default: 999 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
