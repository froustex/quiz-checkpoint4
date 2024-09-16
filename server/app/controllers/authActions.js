const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);
    if (!user) {
      res.status(422).json({
        message:
          "aucun compte ne correspond aux identifiants fournis, veuillez vérifier vos informations",
      });
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      delete user.hashed_password;
      const token = jwt.sign(
        {
          sub: user.id,
          isAdmin: user.is_admin,
        },
        process.env.APP_SECRET,
        {
          expiresIn: "48h",
        }
      );

      res.cookie("token", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 96),
      });

      res.json({ user });
    } else {
      res.status(422).json({
        message:
          "aucun compte ne correspond aux identifiants fournis, veuillez vérifier vos informations",
      });
    }
  } catch (err) {
    next(err);
  }
};

const isLoggedIn = ({ res }) => res.sendStatus(200);
const logout = ({ res }) => res.clearCookie("token").sendStatus(200);

module.exports = { login, isLoggedIn, logout };
