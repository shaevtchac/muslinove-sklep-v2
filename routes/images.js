const router = require("express").Router();
const fs = require("fs");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/upload", verifyTokenAndAdmin, function (req, res) {
  let image;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  image = req.files.image;
  uploadPath =
    __dirname + "../../admin/public/images/" + req.body.id + "/" + image.name;

  // Use the mv() method to place the file somewhere on your server
  image.mv(uploadPath, function (err) {
    if (err)
      return res
        .status(500)
        .send("Nie udało się załadować pliku" + "\n" + err.message);

    res.status(200).json(image.name);
  });
});

router.post("/remove", verifyTokenAndAdmin, function (req, res) {
  const path = __dirname + "../../admin/public" + req.body.path;

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      res.status(400).send("Nie udało się usunąć pliku" + "\n" + err.message);
      return;
    }
    res.status(200).json("Plik usunięty");
  });
});

router.post("/create_dir", verifyTokenAndAdmin, function (req, res) {
  const path = __dirname + "../../admin/public/images/" + req.body.id;

  fs.mkdir(path, (err) => {
    if (err) {
      console.error(err);
      res
        .status(400)
        .send("Nie udało się utworzyć katalogu" + "\n" + err.message);
      return;
    }
    res.status(200).json("Utworzono katalog o nazwie " + req.body.id);
  });
});

router.post("/remove_dir", verifyTokenAndAdmin, function (req, res) {
  const path = __dirname + "../../admin/public/images/" + req.body.id;

  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res
        .status(400)
        .send("Nie udało się usunąć katalogu " + "\n" + err.message);
      return;
    }
    res.status(200).json("Usunięto katalog o nazwie " + req.body.id);
  });
});

module.exports = router;
