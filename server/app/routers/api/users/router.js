const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  readSuccess,
  readTotalAnswer,
  editPercentageScore,
  add,
  addUserResult,
  addRate,
  destroy,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../services/auth");
const { verifyToken, verifyAdmin } = require("../../../services/auth");

router.get("/", verifyToken, verifyAdmin, browse);

router.get("/:id", read);

router.get("/:userId/successRate", readSuccess);

router.get("/:userId/answers", readTotalAnswer);

router.put("/:userId/percentagescore", editPercentageScore);

router.post("/", hashPassword, add);

router.post("/results", addUserResult);

router.put("/rate", addRate);

router.delete("/:id", verifyToken, verifyAdmin, destroy);

module.exports = router;
