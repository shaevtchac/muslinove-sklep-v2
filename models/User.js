const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Wpisz adres e-mail"],
      unique: true,
    },

    password: {
      type: String,
      minlength: [8, "Hasło musi mieć conajmniej 8 znaków"],
      required: [true, "Wpisz hasło"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    postalCode: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
