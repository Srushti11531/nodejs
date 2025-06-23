const User = require('../models/user');

const ExcelRepository = {
  async getAllUsers() {
    return await User.findAll();
  }
};

module.exports = ExcelRepository;