const Order = require("../models/Order");
//const ObjectId = require("mongoose").Types.ObjectId;
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

//ADD ___________________________________________________________________________________

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  var orderToken = "";
  try {
    const savedOrder = await newOrder.save();
    // token to allow assigning the order to the new user if he/she decides to register afterwards (15mins to do it)

    if (newOrder.user.toString() === "6228682b4ab3a9d1ab3b1a03") {
      // or newOrder.user.equals(ObjectId("6228682b4ab3a9d1ab3b1a03"))
      orderToken = jwt.sign(
        {
          orderId: savedOrder.id,
        },
        process.env.JWT_SEC,
        { expiresIn: "15m" }
      );
    }
    res.status(200).json({ ...savedOrder, orderToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update________________________________________________________________________________
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update  order for unregistered users moved to auth

//delete____________________________________________________________________________
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Zamówienie usunięte.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user orders ____________________________________________________________________________
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  //user id not order id
  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ _id: -1 })
      .populate({
        path: "products.product",
      });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all _______________________________________________________________________________________________
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get single _______________________________________________________________________________________________
router.get("/:Id", verifyTokenAndAdmin, async (req, res) => {
  const id = req.params.Id;
  try {
    const order = await Order.findById(id).populate({
      path: "products.product",
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get monthly income_________________________________------------------------------------------------------------
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(date.getMonth() - 2));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
