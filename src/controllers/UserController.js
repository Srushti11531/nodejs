// // const models = require("../models/index");
// // const { Op } = require("sequelize");
// const User = require("../models/user");
// const controller = {};
// const userService = require('../Service/userService');

// //const User = require("../models/User");

// // exports.getUsers = (req, res) => {
// //   const users = User.getAll();
// //   res.render('users', { users });
// // };

// // controller.getAll = async function (req, res) {
// //   try {
// //       const userData = await User.findAll();
// //       if (userData.length > 0) {
// //            res
// //               .status(200)
// //               .json({ message: "Connection successful", data: userData });
// //       } else {
// //           res.status(200).json({ message: "Connection failed", data: [] });
// //       }
// //   } catch (error) {
// //     console.log(error)
// //       res.status(404).json({ message: error });
// //   }
// // };

// //const User = require('../models/User'); // Import the User model

// // Create a new user
// // const createUser = async (req, res) => {
// //   console.log("createUser: ",req.body)
// //   debugger
// //   try {
// //     const { User } = require('../models');
// // const { Op } = require('sequelize');

// // const patterns = ['%srushti@gmail.com%', '%hasti@gmail.com%'];

// // const users = await User.findAll({
// //   where: {
// //     [Op.or]: patterns.map(pattern => ({
// //       email: { [Op.like]: pattern }
// //     }))
// //   }
// // });
// //     const user = await User.create({

// //       name: req.body.name,
// //       email: req.body.email,
// //       age: req.body.age,
// //     });
// //     // debugger
// //     console.log('user---------------------------',user);

// //     res.status(201).json(user);
// //   } catch (error) {
// //     console.log(error)
// //     res.status(400).json({ error: error.message });
// //   }
// // };

// const createUser = async (req, res) => {
//   console.log("createUser: ", req.body); // Should show full object
//   try {
//     const user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       age: req.body.age,
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// };


// // // Get a user by ID
// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // // Update a user by ID
// const updateUser = async (req, res) => {
//   try {
//     // const user = await User.findByPk(req.params.id);

//     const user = await User.update(reqData, {
//       where,
//       returning
//     });
//     console.log(user);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.age = req.body.age || user.age;
//       await user.save();
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// //search email

// // const { Tag } = require('../models');
// // const { Op } = require('sequelize');


// // // const emails = ['srushti@gmail.com', 'hasti123@gmail.com'];

// // // const tags = await Tag.findAll({
// // //   where: {
// // //     email: {
// // //       [Op.in]: emails
// // //     }
// // //   }
// // // });

// // const { Op } = require('sequelize');

// // // const letter = 'a'; 
// // // // Delete a user by ID
// // const filterUser = async (req, res) => {
// //   // debugger
// //   // const search = req?.body?.search
// //   const { search } = req?.body
// //   try {
// //     const tags = await User.findAll({
// //       where: {
// //         email: {
// //           [Op.like]: `${search}%`
// //         }
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// //const userService = require('../services/userService');

// const getUsersByEmailLetter = async (req, res) => {
//   try {

//     const users = await userService.getUsersByEmailStart(req?.body);
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// };

// // module.exports = {
// //   getUsersByEmailLetter,
// // };

// // // Delete a user by ID
// const deleteUser = async (req, res) => {
//   debugger
//   try {
//     // const user = await User.findByPk(req.params.id);
//     const user = User.update({ softDelete: true }, {
//       where: {
//         id: req.params.id
//       }
//     })
//     console.log('user-----------------------------------', user);
//     if (user) {
//       //await user.destroy();

//       res.status(204).json({ message: "User deleted" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   createUser,
//   getUserById,
//   updateUser,
//   deleteUser,
//   getUsersByEmailLetter,
// };



// // module.exports = controller


// //controller->Service->Repository




// controllers/userController.js

const userService = require('../Service/userService');
const Response=require('../utils/response')
const AppError = require('../utils/error');
const  {sendToMailQueue}  = require('../Service/mailservice');
const  getTemplate  = require('../utils/mailtemplate');
const  Users  = require('../models/user');

const { sendToQueue } = require('../Service/queryservice');
const validator = require('validator'); // For email validation




