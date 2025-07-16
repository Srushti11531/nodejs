// // const userRepository = require('../Repository/userRepository');

// // const getUsersByEmailStart = async (req) => {

// //     // const { letter } = req;
// //     // if (!letter || letter.length !== 1) {
// //     //     throw new Error('Invalid letter input');
// //     // }

// //     return await userRepository.searchUsers(req);
// // };

// // module.exports = {
// //     getUsersByEmailStart,
// // };


// // services/userService.js
// const userRepo = require('../Repository/userRepository');
// const passwordUtils = require('../utils/password');
// const bcrypt = require('bcrypt');
// const Users = require('../models/user');
// const { sendToMailQueue } = require('../Service/mailservice');
// const jwt = require('jsonwebtoken');
// const MessageConstant = require("../constants/MessageConstant");
// const getTemplate = require('../utils/mailtemplate');
// const { enqueueEmailJob } = require('../query/mailquery');
// const { sendWelcomeEmail } = require('./mailservice');
// const { error } = require('../utils/response');
// //const { BadRequestException } = require('../utils/error');
// const { AppError, BadRequestException } = require('../utils/error');
// const { StatusCodes, getReasonPhrase } = require('http-status-codes'); //  correct
// const schedule = require('node-schedule');
// //const scheduleUserUnblock=require('./scheduleservice')



// const scheduleUserUnblock = (user, blockedAt) => {
//   if (!user || !blockedAt) return;

//   // Use a unique job key based on user ID
//   const jobKey = `unblock_${user.id}`;
//   console.log('scheduleJob set')

//   schedule.scheduleJob(jobKey, blockedAt, async () => {
//     try {
//       await userRepo.updateUser(user.id, {
//         loginAttempts: 0,
//         blockedAt: null,
//       });

//       console.log(` User "${user.name}" (${user.email}) has been automatically unblocked.`);
//     } catch (error) {
//       console.error(` Failed to unblock user "${user.name}" (${user.email}):`, error);
//     }
//   });

//   // console.log(` Unblock job scheduled for "${user.name}" (${user.email}) at ${user.blockedAt}`);
// };

// const upsertUser = async (req) => {
//   return await userRepo.upsertUser(req);
// };

// const create = async (data) => {
//   return await userRepo.createUser(data);
// };
// const createUser = async (req) => {
//   const { name, email } = req;
//   //console.log(req)

//   if (!name || !email) {
//     return res.status(400).json({ message: "All fields are required." });
//   }
//   const user = await Users.create(req);
//   return user;
// };


// const getUserById = async (id) => {
//   return await userRepo.getUserById(id);
// };

// const updateUser = async (id, data) => {
//   try {
//     console.log('id:', id);

//     // If password is present in data, hash it
//     if (data.password) {
//       const saltRounds = 10;
//       data.password = await bcrypt.hash(data.password, saltRounds);
//     }

//     const [updated] = await Users.update(data, {
//       where: { id },
//     });

//     return updated ? await Users.findByPk(id) : null;
//   } catch (error) {
//     console.error('Update user error:', error);
//     throw error;
//   }
// };

// const bulkUpdateUsers = async (id, data) => {
//   return await userRepo.softDeleteUser(id, data);
// };
// const deleteUser = async (id) => {
//   return await userRepo.softDeleteUser(id);
// };
// const findUserByEmail = async (email) => {
//   return await Users.findOne({ where: { email } });
// };

// const getUsersByEmailStart = async ({ email }) => {
//   return await userRepo.filterUsersByEmail(email);
// };

// const filterUsersByEmailIn = async ({ search }) => {
//   return await userRepo.filterUsersByEmailIn(search);
// };


// const getUsersWithMenus = async ({ search }) => {
//   return await userRepo.getUsersWithMenus(search);
// };
// const getmenu = async (req) => {
//   return await userRepo.getmenu(req);
// };


// // const login = async (req) => {
// //   try {
// //     const { email, password } = req;

// //     if (!email || !password) {
// //       console.log('Missing credentials:', { email, password });
// //       return { error: 'Email and password are required' };
// //     }

// //     const users = await userRepo.filterUsersByEmail(email);
// //     const user = users && users[0];

// //     if (!user || !user.password) {
// //       return { error: 'Invalid email or password' };
// //     }

// //     const userPassword = user?.dataValues?.password || user?.password;
// //     const isValid = await passwordUtils.isValidPassword(password, userPassword);

// //     if (!isValid) {
// //       return { error: 'Invalid email or password' };
// //     }

// //     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
// //       expiresIn: process.env.JWT_REFRESH_EXPIRATION || '1d',
// //     });

