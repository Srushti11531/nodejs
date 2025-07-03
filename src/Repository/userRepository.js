// const User  = require('../models/User');
const { Op, fn, col, where, Sequelize } = require('sequelize');

// repositories/userRepository.js
const User = require('../models/user');
const Menu = require('../models/menu');
const Login=require('../utils/password');
const e = require('express');
const bcrypt = require('bcrypt');



const upsertUser = async (req, res) => {
  try {
    const { id, name,email,age, menuIds, softdelete } = req;

    const [user, created] = await User.upsert({
      id,
      name,
      email,
      age,
      menuIds,
      softdelete
    });

    return({
      data: user,
      status: {
        message: created ? 'Inserted new user' : 'Updated existing user',
        code: 'OK',
        status: 'Success'
      }
    });
  } catch (error) {
    console.error('Upsert error:', error);
    return res.status(500).json({
      status: {
        message: 'Server Error',
        code: 'ERROR',
        status: 'Fail'
      }
    });
  }
};





const createUser = async (data) => {
  return await User.create(data);
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

// const login = async (req, res) => {
//   try {
//    // console.log("repo",req);
//     const { email, password } = req||{}; 

//     const users = await filterUsersByEmail(email); 
//        //const user = users[0]; // Get first user

//     if (!users) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isValid = await User.isValidPassword(password); 

//     if (!isValid) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.json({ message: 'Login successful', userId: users.id });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const updateUser = async (id, data) => {
 

      return await User.findByPk(id);
      
};
  



const bulkUpdateUsers = async (updates) => {
  const updatedUsers = [];

  for (const update of updates) {
    const { id, data } = update;
    const [updated] = await User.update(data, { where: { id } });

    if (updated) {
      const user = await User.findByPk(id);
      if (user) updatedUsers.push(user);
    }
  }
};

const softDeleteUser = async (id) => {
  console.log("id: ", id)
  const [deleted] = await User.update({ softdelete: true }, {
    where: { id },
    returning: true
  });

  console.log("deleted: ", deleted)
  return deleted;
};

const filterUsersByEmail = async (email, ids ) => {
  try {
    console.log(email);
    const where = {};

    if (email) {
      where.email = { [Op.iLike]: `%${email}%` };
    }

    if (ids?.length > 0) {
      where.id = { [Op.in]: ids };
    }

    const users = await User.findAll({ where });
    return users;

  } catch (err) {
    console.error('Error in filterUsers:', err);
    throw err;
  }
};

//multiple menu

const getUsersWithMenus = async (req, res) => {
  try {
    return await User.findAll({
      where: { softdelete: false },
      include: [
        {
          model: Menu,
          as: 'menus',
          required: true, // inner join
          where: { softdelete: false },
          //    id: {
          //   [Op.in]: [1, 2, 3, 4, 5, 6, 7]
          // },
          attributes: ['id', 'name'],
          on: {
            //'$menus.id$': { [Op.any]: ('users.menuIds') }, // Custom ON clause

            '$menus.id$': {
              [Op.any]: Sequelize.col('users.menuIds')
            }

          }
        }
      ],
      attributes: ['id', 'name', 'menuIds']
    });

    // console.log(users)

    // res.json(users);
  } catch (error) {
    console.error('Inner join error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll(); 
    return users;
  } catch (error) {
    throw error;
  }
}; 


//pagination
const getmenu = async (req, res) => {
  try {
       const { filter = {}, sort = {}, page = {} } = req.body || {};
    const { pageLimit = 10, pageNumber = 1 } = page;
    const offset = (pageNumber - 1) * pageLimit;
    const sortBy = sort.sortBy || 'createdAt';
    const orderBy = sort.orderBy?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  
    const whereClause = { softdelete: false };

    console.log(filter.name)
    if (filter.name) {
      whereClause.name = { [Op.iLike]: `%${filter.name}%` };
    }

    const result = await User.findAndCountAll({
      where: whereClause,
   attributes: ['id', 'name', 'menuIds', 'createdAt'],
      include: [
        {
          model: Menu,
          as: 'menus',
          required: true,
          attributes: ['id', 'name', 'createdAt'],
          where: { softdelete: false },
          on: Sequelize.literal(`"menus"."id" = ANY("users"."menuIds")`)
        }
      ],
      limit: pageLimit,
      offset,
      order: [[sortBy, orderBy]]
    });

    return ({
      data: {
        content: result.rows,
        pagination: {
          page: {
            pageNumber,
            pageLimit
          },
          totalPages: pageLimit > 0 ? Math.ceil(result.count / pageLimit) : 0,
          totalItems: result.count
        }
      },
      status: {
        description: 'Found successfully',
        code: 'OK',
        status: 'Success'
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      status: {
        description: 'Something went wrong',
        code: 'ERROR',
        status: 'Fail'
      }
    });
  }
};



//filter

const filtermenuByletter = async (req) => {
  //   return await User.findAll({
  //     where: {
  //       email: {
  //         [require('sequelize').Op.like]: `${prefix}%`,
  //       },
  //     },
  //   });

  try {
    console.log(req)
    const { letter } = req;
    const { ids } = req;

    const where = {};
    if (letter) {
      where.name = { [Op.iLike]: `%${letter}%` };
    }

    //     return await User.findAll({ where, logging: console.log });
    //     // res.status(200).json({ message: 'Users found', data: users });
    // } catch (err) {
    //     console.log(err)
    //     // res.status(500).json({ message: 'Error searching users', error: err.message });
    // }
    if (ids?.length > 0) {
      where.id = { [Op.in]: ids };
    }

    const menus = await menu.findAll({ where });
    return menus;

  } catch (err) {
    console.error('Error in filterUsers:', err);
    throw err;
  }

};
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
}; 
//node mailer ke liye
const findByEmail = async (email) => {
  if (!email || typeof email !== "string") return null;

  return await User.findOne({
    where: { email: email.toLowerCase() }
  });
};


const fetchAllUsers = async () => {
  return await User.findAll(); // Adjust based on your DB ORM
};


module.exports = {
  upsertUser,
  createUser,
  getUserById,
  bulkUpdateUsers,
  updateUser,
  getAllUsers,
  softDeleteUser,
  filterUsersByEmail,
  getUsersWithMenus,
  filtermenuByletter,
  getmenu,
  findUserByEmail,
 findByEmail,
 fetchAllUsers,
};
