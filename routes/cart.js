const Cart = require("../models/Cart");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

//ADD ___________________________________________________________________________________

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//user cart update________________________________________________________________________________
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: new ObjectId(req.params.userId) },
      {
        $set: req.body.cart,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//delete____________________________________________________________________________
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Wózek usunięty.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user cart ____________________________________________________________________________
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  //user id not cart id
  try {
    const cart = await Cart.findOne({
      user: new ObjectId(req.params.userId),
    }).populate({ path: "products.product" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all _______________________________________________________________________________________________
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
