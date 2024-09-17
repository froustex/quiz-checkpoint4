const AbstractRepository = require("./AbstractRepository");

class QuestionRepository extends AbstractRepository {
  constructor() {
    super({ table: "question" });
  }

  async create(question) {
    const [result] = await this.database.query(
      `insert into ${this.table} (intitule, option1, option2, option3, option4, correct_option, difficulty, theme, is_valid) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        question.intitule,
        question.option1,
        question.option2,
        question.option3,
        question.option4,
        question.correctOption,
        question.difficulty,
        question.theme,
        question.isValid,
      ]
    );
    return result.insertId;
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
