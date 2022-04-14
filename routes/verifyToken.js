const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Nieprawidłowy token!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Brak tokenu");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.id === req.params.userId || req.user?.isAdmin) {
      next();
    } else {
      return res.status(403).json("Brak uprawnień.");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Brak uprawnień (admin)");
      //TODO: usunąć admin w wer prod
    }
  });
};

const verifyOrderIdToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, order) => {
      if (err) return res.status(403).json("Nieprawidłowy token!");
      req.order = order;
      next();
    });
  } else {
    return res.status(401).json("Brak tokenu");
  }
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyOrderIdToken,
};
