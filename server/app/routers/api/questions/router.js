const express = require("express");

const router = express.Router();

const {
  browse,
  browseQuiz,
  browseThemeAndDifficulty,
} = require("../../../controllers/questionActions");

const { verifyToken } = require("../../../services/auth");

router.get("/test", browse);

router.get("/:theme/:difficulty", verifyToken, browseQuiz);

router.get("/themes", browseThemeAndDifficulty);

module.exports = router;
