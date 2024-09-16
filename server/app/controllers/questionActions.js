const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const questions = await tables.question.getQuestionsTest();
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

const browseQuiz = async (req, res, next) => {
  const { theme, difficulty } = req.params;
  try {
    const quiz = await tables.question.getQuestionsByThemeAndDifficulty(
      theme,
      difficulty
    );
    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

const browseThemeAndDifficulty = async (req, res, next) => {
  try {
    const results = await tables.question.getThemeAndDifficulty();
    res.json(results);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, browseQuiz, browseThemeAndDifficulty };
