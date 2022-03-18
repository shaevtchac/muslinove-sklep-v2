const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        _id: false,
      },
    ],
    amount: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
      required: true,
    },
    name: { type: String },
    address: { type: String },
    postalCode: {
      type: String,
    },
    city: {
      type: String,
    },
    message: {
      type: String,
    },
    status: { type: String, default: "Nie zapłacone" },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Order", OrderSchema);