const createUser = async (req, res) => {
  try {
    

    const user = await userService.createUser(req.body);

    Response.getGeneralResponse(res, user, "Users added successfully")
  } catch (error) {
    console.error(error);
    Response.error(res, "Failed to fetch user", 500);
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (user) {
      Response.getGeneralResponse(res, user, "User fetched successfully");
    } else {
      Response.error(res, "User not found", 404);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Failed to fetch user", 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
       if (user) {
      Response.getGeneralResponse(res, user, "User update successfully");
    } else {
      Response.error(res, "User not found", 404);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Failed to fetch user", 500);
  }

};
const bulkUpdateUsers = async (req, res) => {
  try {
    const user = await userService.bulkUpdateUsers(req.params.id, req.body);
    if (user) {
      Response.getGeneralResponse(res, user, "User fetched successfully");
    } else {
      Response.error(res, "User not found", 404);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Failed to fetch user", 500);
  }

};

const deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (deleted) {
      Response.getGeneralResponse(res, user, "User fetched successfully");
    } else {
      Response.error(res, "User not found", 404);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Failed to fetch user", 500);
  }

};

const getUsersByEmailLetter = async (req, res) => {
  try {
    const users = await userService.getUsersByEmailStart(req.body);
    Response.getGeneralResponse(res, users, "Users added successfully")
    // res.status(201).json(user);
    //     throw new AppError('User creation failed', 400, 'USER_CREATED');

  } catch (error) {
    // res.status(400).json({ error: error.message });
    //     next(error);
    console.log(error);
    Response.error(res,"Fail")

  }
};
const getUsersWithMenus = async (req, res) => {
  try {
    const users = await userService.getUsersWithMenus(req.body);
    Response.getGeneralResponse(res, users, "Users added successfully")
    // res.status(201).json(user);
    //     throw new AppError('User creation failed', 400, 'USER_CREATED');

  } catch (error) {
    // res.status(400).json({ error: error.message });
    //     next(error);
    console.log(error);
    Response.error(res,"Fail")

  }};
const getmenu = async (req, res) => {
   try {
    const user = await userService.getmenu(req.body);
    Response.getGeneralResponse(res, user, "Users added successfully")
    // res.status(201).json(user);
    //     throw new AppError('User creation failed', 400, 'USER_CREATED');

  } catch (error) {
    // res.status(400).json({ error: error.message });
    //     next(error);
    console.log(error);
    Response.error(res,"Fail")

  }

};

const upsertUser = async (req, res) => {
   try {
    const user = await userService.upsertUser(req.body);
    Response.getGeneralResponse(res, user, "Users added successfully")
    // res.status(201).json(user);
    //     throw new AppError('User creation failed', 400, 'USER_CREATED');

  } catch (error) {
    // res.status(400).json({ error: error.message });
    //     next(error);
    console.log(error);
    Response.error(res,"Fail")

  }

};


const login = async (req, res, next) => {
  try {
    console.log('controller login');
    const userData = await userService.login(req.body); // Pass { email, password }

    Response.getGeneralResponse(res, userData, "Login successful");
  } catch (error) {
    console.error(error);
    next(error)

    // Customize error response based on AppError or default
    // if (error instanceof AppError) {
    //   return Response.error(res, error.message, error.statusCode);
    // }

    // return Response.error(res, "Fail", 500);
  }
};
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
  if (!isMatch) return res.status(401).json({ error: 'Old password incorrect' });

  const hash = await bcrypt.hash(newPassword, 10);
  user.password_hash = hash;
  await user.save();

  res.json({ message: 'Password changed successfully' });
};
const User = async (req, res) => {
  try {
    const user = await userService.bulkUpdateUsers(req.params.id, req.body);
    if (user) {
      Response.getGeneralResponse(res, user, "User fetched successfully");
    } else {
      Response.error(res, "User not found", 404);
    }
  } catch (error) {
    console.log(error);
    Response.error(res, "Failed to fetch user", 500);
  }

};
const fetchAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    Response.getGeneralResponse(res, users, "Users added successfully")
    // res.status(201).json(user);
    //     throw new AppError('User creation failed', 400, 'USER_CREATED');

  } catch (error) {
    // res.status(400).json({ error: error.message });
    //     next(error);
    console.log(error);
    Response.error(res,"Fail")

  }
};

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  // Simulate DB save
  console.log(`📝 User created: ${name} - ${email}`);

  // Send email to queue
  await sendToMailQueue({
    to: email,
    subject: 'Welcome!',
    html: getTemplate(name)
  });

  res.status(201).json({ message: 'User registered, mail queued' });
};

const sendMultipleEmails = async (req, res) => {
  try {
    const result = await userService.queueEmailsForAllUsers();

    if (result.length === 0) {
      return Response.error(res, 'No users found to send emails', 404);
    }

    Response.getGeneralResponse(res, result, `${result.length} emails queued successfully`);
  } catch (error) {
    console.error('Error in sendMultipleEmails:', error);
    Response.error(res, 'Failed to send emails', 500);
  }
};

// const registerUser = async (req, res, next) => {
//   try {
//     await userService.sendWelcomeMailsToAllUsers();
//     return Res.noContent(res);
//   } catch (error) {
//     next(error);
//   }
// };

const scheduleEmails = async (req, res) => {
  try {
    const result = await userService.scheduleEmailsForUsers();

    if (!result.length) {
      return Response.error(res, 'No users found to schedule emails', 404);
    }

    Response.getGeneralResponse(res, result, `${result.length} emails scheduled successfully`);
  } catch (error) {
    console.error('Email scheduling error:', error);
    Response.error(res, 'Email scheduling failed', 500);
  }
};


module.exports = {
  upsertUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  bulkUpdateUsers,
 sendMultipleEmails,
  getUsersByEmailLetter,
  getUsersWithMenus,
  fetchAllUsers,
  getmenu,
  registerUser,
  User,
  scheduleEmails,
  login,
  changePassword,
};
