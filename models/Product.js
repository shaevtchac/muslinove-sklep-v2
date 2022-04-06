const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Nowy produkt" },
    desc: { type: String, default: "Wpisz opis produktu" },
    images: { type: Array },
    variant: { type: String },
    categories: { type: Array },
    color: { type: String },
    price: {
      type: Number,
      default: 999,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Product", ProductSchema);
