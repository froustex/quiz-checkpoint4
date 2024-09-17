const express = require("express");

const router = express.Router();

const {
  browse,
  browseAll,
  browseQuiz,
  browseThemeAndDifficulty,
  add,
} = require("../../../controllers/questionActions");

const { verifyToken } = require("../../../services/auth");

router.get("/test", browse);

router.get("/", browseAll);

router.get("/:theme/:difficulty", verifyToken, browseQuiz);

router.get("/themes", browseThemeAndDifficulty);

router.post("/add", add);

module.exports = router;
