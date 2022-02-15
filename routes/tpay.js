const router = require("express").Router();
const CryptoJS = require("crypto-js");

router.post("/md5", (req, res) => {
  const tpayId = process.env.TPAY_CLIENT_ID;
  const md5Sum = CryptoJS.MD5(
    tpayId + "&" + req.body.amount + "&&" + process.env.TPAY_SECURITY_CODE
  ).toString();
  res.json({ md5Sum, tpayId });
});

router.post("/notifications", (req, res) => {
  const tpayIP = req.headers["x-forwarded-for"];
  const allowedIPs = [
    "195.149.229.109",
    "148.251.96.163",
    "178.32.201.77",
    "46.248.167.59",
    "46.29.19.106",
    "176.119.38.175",
  ];
  if (allowedIPs.includes(tpayIP)) {
    console.log("ip OK");
    console.log(req.body);
  }
  res.send("TRUE");
});

module.exports = router;
