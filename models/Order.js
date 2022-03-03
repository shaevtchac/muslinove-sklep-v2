const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
      required: true,
    },
    address: { type: Object },
    postalCode: {
      type: String,
    },
    city: {
      type: String,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Order", OrderSchema);
