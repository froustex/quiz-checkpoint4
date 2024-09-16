const AbstractRepository = require("./AbstractRepository");

class QuestionRepository extends AbstractRepository {
  constructor() {
    super({ table: "question" });
  }

  async getQuestionsTest() {
    const [rows] = await this.database.query(`select * from question limit 10`);
    return rows;
  }

  async getThemeAndDifficulty() {
    const [rows] = await this.database.query(
      `select distinct theme, difficulty from question`
    );
    return rows;
  }

  async getQuestionsByThemeAndDifficulty(theme, difficulty) {
    const [rows] = await this.database.query(
      `select * from question where theme = ? and difficulty = ? order by rand() limit 10`,
      [theme, difficulty]
    );
    return rows;
  }
}

module.exports = QuestionRepository;
