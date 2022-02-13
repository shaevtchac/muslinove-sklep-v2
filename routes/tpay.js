const router = require("express").Router();
const CryptoJS = require("crypto-js");

router.post("/md5", (req, res) => {
  const tpayId = process.env.TPAY_CLIENT_ID;
  const md5Sum = CryptoJS.MD5(
    tpayId + "&" + req.body.amount + "&&" + process.env.TPAY_SECURITY_CODE
  ).toString();
  res.json({ md5Sum, tpayId });
});

module.exports = router;
