const User = require('../models/user');

class Login {
  async createUser(data) {
    return User.create(data);
  }

  async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findUserById(id) {
    return User.findByPk(id);
  }

  async updateUser(id, data) {
    const user = await this.findUserById(id);
    if (!user) return null;
    return user.update(data);
  }
}

module.exports = new Login();
