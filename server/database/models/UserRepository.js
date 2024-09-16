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
      `select id, username, email, is_admin, rate from ${this.table} where id = ?`,
      [id]
    );
    return row[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select id, username, email, is_admin from ${this.table}`
    );
    return rows;
  }

  async readUserSuccessRate(userId) {
    const [row] = await this.database.query(
      `select (sum(is_correct) / count(*)) * 100 as success_rate from user_results where user_id = ?`,
      [userId]
    );
    return row[0].success_rate;
  }

  async updateUserScore(userId, percentage) {
    await this.database.query(
      `update ${this.table} set percentage_score = ? where id = ?`,
      [percentage, userId]
    );
  }

  async readByEmail(email) {
    const [row] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return row[0];
  }

  async updateUserScore(userId, percentage) {
    const [row] = await this.database.query(
      `update user set pecentage_score = ? where id = ?`,
      [percentage, userId]
    );
    return row[0];
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
