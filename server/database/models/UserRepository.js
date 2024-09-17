const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, hashed_password, is_admin) values (?, ?, ?, ?)`,
      [user.username, user.email, user.hashedPassword, user.isAdmin]
    );
    return result.insertId;
  }

  async createUserResult(result) {
    const [row] = await this.database.query(
      `insert into user_results (user_id, question_id, is_correct) values (?, ?, ?)`,
      [result.userId, result.questionId, result.isCorrect]
    );
    return row;
  }

  async createRate(rate) {
    const [result] = await this.database.query(
      `update ${this.table} set rate = ?`,
      [rate]
    );
    return result.affectedRows;
  }

  async read(id) {
    const [row] = await this.database.query(
      `select id, username, email, is_admin, rate, percentage_score from ${this.table} where id = ?`,
      [id]
    );
    return row[0];
  }

  async readByEmail(email) {
    const [row] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return row[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select id, username, email, is_admin, percentage_score, rate from ${this.table}`
    );
    return rows;
  }

  async readUserSuccessRate(userId) {
    const [row] = await this.database.query(
      `select (sum(is_correct)/count(*)) * 100 as success_rate from user_results as r join user as u on r.user_id = u.id where u.id = ?`,
      [userId]
    );
    return row[0].success_rate;
  }

  async readUserTotalAnswer(userId) {
    const [row] = await this.database.query(
      `select sum(is_correct) as correct_sum, count(*) as total_count from user_results as r join user as u on r.user_id = u.id where u.id = ?`,
      [userId]
    );
    return row[0];
  }

  async updateUserScore(userId, percentage) {
    await this.database.query(
      `update ${this.table} set percentage_score = ? where id = ?`,
      [percentage, userId]
    );
  }

  async delete(id) {
    const [row] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return row.affectedRows;
  }
}

module.exports = UserRepository;
