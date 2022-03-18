const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");

const calculateMD5 = (amount, crc) => {
  return CryptoJS.MD5(
    [
      process.env.TPAY_CLIENT_ID,
      amount,
      crc,
      process.env.TPAY_SECURITY_CODE,
    ].join("&")
  ).toString();
};

router.post("/md5", (req, res) => {
  const md5Sum = calculateMD5(req.body.amount, req.body.crc);
  res.json({ md5Sum, tpayId: process.env.TPAY_CLIENT_ID });
});

router.post("/notifications", async (req, res) => {
  var order = null;
  const tpayIP = req.headers["x-forwarded-for"];
  const allowedIPs = [
    "195.149.229.109",
    "148.251.96.163",
    "178.32.201.77",
    "46.248.167.59",
    "46.29.19.106",
    "176.119.38.175",
  ];
  // return without responding if request sent from outside of provided ip pool
  if (!allowedIPs.includes(tpayIP)) return;

  //return if order confirmed before and respond TRUE
  try {
    order = await Order.findById(req.body.tr_crc);
    if (order.status === "paid") {
      res.send("TRUE");
      return;
    }
  } catch (error) {
    if (order === null) {
      console.error(`Nie znaleziono zamówienia o numerze ${req.body.crc}`); //output goes to /logs/passenger.log
    }
    console.error(error.message);
    console.log(req.body);
  }

  // respond TRUE if amount and orderid from tpay is the same in db AND mb5sum is correct, change order status accordingly to tr_status

  if (
    req.body.tr_crc === order._id.toString() &&
    parseFloat(req.body.tr_amount) * 100 === order.amount &&
    req.body.md5sum ===
      CryptoJS.MD5(
        process.env.TPAY_CLIENT_ID +
          req.body.tr_id +
          req.body.tr_amount +
          req.body.tr_crc +
          process.env.TPAY_SECURITY_CODE
      ).toString()
  ) {
    res.send("TRUE");
    let status = "";
    if (req.body.tr_status === "TRUE") {
      status = "Zapłacone";
    } else if (req.body.tr_status === "CHARGEBACK") {
      status = "Płatność zwrócona";
    } else status = req.body.tr_status;
    try {
      await Order.findByIdAndUpdate(order._id, { status });
    } catch (error) {
      console.error(
        `Problem ze zaktualizowaniem statusu transakcji nr ${order._id}`
      );
      console.error(error.message);
    }
  } else {
    console.error(
      `Błąd powiadomień TPAY: Dane z płatności o numerze ${req.body.tr_id} niezgodne z zamówieniem`
    );
    console.log(
      "req.body.tr_crc:",
      req.body.tr_crc,
      "= order.id:",
      order._id.toString(),
      "parseFloat(req.body.tr_amount) * 100",
      parseFloat(req.body.tr_amount) * 100,
      "=order.amount",
      order.amount,
      "req.body.md5sum:",
      req.body.md5sum,
      "=calc md5:",
      CryptoJS.MD5(
        process.env.TPAY_CLIENT_ID +
          req.body.tr_id +
          req.body.tr_amount +
          req.body.tr_crc +
          process.env.TPAY_SECURITY_CODE
      ).toString()
    );
  }
});

module.exports = router;
