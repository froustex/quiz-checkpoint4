const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  addUserResult,
  addRate,
  destroy,
  readSuccess,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../services/auth");
const { verifyToken, verifyAdmin } = require("../../../services/auth");

router.get("/", verifyToken, verifyAdmin, browse);

router.get("/:id", verifyToken, read);

router.post("/", hashPassword, add);

router.post("/results", addUserResult);

router.put("/rate", addRate);

router.delete("/:id", verifyToken, verifyAdmin, destroy);

module.exports = router;
