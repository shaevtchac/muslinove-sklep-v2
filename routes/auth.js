const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Token = require("../models/Token");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyOrderIdToken } = require("./verifyToken");
const ObjectId = require("mongoose").Types.ObjectId;

const calculateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );
};

//Register__________________________________________________________________________________
router.post("/register", async (req, res) => {
  try {
    const rUser = await User.findOne({ email: req.body.email });
    if (rUser) {
      return res
        .status(422)
        .send("Użytkownik o podanym adresie e-mail jest już zarejestrowany.");
    }
  } catch (error) {
    console.error("Problem ze sprawdzeniem czy użytkownik jest w bazie.");
    console.error(error);
  }

  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });

  try {
    const savedUser = await newUser.save();
    const accessToken = calculateToken(savedUser);

    const { password, ...others } = savedUser._doc;
    res.status(201).json({ ...others, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//Login _____________________________________________________________________________________________
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Błędne dane logowania!");
    const hashedPasswordFromDB = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const passwordFromDB = hashedPasswordFromDB.toString(CryptoJS.enc.Utf8);
    passwordFromDB !== req.body.password &&
      res.status(401).json("Błędne dane logowania!");

    const accessToken = calculateToken(user);

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});
//update unregistered order
router.put("/:orderId", verifyOrderIdToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body
    );
    res.status(200).json("Order updated");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/validate_token", async (req, res) => {
  try {
    const token = await Token.findOne({ user: new ObjectId(req.body.userId) });
    if (!token) return res.status(404).send("Token not found.");
    const hashedTokenFromDB = CryptoJS.AES.decrypt(
      token.token,
      process.env.JWT_SEC
    );
    const tokenFromDB = hashedTokenFromDB.toString(CryptoJS.enc.Utf8);
    if (tokenFromDB === req.body.token) {
      try {
        const user = await User.findById(req.body.userId);
        const accessToken = calculateToken(user);
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
      } catch (error) {
        res.status(500).json(error);
      }
    }
    res.status(422).send("Bad token.");
  } catch (error) {
    res.status(500).send(error.name);
    console.log(error);
  }
});

module.exports = router;