// //     return {
// //       id: user.id,
// //       name: user.name,
// //       email: user.email,
// //       accessToken: token,
// //     };

// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return { error: 'Login failed due to server error' };
// //   }
// // };

// //extra

// // const LOCK_TIME = 1 * 60 * 1000;
// // const MAX_ATTEMPTS = 5;
// // const JWT_SECRET = 'your_jwt_secret_here';
// // const loginLogs = [];

// // const login = async ({ email, password }) => {
// //   if (!email || !password) {
// //     throw new BadRequestException(MessageConstant.USER.ALL_FIELDS_REQUIRED);
// //   }

// //   const user = await userRepo.findUserByEmail(email);
// //   if (!user) {
// //     throw new BadRequestException(MessageConstant.USER.INVALID_EMAIL_OR_PASSWORD);
// //   }

// //   const now = new Date();

// //   if (user.blockedAt && user.blockedAt > now) {
// //     const remainingMin = Math.ceil((user.blockedAt - now) / 60000);
// //     throw new BadRequestException(
// //      ` ${MessageConstant.USER.BLOCKED} Try again in ${remainingMin} minute(s).
// //     `);
// //   }

// //   const isValidPassword = await bcrypt.compare(password, user.password);
// //   if (!isValidPassword) {
// //     user.loginAttempts = (user.loginAttempts || 0) + 1;

// //     if (user.loginAttempts >= MAX_ATTEMPTS) {
// //       user.blockedAt = new Date(Date.now() + LOCK_TIME);
// //       console.log(`User ${user.email} is now blocked until ${user.blockedAt}`);

// //       //  Schedule unblock job
// //       schedule.scheduleJob(user.blockedAt, async () => {
// //         user.loginAttempts = 0;
// //         user.blockedAt = null;
// //         await user.save();
// //         console.log(` User ${user.email} has been automatically unblocked`);
// //       });
// //     }

// //     await user.save();
// //     throw new BadRequestException(
// //      ` ${MessageConstant.USER.INVALID_CREDENTIALS} (${user.loginAttempts}/${MAX_ATTEMPTS})
// //     `);
// //   }

// //   //  Login success
// //   user.loginAttempts = 0;
// //   user.blockedAt = null;
// //   await user.save();

// //   const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

// //   const loginLog =` ${StatusCodes.OK} - ${getReasonPhrase(StatusCodes.OK)}: Login successful for ${user.email}`;
// //   loginLogs.push(loginLog);
// //   console.log(loginLog);

// //   return {
// //     id: user.id,
// //     name: user.name,
// //     email: user.email,
// //     token,
// //   };
// // };


// const LOCK_TIME = 1 * 60 * 1000; // 1 minute
// const MAX_ATTEMPTS = 5;
// const JWT_SECRET = 'your_jwt_secret_here';
// const loginLogs = [];

// const login = async ({ email, password }) => {
//   if (!email || !password) {
//     const missingFields = [email, password].filter((field) => !field).length;
//     throw new BadRequestException(
//       MessageConstant.USER.REQUIRED_FIELDS_MESSAGE(missingFields)
//     );
//   }

//   const user = await userRepo.findUserByEmail(email);
//   if (!user) {
//     throw new BadRequestException(
//       MessageConstant.USER.EMAIL_OR_PASSWORD()
//     );
//   }

//   const now = new Date();

//   // Still blocked
//   if (user.blockedAt) {
//     const blockDate = new Date(user.blockedAt.getTime() + LOCK_TIME);

//     if (now < blockDate) {
//       const remainingMin = Math.ceil((blockDate - now) / 60000);
//       throw new BadRequestException(
//         MessageConstant.USER.BLOCKED_MESSAGE(remainingMin)
//       );
//     } else {
//       // Auto-unblock if time expired
//       user.blockedAt = null;
//       user.loginAttempts = 0;
//       await userRepo.updateUser(user.id, {
//         blockedAt: null,
//         loginAttempts: 0,
//       });
//       console.log(`Auto-unblocked ${user.email} after block time.`);
//     }
//   }

//   // Password validation
//   const isValidPassword = await bcrypt.compare(password, user.password);
//   if (!isValidPassword) {
//     const attempts = (user.loginAttempts || 0) + 1;
//     let blockedAt = user.blockedAt;

//     if (attempts >= MAX_ATTEMPTS) {
//       blockedAt = new Date();
//       console.log(
//         `User ${user.email} is now blocked until ${new Date(
//           blockedAt.getTime() + LOCK_TIME
//         ).toLocaleTimeString()}`
//       );

