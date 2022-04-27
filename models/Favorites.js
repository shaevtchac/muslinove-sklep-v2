const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        _id: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("favorites", favoritesSchema);
