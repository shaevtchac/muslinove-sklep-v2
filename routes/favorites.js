const favorites = require("../models/favorites");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

//ADD ___________________________________________________________________________________

router.post("/", async (req, res) => {
  const newfavorites = new favorites(req.body);

  try {
    const savedfavorites = await newfavorites.save();
    res.status(200).json(savedfavorites);
  } catch (error) {
    res.status(500).json(error);
  }
});

//user favorites update________________________________________________________________________________
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedfavorites = await favorites.findOneAndUpdate(
      { user: new ObjectId(req.params.userId) },
      {
        $set: req.body.favorites,
      },
      { new: true }
    );
    res.status(200).json(updatedfavorites);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//delete____________________________________________________________________________
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await favorites.findByIdAndDelete(req.params.id);
    res.status(200).json("Ulubione usunięte.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user favorites ____________________________________________________________________________
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  //user id not favorites id
  try {
    const favorites = await favorites
      .findOne({
        user: new ObjectId(req.params.userId),
      })
      .populate({ path: "products.product" });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all _______________________________________________________________________________________________
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const favoritess = await favorites.find();
    res.status(200).json(favoritess);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