//       // Schedule auto-unblock
//       scheduleUserUnblock(user, new Date(blockedAt.getTime() + LOCK_TIME));
//     }

//     await userRepo.updateUser(user.id, {
//       loginAttempts: attempts,
//       blockedAt: blockedAt,
//     });

//     throw new BadRequestException(
//       `${MessageConstant.USER.EMAIL_OR_PASSWORD()} (${attempts}/${MAX_ATTEMPTS})`
//     );
//   }

//   // Successful login
//   await userRepo.updateUser(user.id, {
//     loginAttempts: 0,
//     blockedAt: null,
//   });

//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     JWT_SECRET,
//     { expiresIn: '1h' }
//   );

//   const loginLog = `${StatusCodes.OK} - ${getReasonPhrase(
//     StatusCodes.OK
//   )}: Login successful for ${user.email}`;
//   loginLogs.push(loginLog);
//   console.log(loginLog);

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     token,
//   };
// };

// const fetchAllUsers = async () => {
//   try {
//     return await userRepo.getAllUsers();
//   } catch (error) {
//     throw error;
//   }
// };
// // return await userRepo.login(req);
// const User = async () => {
//   try {
//     const { id, name, email, age, softdelete, menuIds, gender } = req.body;

//     // Upsert user (create if no id or not found, update if id exists)
//     const [user, created] = await User.upsert({
//       id,
//       name,
//       email,
//       age,
//       softdelete,
//       menuIds,
//       gender,
//     });

//     res.status(created ? 201 : 200).json({
//       message: created ? 'User created successfully' : 'User updated successfully',
//       user,
//     });
//   } catch (error) {
//     console.error('Error in upsert:', error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const queueEmailsForAllUsers = async () => {
//   const users = await userRepo.fetchAllUsers();

//   if (!users || users.length === 0) {
//     return [];
//   }

//   for (const user of users) {
//     const emailPayload = {
//       to: user.email,
//       name: user.name,
//       subject: 'Hello from Our App!',
//       html: getTemplate(user.name),
//     };

//     console.log('Queueing email payload:', emailPayload);

//     await sendToMailQueue(emailPayload);
//   }

//   return users.map(({ email, name }) => ({ email, name }));
// };
// const scheduleEmailsForUsers = async () => {
//   const users = await userRepo.fetchAllUsers();

//   if (!users || !users.length) return [];

//   for (const user of users) {
//     const emailPayload = {
//       to: user.email,
//       name: user.name,
//       subject: 'Scheduled Hello from Our App!',
//       html: getTemplate(user.name),
//     };

//     await enqueueEmailJob(emailPayload); // Add job to queue
//   }

//   return users.map(({ email, name }) => ({ email, name }));
// };


// module.exports = {
//   upsertUser,
//   scheduleUserUnblock,
//   createUser,
//   getUserById,
//   filterUsersByEmailIn,
//   getUsersWithMenus,
//   getmenu,
//   User,
//   login,
//   fetchAllUsers,
//   updateUser,
//   bulkUpdateUsers,
//   getUsersByEmailStart,
//   deleteUser,
//   findUserByEmail,
//   queueEmailsForAllUsers,
//   scheduleEmailsForUsers,
// };





const userRepo = require('../Repository/userRepository');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const MessageConstant = require('../constants/MessageConstant');
const { sendToMailQueue } = require('../Service/mailservice');
const getTemplate = require('../utils/mailtemplate');
const { enqueueEmailJob } = require('../query/mailquery');
const { AppError, BadRequestException } = require('../utils/error');

const axios = require('axios');
const FAKE_API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const LOCK_TIME = 1 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const JWT_SECRET = 'your_jwt_secret_here';
const loginLogs = [];

