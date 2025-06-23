// const userRepository = require('../Repository/userRepository');

// const getUsersByEmailStart = async (req) => {

//     // const { letter } = req;
//     // if (!letter || letter.length !== 1) {
//     //     throw new Error('Invalid letter input');
//     // }

//     return await userRepository.searchUsers(req);
// };

// module.exports = {
//     getUsersByEmailStart,
// };


// services/userService.js
const userRepo = require('../Repository/userRepository');
const passwordUtils = require('../utils/password');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');



const upsertUser = async (req) => {
  return await userRepo.upsertUser(req);
};

const create = async (data) => {
  return await userRepo.createUser(data);
};
const { sendWelcomeEmail } = require('./mailservice');

const createUser = async (data) => {
  try {

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }


    const user = await create(data);


    await sendWelcomeEmail(user.email, user.username || user.name);

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  return await userRepo.getUserById(id);
};

const updateUser = async (id, data) => {
  try {
    console.log('id:', id);

    // If password is present in data, hash it
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }

    const [updated] = await Users.update(data, {
      where: { id },
    });

    return updated ? await Users.findByPk(id) : null;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

const bulkUpdateUsers = async (id, data) => {
  return await userRepo.softDeleteUser(id, data);
};
const deleteUser = async (id) => {
  return await userRepo.softDeleteUser(id);
};

const getUsersByEmailStart = async ({ email }) => {
  return await userRepo.filterUsersByEmail(email);
};

const filterUsersByEmailIn = async ({ search }) => {
  return await userRepo.filterUsersByEmailIn(search);
};


const getUsersWithMenus = async ({ search }) => {
  return await userRepo.getUsersWithMenus(search);
};
const getmenu = async (req) => {
  return await userRepo.getmenu(req);
};


const login = async (req) => {
  try {
    const { email, password } = req;

    if (!email || !password) {
      console.log('Missing credentials:', { email, password });
      return { error: 'Email and password are required' };
    }

    const users = await userRepo.filterUsersByEmail(email);
    const user = users && users[0];

    if (!user || !user.password) {
      return { error: 'Invalid email or password' };
    }

    const userPassword = user?.dataValues?.password || user?.password;
    const isValid = await passwordUtils.isValidPassword(password, userPassword);

    if (!isValid) {
      return { error: 'Invalid email or password' };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '1d',
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    };

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Login failed due to server error' };
  }
};



const fetchAllUsers = async () => {
  try {
    return await userRepo.getAllUsers();
  } catch (error) {
    throw error;
  }
};
// return await userRepo.login(req);
const User = async () => {
  try {
    const { id, name, email, age, softdelete, menuIds, gender } = req.body;

    // Upsert user (create if no id or not found, update if id exists)
    const [user, created] = await User.upsert({
      id,
      name,
      email,
      age,
      softdelete,
      menuIds,
      gender,
    });

    res.status(created ? 201 : 200).json({
      message: created ? 'User created successfully' : 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error in upsert:', error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  upsertUser,
  createUser,
  getUserById,
  updateUser,
  bulkUpdateUsers,
  deleteUser,
  fetchAllUsers,
  getUsersByEmailStart,
  filterUsersByEmailIn,
  getUsersWithMenus,
  getmenu,
  User,
  login,
};
