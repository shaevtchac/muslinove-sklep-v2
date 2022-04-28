const router = require("express").Router();
const User = require("../models/User");
const Token = require("../models/Token");
const CryptoJS = require("crypto-js");
const sendEmail = require("../utils/email/sendEmail");

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sklep.muslinove.pl/"
    : "http://localhost:3000/";

//Reset Password _____________________________________________________________________________________________
router.post("/reset_password", async (req, res) => {
  const resetPasswordLink = `${BASE_URL}zapomniane_haslo`;
  try {
    const user = await User.findOne(req.body);
    if (!user) {
      try {
        sendEmail(
          req.body.email,
          "Resetowanie hasła muslinove.pl",
          { link: resetPasswordLink },
          "./template/requestResetPasswordWrongEmail.handlebars"
        );
        return res.status(202).send("Email wysłany.");
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      let token = await Token.findOne({ user: user._id });
      if (token) await token.deleteOne();
      try {
        let resetToken = CryptoJS.lib.WordArray.random(128 / 8).toString(
          CryptoJS.enc.Hex
        );
        const hash = CryptoJS.AES.encrypt(resetToken, process.env.JWT_SEC);
        await new Token({
          user: user._id,
          token: hash,
          createdAt: Date.now(),
        }).save();
        try {
          const link = `${BASE_URL}nowe_haslo?token=${resetToken}&id=${user._id}`;
          sendEmail(
            user.email,
            "Resetowanie hasła muslinove.pl",
            {
              name: user.name ? user.name.split(" ")[0] : "",
              link,
              resetPasswordLink,
            },
            "./template/requestResetPassword.handlebars"
          );
          return res.status(202).send("Email wysłany.");
        } catch (error) {
          console.error("problem z wysłaniem mejla");
          res.status(500).json(error);
        }
      } catch (error) {
        console.error("problem z zapisaniem nowego tokenu");
        res.status(500).json(error);
      }
    } catch (error) {
      console.error("problem ze znalezieniem lub skasowaniem tokenu");
      res.status(500).json(error);
    }
  } catch (userError) {
    console.error(userError);
    console.error("problem ze znalezieniem użytkownika");
    res.status(500).send(userError);
  }
});
//welcome email
router.post("/welcome", async (req, res) => {
  const user = req.body;
  try {
    sendEmail(
      user.email,
      "Witamy w muslinove.pl",
      { name: user.name ? user.name.split(" ")[0] : "" },
      "./template/welcome.handlebars"
    );
    return res.status(202).send("Email wysłany.");
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