// ==============================
// 🔐 Authentication & Login
// ==============================
const scheduleUserUnblock = (user, blockedAt) => {
  if (!user || !blockedAt) return;

  const jobKey = `unblock_${user.id}`;
  schedule.scheduleJob(jobKey, blockedAt, async () => {
    try {
      await userRepo.updateUser(user.id, {
        loginAttempts: 0,
        blockedAt: null,
      });
      console.log(`User "${user.name}" has been automatically unblocked.`);
    } catch (error) {
      console.error(`Failed to unblock user "${user.name}":`, error);
    }
  });
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new BadRequestException(
      MessageConstant.USER.REQUIRED_FIELDS_MESSAGE(2)
    );
  }

  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new BadRequestException(MessageConstant.USER.EMAIL_OR_PASSWORD());
  }

  const now = new Date();
  if (user.blockedAt) {
    const blockUntil = new Date(user.blockedAt.getTime() + LOCK_TIME);
    if (now < blockUntil) {
      const remainingMin = Math.ceil((blockUntil - now) / 60000);
      throw new BadRequestException(
        MessageConstant.USER.BLOCKED_MESSAGE(remainingMin)
      );
    } else {
      await userRepo.updateUser(user.id, { loginAttempts: 0, blockedAt: null });
    }
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const attempts = (user.loginAttempts || 0) + 1;
    let blockedAt = null;

    if (attempts >= MAX_ATTEMPTS) {
      blockedAt = new Date();
      scheduleUserUnblock(user, new Date(blockedAt.getTime() + LOCK_TIME));
    }

    await userRepo.updateUser(user.id, { loginAttempts: attempts, blockedAt });
    throw new BadRequestException(
      `${MessageConstant.USER.EMAIL_OR_PASSWORD()} (${attempts}/${MAX_ATTEMPTS})
    `);
  }

  await userRepo.updateUser(user.id, { loginAttempts: 0, blockedAt: null });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  const loginLog = `${StatusCodes.OK} - ${getReasonPhrase(StatusCodes.OK)}: Login successful for ${user.email}`;
  loginLogs.push(loginLog);
  console.log(loginLog);

  return { id: user.id, name: user.name, email: user.email, token };
};

// ==============================
// 📁 User CRUD Services
// ==============================

const upsertUser = async (req) => await userRepo.upsertUser(req);
const createUser = async (req) => await Users.create(req);
const getUserById = async (id) => await userRepo.getUserById(id);
const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const [updated] = await Users.update(data, { where: { id } });
  return updated ? await Users.findByPk(id) : null;
};
const bulkUpdateUsers = async (id, data) => await userRepo.softDeleteUser(id, data);
const deleteUser = async (id) => await userRepo.softDeleteUser(id);
const findUserByEmail = async (email) => await Users.findOne({ where: { email } });
const getUsersByEmailStart = async ({ email }) => await userRepo.filterUsersByEmail(email);
const filterUsersByEmailIn = async ({ search }) => await userRepo.filterUsersByEmailIn(search);
const getUsersWithMenus = async ({ search }) => await userRepo.getUsersWithMenus(search);
const getmenu = async (req) => await userRepo.getmenu(req);
const fetchAllUsers = async () => await userRepo.getAllUsers();

const queueEmailsForAllUsers = async () => {
  const users = await userRepo.fetchAllUsers();
  for (const user of users) {
    const emailPayload = {
      to: user.email,
      name: user.name,
      subject: 'Hello from Our App!',
      html: getTemplate(user.name),
    };
    await sendToMailQueue(emailPayload);
  }
  return users.map(({ email, name }) => ({ email, name }));
};

const scheduleEmailsForUsers = async () => {
  const users = await userRepo.fetchAllUsers();
  for (const user of users) {
    const emailPayload = {
      to: user.email,
      name: user.name,
      subject: 'Scheduled Hello from Our App!',
      html: getTemplate(user.name),
    };
    await enqueueEmailJob(emailPayload);
  }
  return users.map(({ email, name }) => ({ email, name }));
};

// ==============================
// 🌐 Third-Party API Functions
// ==============================

const getThirdPartyUsers = async () => {
  const res = await axios.get(`${FAKE_API_BASE_URL}/users`);
  return res.data;
};

const getThirdPartyUserById = async (id) => {
  const res = await axios.get(`${FAKE_API_BASE_URL}/users/${id}`);
  return res.data;
};

const createThirdPartyUser = async (userData) => {
  const res = await axios.post(`${FAKE_API_BASE_URL}/users`, userData, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
};

const updateThirdPartyUser = async (id, userData) => {
  const res = await axios.put(`${FAKE_API_BASE_URL}/users/${id}`, userData, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
};

const deleteThirdPartyUser = async (id) => {
  await axios.delete(`${FAKE_API_BASE_URL}/users/${id}`);
  return { success: true, id };
};

// ==============================
// 📦 Exports
// ==============================

module.exports = {
  upsertUser,
  scheduleUserUnblock,
  createUser,
  getUserById,
  updateUser,
  bulkUpdateUsers,
  deleteUser,
  findUserByEmail,
  getUsersByEmailStart,
  filterUsersByEmailIn,
  getUsersWithMenus,
  getmenu,
  login,
  fetchAllUsers,
  queueEmailsForAllUsers,
  scheduleEmailsForUsers,

  // 🌐 Third-party API services
  getThirdPartyUsers,
  getThirdPartyUserById,
  createThirdPartyUser,
  updateThirdPartyUser,
  deleteThirdPartyUser,
};

