const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register__________________________________________________________________________________
router.post("/register", async (req, res) => {
  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
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

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
