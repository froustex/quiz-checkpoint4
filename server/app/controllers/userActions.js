const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const readSuccess = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const successRate = await tables.user.readUserSuccessRate(userId);
    res.json({ successRate });
  } catch (err) {
    next(err);
  }
};

const readTotalAnswer = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = await tables.user.readUserTotalAnswer(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const editPercentageScore = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const successRate = await tables.user.readUserSuccessRate(userId);
    const [result] = await tables.user.updateUserScore(userId, successRate);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const userExists = await tables.user.readByEmail(req.body.email);
    if (userExists) {
      res
        .status(400)
        .json({ message: "Cette adresse email est déjà utilisée." });
      return;
    }
    const user = req.body;
    if (
      !user ||
      !user.username ||
      !user.hashedPassword ||
      user.isAdmin === null
    ) {
      res.sendStatus(400);
      return;
    }
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const addUserResult = async (req, res, next) => {
  const userResult = req.body;
  try {
    const result = await tables.user.createUserResult(userResult);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

const addRate = async (req, res, next) => {
  try {
    const { rate, id } = req.body;
    await tables.user.createRate(rate, id);
    res.status(201).json({ message: "Votre note a été prise en compte" });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  readSuccess,
  readTotalAnswer,
  editPercentageScore,
  add,
  addUserResult,
  addRate,
  destroy,
};
